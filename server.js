// Module dependencies.
var application_root = __dirname;
var express = require("express");
var app = express();
var fs = require('fs');


app.configure(function() {

    app.use(express.static(__dirname + '/app'));
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
});


var io = require('socket.io').listen(app.listen(9000));
io.sockets.on('connection', function (socket) {
    fs.watchFile('data.json', {
        persistent: true,
        interval: 1000
    },function(data){
        fs.readFile('data.json', {
            'bufferSize': 4 * 1024,
            'encoding' : 'utf8'
        }, function(err, data){
            if(err){
                console.log(err);
            }

            var lines = data.trim().split('\n');
            /*lines.replace("MMA8452Q is online... ","");*/

            var lastLine = lines.slice(-1)[0];
            console.log(lastLine);

            socket.emit('retrievedFileContent', lastLine );

        })
    });
});

exports = module.exports = app;

/*

Tail = require('tail').Tail;

tail = new Tail("fileToTail");

tail.on("line", function(data) {
    console.log(data);
});*/
