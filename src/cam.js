var cam = require("rpi-cam");
var config = require("./config");

module.exports = init;

function init(sockets) {
  cam.exists(function(err) {
    if (err) {
      console.log("'raspistill' could not be found.");
      process.exit();
    }
    start();
  });
}

function start() {
  var fps = config("camera").fps || 1;
  var wait = 1000 / fps;
  
  snap();

  setInterval(function() {
    snap();
  }, wait);
}

function snap() {
  cam.still({
    "-w": 640,
    "-h": 480,
    "-awb": "auto",
    "-n": "",
    "-q": 60,
    "-o": config("images") + "image.jpg",
    "-t": 1
  });
}
