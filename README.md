# BI beacon
Small wrapper around the api for bi beacon. More info can be found at https://bi-beacon.readthedocs.io/en/latest/code_examples.html

More info about the BI beacon can be found at https://bi-beacon.se/

## Usage

```
const BIBeacon = require('bi-beacon');

const beacon1 = new BIBeacon('beacon1');
const beacon2 = new BIBeacon('beacon2');

beacon1.color('#F0F0F0');
beacon2.pulse('#0F0F0F', 1000);
```
