//process is an event emitter
process.on('exit', (code) => {
    //do one final synchronous opertaions before the node process terminate
    console.log(`About to exit with code: ${code}`);
});

process.on('uncaughtException', (err) => {
    //something went unhandled.
    //Do any cleanup and exit anyway
    console.log(err); //don't just do that

    //Force exit the process
    process.exit(1);
});

//keep the event loop busy
process.stdin.resume();

//trigger TypeError exception
console.dog();
