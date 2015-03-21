var Cam = require("rpi-cam");
var config = require("./config");

var cam = new Cam();
var i = 0;

module.exports = {
  init: init
};

function init() {
  check(function() {
    run();
  });
}

function snap(fn) {
  var path = config("images");
  var filePath = path + (i++) + ".jpg";
  cam.still({
    "-w": 640,
    "-h": 480,
    "-awb": "auto",
    "-n": "",
    "-q": 60,
    "-o": filePath,
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
  var delay = 1000 / fps;
  
  var last = 0;

  (function recv() {
    var now = time();
    var ms = delay + last - now;
    
    if (ms < 0) {
      ms = 0;
    }
    
    setTimeout(function() {
      snap(recv);
      last = time();
    }, ms);
  })();
}

function time() {
  return new Date().getTime();
}
