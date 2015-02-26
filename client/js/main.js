$(function() {
  init();
});

function init() {
  var socket = io();
  update();
}

function update() {
  var i = 0;
  setInterval(function() {
    var img = $("#preview img");
    img.attr("src", img.attr("src").split("?")[0] + "?" + i);
    i++;
  }, 500);
}
