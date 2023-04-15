  /** data √ **/
  XJSX.__createModule__([
    {
      keyword: "data",
      _trusted: true,
      callback: function (e, node, exec) {
        try {
          e = exec("[" + e + "][0]");

          XJSX.event.on("data/" + e, function (ev) {
            (node.isVisible() && !node.putChild(ev.detail)) ||
              removeEventListener("data/" + e, arguments.callee);
          });
        } catch (err) {
          console.error("data:", e, err + "");
        }
      },
      type:  "method",
    },
  ]);
