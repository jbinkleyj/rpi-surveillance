var Cam = require("rpi-cam");
var config = require("./config");

var queue;
var cam = new Cam();
var i = 0;

module.exports = {
  init: init,
  setQueue: setQueue,
  snap: snap
};

function init() {
  check(function() {
    run();
  });
}

function setQueue(q) {
  queue = q;
}

function snap(fn) {
  var file = "" + (i++) + ".jpg";
  var filePath = config("path") + file;
  cam.still({
    "-w": 640,
    "-h": 480,
    "-awb": "auto",
    "-n": "",
    "-q": 60,
    "-o": filePath,
    "-t": 1
  }, function() {
    if (fn) {
      fn();
    }
    if (queue) {
      queue.emit("image", file);
    }
  });
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
  
  var ts = 0;
  (function recv() {
    var ms = delay + ts - time();
    console.log(ms);
    if (ms < 0) {
      ms = 0;
    }
    setTimeout(function() {
      snap(recv);
      ts = time();
    }, ms);
  })();
}

function time() {
  return new Date().getTime();
}
