const fs = require('fs');
const convertMap = {
    '88':'65',
    '89':'66',
    '90':'67',
};

fs.readFile(__filename,(err, buffer) => {
    let tag = buffer.slice(-4, -1);

    for(let i = 0; i < tag.length; i++){
        tag[i] = convertMap[tag[i]];
    }

    console.log(buffer.toString());
});

//TAG:XYZ
