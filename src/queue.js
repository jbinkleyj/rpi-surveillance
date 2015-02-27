var cam = require("rpi-cam");

module.exports = Queue;

function Queue() {
  this.items = [];
}

Queue.Status = {
  READY: "ready",
  WAITING: "waiting"
};

Queue.prototype = {
  add: add,
  remove: remove
};

function add(socket) {
  this.items.push({
    socket: socket,
    state: Queue.Status.READY
  });
}

function remove(socket) {
  var items = this.items;
  for (var i in items) {
    if (items[i].socket == socket) {
      items.splice(i, 1);
    }
  }
}
