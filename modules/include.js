(function() {
var __core__=XJSX.__XJSXCORE__();
var FUNCTION = 0xD;
  /** include**/
  __core__.createModule([
    {
      keyword: "include",
      callback: function (url) {
        var url;
        try {
          if (!(url = this.eval("[" + url + "][0]"))) {
            throw "'" + url + "'" + " is not a valid argument";
          }

          var self = this;
          /*XRequest(url,function() {
          
          self.putChild(__core__.XJSXCompiler(__core__.domParser(arguments[0]),self.eval).childNodes)
        },true)*/

          var http = new XMLHttpRequest();
          self.global.http = http;
          http.addEventListener("load", function () {
            if (!self.isVisible()) {
              this.removeEventListener(arguments[0].type, arguments.callee);
              this.abort();
              return;
            }
            /*if (!http.response) {
            __core__.dispatcher(http,"error")
            console.error(url+"\npath could not be included"+"\nmake sure the provided url is a valid html file")
            return 
          }
          */

            self.putChild(
              __core__.XJSXCompiler(
                __core__.domParser(http.response, http.abort()),
                self.eval
              ).childNodes
            );
          });

          http.open("get", url);
          http.send();
        } catch (e) {
          console.error("include:", url, e);
        }
      },
      type: FUNCTION,
    },
    {
      keyword: "catch",
      onload: function () {
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      callback: function () {
        var self = this;
        var doc = document.createDocumentFragment();
        this.appendAllTo(doc);

        if (!self.global.http) {
          self.putChild(__core__.XJSXCompiler(doc, self.eval));
          console.error(self.parentParams.join(":"), "uncaught error");
          return;
        }
        self.global.http.addEventListener("error", function () {
          if (!self.isVisible()) {
            this.removeEventListener(arguments[0].type, arguments.callee);
            this.abort();
            return;
          }
          self.putChild(__core__.XJSXCompiler(doc, self.eval));
          this.abort();
          delete self.global.http;
        });
      },
    },
  ]);

})()