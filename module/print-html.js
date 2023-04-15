var _tmp;

  /** print-html **/
  XJSX.__createModule__([
    {
      keyword: "print-html",
      _trusted: true,
      callback: function (e, node, exec) {
        if (e != 0) {
          try {
            var tmp =
              _tmp || (_tmp = document.createElement("span"));
            tmp.innerHTML = exec(e);
            //  XJSX.parseElement(tmp.content)
            node.putChild(tmp.childNodes);
          } catch (err) {
            console.error("print-html:", e, err + "");
          }
        }
      },
      type:  "method",
    },
  ]);
