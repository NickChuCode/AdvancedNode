const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'files');
const currentFiles = fs.readdirSync(dirname);

const logWithTime = (message) => console.log(`${new Date().toUTCString()}: ${message}`);

fs.watch(dirname, (eventType, filename) => {
    if(eventType === 'rename'){
        const index = currentFiles.indexOf(filename);
        //delete的情形
        if(index >= 0){
            currentFiles.splice(index, 1);
            logWithTime(`${filename} was removed.`);
            return;
        }
        //add的情形
        currentFiles.push(filename);
        logWithTime(`${filename} was added`);
    }

    logWithTime(`${filename} was changed`);
});
