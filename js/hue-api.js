var baseUrl = "http://192.168.1.198";
var username = "newdeveloper";

function apiFunction() {


    this.light = {
        on: function(lightId, hue, brightness, sat) {
            var lightObj = {
                "on":true,
                "sat":sat,
                "bri":brightness,
                "hue":hue
            };

            return $.ajax({
                url: baseUrl + "/api/" + username + "/lights/" + lightId + "/state",
                type: "PUT",
                contentType: "application/jsonp",
                data: JSON.stringify(lightObj)
            });
        },
        off: function(lightId) {
            var lightObj = {
                "on":false
            };


            return $.ajax({
                url: baseUrl + "/api/" + username + "/lights/" + lightId + "/state",
                type: "PUT",
                contentType: "application/jsonp",
                data: JSON.stringify(lightObj)
            });
        }
    };

}

var api = new apiFunction();