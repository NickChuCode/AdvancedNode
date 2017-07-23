const EventEmitter = require('events');

class Server extends EventEmitter{
    constructor(client){
        super();
        this.tasks = {};
        this.taskId = 1;
        process.nextTick(() => {
            //这样写是因为在client.js中新建server对象时，还没有监听函数，所以要
            //等这轮结束，用nextTick
            this.emit('response', 'Type a command (help to list commands)');
        });
        //哪个object emit出去的事件，哪个object用on接住？
        //反正这个例子里是这样的，而且不这样程序跑不起来
        client.on('command', (command, args) => {
            switch(command){
                case 'help':
                case 'ls':
                case 'add':
                case 'delete':
                    this[command](args);
                    break;
                default:
                    this.emit('response', 'unknown command...');
            }
        });
        //help, ls, add, delete
    }
    tasksString(){
        return Object.keys(this.tasks).map(key => {
            return `${key}: ${this.tasks[key]}`;
        }).join('\n');
    }
    help(){
        this.emit('response', `Avaliable commands:
        add task
        ls
        delete :id`
        );
    }
    ls(){
        this.emit('response', `Tasks:\n${this.tasksString()}`);
    }
    add(args){
        this.tasks[this.taskId] = args.join(' ');
        this.emit('response', `Added Task: ${this.taskId}`);
        this.taskId++;
    }
    delete(args){
        delete(this.tasks[args[0]]);
        this.emit('response', `Deleted task ${args[0]}`);
    }
}

module.exports = (client) => {
   return new Server(client); //没return，所以出现一些bug,此外，单行可以不用写return，具体参考JS#2:P74页
}
