var express = require("express");
var io = require("socket.io");
var version = require("../package.json").version;
var cam = require("./cam");
var config = require("./config");

module.exports = start;

var sockets;

function start() {
  cam();
  serve();
}

function serve() {
  var port = config("port");
  var app = express()
    .use(express.static("client"))
    .use("/images/", express.static("images"))
    .listen(port);

  sockets = io(app);
  sockets.on("connect", function(s) {
    init(s);
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

function init(socket) {
  socket.emit("init");
}
