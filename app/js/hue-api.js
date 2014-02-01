var baseUrl = "http://192.168.1.198";
var username = "newdeveloper";

function apiFunction() {

    this.convert = {
        hue: function(accVal){
            accVal = parseFloat(accVal);
            if (accVal > 1) {
                accVal = 1;
            } else if (accVal < -1) {
                accVal = -1;
            }

            return parseInt(32767 * (accVal+1),10);
        },
        sat: function(accVal) {
            accVal = parseFloat(accVal);
            if (accVal > 1) {
                accVal = 1;
            } else if (accVal < -1) {
                accVal = -1;
            }

            return parseInt(127 * (accVal+1),10);
        },
        brightness: function(accVal) {
            accVal = parseFloat(accVal);
            if (accVal > 1) {
                accVal = 1;
            } else if (accVal < -1) {
                accVal = -1;
            }

            return parseInt(127 * (accVal+1),10);
        },
        rotate: function(accVal) {


            return accVal * 1.57;
        }


    }

    this.light = {
        on: function(lightId, type, hue, sat, brightness) {

            if (lightId == 0) {
                return api.group.on(lightId, type, hue, sat, brightness);
            }

            if (type == undefined) {
                type = "none";
            }

            var lightObj = {
                "on":true,
                "sat":sat,
                "bri":brightness,
                "hue":hue,
                "alert":type,
                "effect": "none"
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

    this.group = {
        on: function(groupId, type, hue, sat, brightness) {

            if (type == undefined) {
                type = "none";
            }

            var lightObj = {
                "on":true,
                "sat":sat,
                "bri":brightness,
                "hue":hue,
                "alert":type,
                "effect": "none"
            };

            return $.ajax({
            // /api/newdeveloper/groups/0/action
                url: baseUrl + "/api/" + username + "/groups/" + groupId+ "/action",
                type: "PUT",
                contentType: "application/jsonp",
                data: JSON.stringify(lightObj)
            });
        },
        off: function(groupId) {

        }
    }

}

var api = new apiFunction();