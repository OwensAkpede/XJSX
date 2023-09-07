(function() {
var __core__=XJSX.__XJSXCORE__();
var METHOD = 0xB;
  /** print-html **/
  __core__.createModule([
    {
      keyword: "print-html",
      callback: function (e, node, exec) {
        if (e != 0) {
          try {
            var tmp =
              __core__.tmp || (__core__.tmp = document.createElement("span"));
            tmp.innerHTML = exec(e);

            node.putChild(tmp.childNodes);
          } catch (err) {
            console.error("print-html:", e, err + "");
          }
        }
      },
      type: METHOD,
    },
  ]);
})()