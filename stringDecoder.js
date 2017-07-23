const {StringDecoder} = require('string_decoder');
const decoder = new StringDecoder('utf8');

process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if(chunk != null){
        const buffer = Buffer.from([chunk]);
        console.log('with .toString(): ', buffer.toString());
        console.log('with StringDecoder: ', decoder.write(buffer));
    }
});
