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


// //每次send的时候，client都会用不同的port
// setInterval(
//     function () {
//         const client = dgram.createSocket('udp4');
//         client.send('Nick rocks', PORT, HOST, (err) => {
//             if (err) throw err;
//             console.log('UDP message sent');
//             client.close();
//         })
//     }
//     , 1000
// );

const client = dgram.createSocket('udp4');
const msg = Buffer.from('Nick rocks');

//send的第一个参数也可以是Buffer，用buffer时，
//可以指定msg的起止（通过起始位置，偏移量来指定）
//如果不分，前三个参数可以写成msg, 0, msg.length
//此外，第一个参数可以是一个Array，如果想一次发多个参数的话
//client.send([], ...)的形式
client.send(msg, 0, 4, PORT, HOST, (err) => {
    if (err) throw err;
    console.log('UDP message sent');

    client.send(msg, 5, 5, PORT, HOST, (err) => {
        if(err) throw err;
        console.log('UPD message sent');
        client.close();
    } );
})
