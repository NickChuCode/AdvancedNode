const fs = require('fs');

const out = fs.createWriteStream('./out.log');
const err = fs.createWriteStream('./err.log');

const console2 = new console.Console(out, err);

setInterval(() => {
    console2.log(new Date().toUTCString());
    console2.error(new Error('Whoops'));
}, 5000);
