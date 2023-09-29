(function() {
  var __core__ = XJSX.__XJSXCORE__();
  var METHOD = 0xB;
  /** print √ **/
  __core__.createModule([
    {
      keyword: "update",
      callback: function(e, node, exec) {
        try {
function update(){
                        node.putChild(exec("[" + e + "][0]"));
requestAnimationFrame(update)

}

update()
        } catch (err) {
          console.error("print:", e, err + "");
          e = "";
        }
      },
      type: METHOD,
    },
  ]);
})()
