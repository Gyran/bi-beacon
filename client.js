const net = require('net');

const EVENT = {
  COMMAND: 'command',
  CONNECTED: 'connect',
};

const COMMAND = {
  COLOR: 'color',
  PULSE_1: 'pulse_1',
}

class Client {

  constructor(systemid, {
    host = 'api.cilamp.se',
    port = 4040,
  } = {}) {
    this._systemid = systemid;
    this._host = host;
    this._port = port;

    this._socket = null;
    this._connected = false;

    this._listeners = {};

  }

  connect() {
    this._socket = new net.Socket();
    this._socket.connect(this._port, this._host, () => {
      this._socket.write(`Areal ${ this._systemid }\n`);
      this._connected = true;
    });

    this._socket.on('data', (...args) => this._onSocketData(...args));
    this._socket.on('close', (...args) => this._onSocketClose(...args));
  }

  on(event, listener) {
    console.log('push lis', event, listener);

    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(listener);
  }

  _onSocketData(data) {
    const [command, ...args] = data.toString().split(' ');

    let eventData;

    if (command === COMMAND.COLOR) {
      const [r, g, b] = args.map((a) => parseInt(a, 10));
      eventData = {
        command,
        color: { r, g, b },
        hz: 0,
      };
    } else if (command === COMMAND.PULSE_1) {
      const [r, g, b, hz] = args.map((a) => parseInt(a, 10));;
      eventData = {
        command,
        color: { r, g, b },
        hz,
      };
    } else {
      console.warn('Unknown command', command, args);
    }

    if (eventData) {
      this._emit(EVENT.COMMAND, eventData);
    }
  }

  _onSocketClose() {
    this._socket = null;
    this._connected = false;
  }

  _emit(event, data) {
    const listeners = this._listeners[event];

    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }

}

module.exports = Client;
