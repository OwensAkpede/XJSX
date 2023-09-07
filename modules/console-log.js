(function() {
var __core__=XJSX.__XJSXCORE__();
var METHOD = 0xB;
  /** console-log √ **/
  __core__.createModule([
    {
      keyword: "console-log",
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
      type: METHOD,
    },
  ]);
})()