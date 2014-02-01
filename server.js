// Module dependencies.
var application_root = __dirname;
var express = require("express");
var app = express();
var fs = require('fs')

app.configure(function() {

    app.use(express.static(__dirname + '/app'));
    app.use(express.logger('dev')); 						// log every request to the console
    app.use(express.bodyParser()); 							// pull information from html in POST
    app.use(express.methodOverride()); 						// simulate DELETE and PUT
});


var io = require('socket.io').listen(app.listen(9000));

/*fs.watchFile('data.json', {
    persistent: true,
    interval: 100
},function(data){
    fs.readFile('data.json', {
        'bufferSize': 4 * 1024,
        'encoding' : 'utf8'
    }, function(err, data){
        if(err){

            console.log(data);
        }
        console.log(data);
    })
});*/



exports = module.exports = app;