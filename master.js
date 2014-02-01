var fs = require('fs');


fs.watchFile('data.json', {
    persistent: true,
    interval: 100
},function(data){
    fs.readFile('data.json', {
        'bufferSize': 4 * 1024,
        'encoding' : 'utf8'
    }, function(err, data){
        if(err){
            console.log("error: " + err);
        }

        console.log(data);
    })

});
