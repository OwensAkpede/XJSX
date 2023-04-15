  /** console-log √ **/
  XJSX.__createModule__([
    {
      keyword: "console-log",
      _trusted: true,
      callback: function (e, node, exec) {
        e = e.trim();
        if (!e) {
          return;
        }
        try {
          exec("console.log(" + e + ")");
        } catch (err) {
          console.error("console-log:", e, err.toString());
        }
        node.remove();
      },
      type:  "method",
    },
  ]);
