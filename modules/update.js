(function () {
  var __core__ = XJSX.__XJSXCORE__();
  var METHOD = 0xB;
  /** update √ **/
  __core__.createModule([
    {
      keyword: "update",
      callback: function (arg, node, exec) {
        try {
          var e="";
          function update() {
            var _e = exec(arg);
            if (_e !== e) {
              e=_e;
              node.putChild(e);
            }
            return node.isVisible() && requestAnimationFrame(update);
          }
          update();
        } catch (err) {
          console.error("Update:", arg, err + "");
        }
      },
      type: METHOD,
    },
  ]);
})()
