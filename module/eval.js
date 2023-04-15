  /** eval √ **/
  XJSX.__createModule__([
    {
      keyword: "eval",
      _trusted: true,
      callback: function (e, node, exec) {
        try {
          exec(e.trim().replace(/^"([^]+)"$/g, "$1"));
        } catch (err) {
          console.error("eval:", e, err.toString());
        }
        node.remove();
      },
      type:  "method",
    },
  ]);
