  /** parse-json **/
  XJSX.__createModule__([
    {
      keyword: "parse-json",
      _trusted: true,
      callback: function(e, node, exec) {
        if (e != 0) {
          try {
            exec("(" + e + ")=JSON.parse(" + e + ")", "");
          } catch (err) {
            console.error("parse-json:", e, err + "");
          }
        }
        node.remove();
      },
      type: "method",
    },
  ]);