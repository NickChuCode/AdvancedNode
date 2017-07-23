const dgram = require('dgram');
const PORT = 3333;
const HOST = '127.0.0.1';

//Server
const server = dgram.createSocket('udp4');

server.on('listening', () => console.log('UDP server listening.'));

server.on('message', (msg, rinfo) => {
    console.log(`${rinfo.address}:${rinfo.port} - ${msg}`);
});

server.bind(PORT, HOST);

//Client


//每次send的时候，client都会用不同的port
setInterval(
    function () {
        const client = dgram.createSocket('udp4');
        client.send('Nick rocks', PORT, HOST, (err) => {
            if (err) throw err;
            console.log('UDP message sent');
            client.close();
        })
    }
    , 1000
);

