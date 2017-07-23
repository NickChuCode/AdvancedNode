process.stdout.write('\u001B[2J\u001B[0:0f');
let counter = 0;
let sockets = {};

const server = require('net').createServer();

server.on('connection', socket => {
    //本node文件通过nc来触发connection,打开server的connection
    socket.id = counter++;

    console.log('client connected');
    socket.write('Please type your name:\n');

    socket.on('data', data => {
        //判断用户是否存在，不存在则先新建用户
        if(!sockets[socket.id]){
            socket.name = data.toString().trim();
            socket.write(`Welcome ${socket.name}!\n`);
            sockets[socket.id] = socket;
            return;
        }
        //如果没有指定encode，data会以buffer的形式输出
        Object.entries(sockets).forEach(([key, cs]) => {
            if(socket.id == key) return;
            cs.write(`${socket.name}: `);
            cs.write(data);
        });
    });

    socket.on('end', () => {
        //当一个client退出时，从client的列表中删除
        delete sockets[socket.id];
        //这里通过在nc中CTRL+D来关闭session
        console.log('client disconnected!');
    });

    socket.setEncoding('utf8');//这里设置后，在console输出也是string 了
});

server.listen(8000, () => console.log('Server bound!'));
