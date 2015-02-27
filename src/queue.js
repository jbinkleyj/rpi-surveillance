module.exports = {
  add: add,
  remove: remove
};

var queue = [];

var state = {
  READY: "ready",
  WAITING: "waiting"
};

function add(socket) {
  queue.push({
    socket: socket,
    status: status.READY
  });
}

function remove(socket) {
  // ..
}
