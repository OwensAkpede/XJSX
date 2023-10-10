(function() {
var __core__=XJSX.__XJSXCORE__();
var METHOD = 0xB;
  /** print √ **/
  __core__.createModule([
    {
      keyword: "print",
      callback: function (e, node, exec) {
        try {
          node.putChild(exec("[" + e + "][0]"));
        } catch (err) {
          console.error("print:", e, err + "");
          e = "";
        }
      },
      type: METHOD,
    },
  ]);
})()