var tape = require("tape");
var Cam = require("rpi-cam");
var camera = require("../src/camera");

tape("camera", {timeout: 2000}, function(t) {
  var c = new Cam();
  c.exists(function(err) {
    if (err) {
      t.end();
    } else {
      t.plan(1);
      camera.snap(function() {
        t.pass();
      });
    }
  });
});
