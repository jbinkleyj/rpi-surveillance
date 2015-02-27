var cam = require("rpi-cam");
var config = require("./config");

module.exports = {
  init: init,
  snap: snap
};

function init() {
  check(function() {
    run();
  });
}

function snap(fn) {
  cam.still({
    "-w": 640,
    "-h": 480,
    "-awb": "auto",
    "-n": "",
    "-q": 60,
    "-o": config("images") + "image.jpg",
    "-t": 1
  }, fn);
}

function check(fn) {
  cam.exists(function(err) {
    if (err) {
      console.log("'raspistill' could not be found.");
    } else if (fn) {
      fn();
    }
  })
}

function run() {
  var fps = config("camera").fps || 1;
  var wait = 1000 / fps;
  
  snap();

  setInterval(function() {
    snap();
  }, wait);
}
