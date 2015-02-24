var express = require("express");
var config = require("./config");
var version = require("../package.json").version;

module.exports = init;

function init() {
  var port = config("port");
  var app = express()
    .use(express.static("client"))
    .listen(port);

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
