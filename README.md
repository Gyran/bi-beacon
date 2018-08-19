# BI beacon
Small wrapper around the api for bi beacon. More info can be found at https://bi-beacon.readthedocs.io/en/latest/code_examples.html

More info about the BI beacon can be found at https://bi-beacon.se/

## Usage

### Control
```
const { BIBeaconController: Controller } = require('bi-beacon');

const beacon1 = new BIBeaconController('beacon1');
const beacon2 = new BIBeaconController('beacon2');

beacon1.color('#F0F0F0');
beacon2.pulse('#0F0F0F', 1000);
```

### Client
```
const { BIBeaconClient: Client } = require('bi-beacon');

const beacon1 = new BIBeaconClient('beacon1');
beacon1.on('command', (data) => {
  console.log('got data', data);
});
beacon1.connect();
```
