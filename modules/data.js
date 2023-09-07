(function() {
var __core__=XJSX.__XJSXCORE__();
var METHOD = 0xB;
  /** data √ **/
  __core__.createModule([
    {
      keyword: "data",
      callback: function (e, node, exec) {
        try {
          e = exec("[" + e + "][0]");
          __core__.addEventListener("data/" + e, function (ev) {
            (node.isVisible() && !node.putChild(ev.detail)) ||
              removeEventListener("data/" + e, arguments.callee);
          });
        } catch (err) {
          console.error("data:", e, err + "");
        }
      },
      type: METHOD,
    },
  ]);
})()