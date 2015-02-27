var tape = require("tape");
var Queue = require("../src/queue");

tape("queue", function(t) {
  var q = new Queue();
  var s = {};

  q.add(s);
  t.equals(q.items.length, 1);

  q.remove(s);
  t.equals(q.items.length, 0);

  t.end();
});
