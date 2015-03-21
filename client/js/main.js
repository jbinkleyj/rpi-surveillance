$(function() {
  init();
});

function init() {
  var socket = io();
  socket.on("image", function(file) {
    update(file);
    console.log(file);
  });
}

function update(file) {
  $("#preview img").show().attr("src", "images/" + file);
}
