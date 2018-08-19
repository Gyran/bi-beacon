const https = require('https');
const querystring = require('querystring');

class Controller {

  constructor(systemid, {
    host = 'api.cilamp.se',
    port = 443,
  } = {}) {
    this._systemid = systemid;
    this._host = host;
    this._port = port;
  }

  color(color) {
    return this._post({ color });
  }

  pulse(color, period) {
    return this._post({ color, period });
  }

  async _post(data) {
    const path = `/v1/${ this._systemid }/`;
    const postData = querystring.stringify(data);

    return new Promise((resovle, reject) => {
      let responseData = '';

      const request = https.request(
        {
          method: 'post',
          port: this._port,
          host: this._host,
          path,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        },
        response => {
          response.on('data', chunk => {
            responseData += chunk;
          });

          // The whole response has been received
          response.on('end', () => {
            try {
              const out = JSON.parse(responseData);

              if (response.statusCode === 200) {
                resovle(out);
              } else {
                reject(out);
              }
            } catch (error) {
              reject(error);
            }
          });
        },
      );

      request.on('error', error => {
        reject(error);
      });
      request.write(postData);
      request.end();
    });
  }

}

module.exports = Controller;
