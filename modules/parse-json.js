(function() {
var __core__=XJSX.__XJSXCORE__();
var METHOD = 0xB;
  /** parse-json **/
  __core__.createModule([
    {
      keyword: "parse-json",
      callback: function (e, node, exec) {
        if (e != 0) {
          try {
            exec("(" + e + ")=JSON.parse(" + e + ")", "");
          } catch (err) {
            console.error("parse-json:", e, err + "");
          }
        }
        node.remove();
      },
      type: METHOD,
    },
  ]);

})()