(function() {
var __core__=XJSX.__XJSXCORE__();
var METHOD = 0xB;

  /** eval √ **/
  __core__.createModule([
    {
      keyword: "eval",
      callback: function (e, node, exec) {
        try {
          exec(e.trim().replace(/^"([^]+)"$/g, "$1"));
        } catch (err) {
          console.error("eval:", e, err.toString());
        }
        node.remove();
      },
      type: METHOD,
    },
  ]);

})()