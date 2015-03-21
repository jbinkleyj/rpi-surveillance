var tape = require("tape");
var fs = require("fs");
var rpi = require("rpi-cam");
var camera = require("../src/camera");
var config = require("../src/config");
var Queue = require("../src/queue");

tape("camera", {timeout: 2000}, function(t) {
  t.plan(2);

  var q = new Queue();
  var socket = {
    emit: function(event, data) {
      var file = data;
      var filePath = config("path") + file;
      if (fs.existsSync(filePath)) {
        t.pass();
      }
    }
  };

  q.add(socket);

  var c = new rpi();
  c.exists(function(err) {
    if (err) {
      t.fail();
    }
  });

  camera.setQueue(q);
  camera.snap(function() {
    t.pass();
  });
});
