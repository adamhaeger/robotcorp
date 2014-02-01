var tessel = require('tessel');

var http = require('http');

var options = {
  hostname: '192.168.1.198',
  port: 80,
  path: '/api/newdeveloper/lights/',
  method: 'GET'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  // console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk.length);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
// req.write('data\n');
// req.write('data\n');
req.end();


var port = process.argv[2] || 'A';
console.log("Connecting to accelerometer on port", port);

// Accelerometer
var accel = require('accel-mma84').connect(tessel.port(port));

// Initialize the accelerometer.
accel.on('connected', function () {
  // Loop forever.
  setInterval(function () {
    accel.getAcceleration(function (err, xyz) {
      console.log("x:", xyz[0].toFixed(2),
        "y:", xyz[1].toFixed(2),
        "z:", xyz[2].toFixed(2));
    });
  }, 500);
});
