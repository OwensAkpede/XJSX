(function() {
  var __core__ = XJSX.__XJSXCORE__();
  var METHOD = 0xB;
  /** print √ **/
  __core__.createModule([
    {
      keyword: "update",
      callback: function(e, node, exec) {
        try {
          setInterval(()=>{
                      node.putChild(exec("[" + e + "][0]"));

          },0)
        } catch (err) {
          console.error("print:", e, err + "");
          e = "";
        }
      },
      type: METHOD,
    },
  ]);
})()