module.exports = function(key) {
  return config[key] || false;
}

var config;

function load() {
  config = require("../config.json");
}

load();
