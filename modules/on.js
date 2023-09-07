(function() {
var __core__=XJSX.__XJSXCORE__();
var FUNCTION = 0xD;

  /** on √ **/
  __core__.createModule([
    {
      keyword: "on",
      type: FUNCTION,
      onload: function () {
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      callback: function (a) {
        try {
          var e = __core__.parseParameter(a, this.eval);
          // console.log(e);
          var param = e.parameter[0];
          e.parameter = void 0;
          if (!param) {
            throw "empty parameter";
          }

          /* handle here */

          var self = this;
          var doc = document.createDocumentFragment(),
            _doc;
          self.appendAllTo(doc);

          __core__.addEventListener(param, function () {
            if (self.isVisible()) {
              for (var i = 0; i < e.arguments.length; i++) {
                self.eval(arguments[i], e.arguments[i]);
              }
              self.putChild(
                __core__.XJSXCompiler(doc.cloneNode(true), self.eval)
              );
            } else {
              removeEventListener(param, arguments.callee);
            }
          });
        } catch (err) {

          console.error("on:", a, err + "");
        }
      },
    },
  ]);
})()