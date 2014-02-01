var tessel = require('tessel');

var port = process.argv[2] || 'A';
// Accelerometer
var accel = require('accel-mma84').connect(tessel.port(port));

// Initialize the accelerometer.
accel.on('connected', function () {
    // Loop forever.
    setInterval(function () {
        accel.getAcceleration(function (err, xyz) {
            console.log(
                    xyz[0].toFixed(2) + '|' +
                    xyz[1].toFixed(2) + '|' +
                    xyz[2].toFixed(2)
            );

            /*console.log(
                {
                    'x' : xyz[0].toFixed(2),
                    'y' : xyz[1].toFixed(2),
                    'z' : xyz[2].toFixed(2)
                }
            );*/
        });
    }, 100);
});