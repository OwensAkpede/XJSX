(function() {
var __core__=XJSX.__XJSXCORE__();
  var KEYWORD = 0xC;
  
  /** html-element **/
  __core__.createModule([
    {
      keyword: "html-element",
      type: KEYWORD,
      onload: function (arg) {
        var elm;
        var e = __core__.parseParameter(arg, this.eval);
        var params = e.parameter;

        var _arg = [this.global.elm = elm = document.createElement(params[0])]

        if ("object" === typeof params[1]) {
          for (var att in params[1]) {
            var v = params[1][att]
            if (v instanceof Object /*elm[att]!==void 0*/ /*elm.hasOwnProperty(att)*/) {
              elm[att] = v
            } else {
              elm.setAttribute(att, v)
            }
          }
        }


        for (var i = 0; i < e.arguments.length; i++) {
          this.eval(_arg[i], e.arguments[i]);
        }
      },
      onprogress: function () {

      },
      callback: function () {
        this.appendAllTo(this.global.elm)
        this.putChild(this.global.elm)
      }
    }
  ])
})()