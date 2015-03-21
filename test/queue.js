var tape = require("tape");
var Queue = require("../src/queue");

tape("queue", function(t) {
  t.plan(3);

  var q = new Queue();
  var s = {
    emit: function(event, data) {
      t.pass();
    }
  };

  q.add(s);
  t.equals(q.items.length, 1);

  q.emit("foo", "bar");

  q.remove(s);
  t.equals(q.items.length, 0);

  t.end();
});
