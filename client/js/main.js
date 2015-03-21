$(function() {
  init();
});

var socket = io();

function init() {
  var i = 0;
  socket.on("image", function(file) {
    console.log(file);
    $("#preview img").show().attr("src", "images/" + file + "?" + i);
    i++;
  });
}
