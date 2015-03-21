var tape = require("tape");
var Cam = require("rpi-cam");
var camera = require("../src/camera");
var Queue = require("../src/queue");

tape("camera", {timeout: 2000}, function(t) {
  t.plan(3);

  var q = new Queue();
  var socket = {
    emit: function() {
      t.pass();
    }
  };
  q.add(socket);

  var c = new Cam();
  c.exists(function(err) {
    if (err) {
      t.fail();
    }
  });

  camera.snap(function() {
    t.pass();
    next();
  });
  
  function next() {
    camera.setQueue(q);
    camera.snap(function() {
      t.pass();
    });
  }
});
