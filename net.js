process.stdout.write('\u001B[2J\u001B[0:0f');
let counter = 0;

const server = require('net').createServer();

server.on('connection', socket => {
    //本node文件通过nc来触发connection,打开server的connection
    socket.id = counter++;
    console.log('client connected');
    socket.write('welcome new client!\n');

    socket.on('data', data => {
        //如果没有指定encode，data会以buffer的形式输出
        console.log('data is: ', data);
        socket.write(`${socket.id}: `);
        socket.write(data, 'utf8');//这里默认是utf8，可以不设
    });

    socket.on('end', () => {
        //这里通过在nc中CTRL+D来关闭session
        console.log('client disconnected!');
    });

    socket.setEncoding('utf8');//这里设置后，在console输出也是string 了
});

server.listen(8000, () => console.log('Server bound!'));
