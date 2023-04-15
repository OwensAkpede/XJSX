  /** print √ **/
  XJSX.__createModule__([
    {
      keyword: "print",
      _trusted: true,
      callback: function (e, node, exec) {
        try {
          node.putChild(exec("[" + e + "][0]"));
        } catch (err) {
          console.error("print:", e, err + "");
          e = "";
        }
      },
      type: "method",
    },
  ]);
