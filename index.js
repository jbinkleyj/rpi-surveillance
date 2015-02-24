var express = require("express");

function init() {
  var app = express()
    .use(express.static("client"))
    .listen(8080);
}

init();
