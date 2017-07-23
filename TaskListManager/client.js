const EventEmitter = require('events');
const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new EventEmitter();
//client和server要相互通信，需要互相引用，但是更好的写法是
//把export server 写成function，这边引用，执行，然后将client实例以
//参数的形式传递过去
const server = require('./server')(client);
server.on('response', (resp) => {
    //这是一组比较有用的输出形式
    process.stdout.write('\u001B[2J\u001B[0:0f');//先clear terminal
    process.stdout.write(resp);//然后输出结果
    process.stdout.write('\n\>');//然后换行，等待下次输出
});

let command, args;

rl.on('line', (input) => {
    [command, ...args] = input.split(' ');
    client.emit('command', command, args);
})
