var express = require("express");
var io = require("socket.io");
var version = require("../package.json").version;
var config = require("./config");

module.exports = init;

var sockets;

function init() {
  var port = config("port");
  var app = express()
    .use(express.static("client"))
    .listen(port);

  sockets = io(app);
  sockets.on("connect", function(s) {
    console.log(1);
  });

  console.log("");
  console.log("rpi-surveillance@" + version);
  console.log("");
  console.log("Config:");
  console.log("  host  " + config("host"));
  console.log("  port  " + config("port"));
  console.log("");
  console.log("Server started!");
  console.log("Press ctrl-c to stop");
  console.log("");
}
