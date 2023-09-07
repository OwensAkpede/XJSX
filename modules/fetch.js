(function() {
var __core__=XJSX.__XJSXCORE__();
  var FUNCTION = 0xD;
  /** fetch √ **/
  __core__.createModule([
    {
      keyword: "fetch",
      onload: function (arg) {
        var opt;
        var url;
        var http = new XMLHttpRequest();
        this.global.http = http;
        try {
          arg = this.eval("[" + arg + "]");
          url = arg[0];
          if ("object" === typeof arg[1]) {
            opt = arg[1];
          }
        } catch (e) {
          return console.error(this.parentParams.join(":"), e);
        }

        http.open((opt && opt.method) || "get", url);

        opt &&
          (opt.type && (http.responseType = opt.type),
            opt.withCredentials && (http.withCredentials = opt.withCredentials));
        if (opt && opt.headers) {
          for (var header in opt.headers) {
            http.setRequestHeader(header, opt.headers[header]);
          }
        }

        try {
          http.send(opt && opt.body);
        } catch (error) {
          setTimeout(function () {
            __core__.dispatcher(http, "error")
          }, 0);
        }
      },
      type: FUNCTION,
    },
    {
      keyword: "then",
      onload: function () {
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      callback: function (p) {
        var self = this;
        var http = this.global.http;
        var doc = document.createDocumentFragment();
        this.appendAllTo(doc);

        http.addEventListener("load", function () {
          p = p.split(",");

          var argument;
          try {
            argument = [
              {
                responseURL: http.responseURL,
                status: http.status,
                statusText: http.statusText,
                response: http.response || "",
                responseType: http.responseType,
                toString: function () {
                  return this.response + ""
                }
              }
            ];
          } catch (e) {
            argument = [http.response || ""];
            console.error(
              self.parentParams.join(":") +
              "\nresponse could not be converted to " +
              http.responseType +
              " type"
            );
          }
          http.abort();
          http = delete self.global.http;

          try {
            /* code */
            for (var i = 0; i < p.length; i++) {
              self.eval(argument[i], p[i]);
            }
          } catch (err) {
            console.error(
              self.parentParams.join(":") + "...then:",
              p.join(","),
              err + ""
            );
          }
          self.putChild(__core__.XJSXCompiler(doc, self.eval));
        });
      },
    },
    {
      keyword: "catch",
      onload: function () {
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      callback: function (p) {
        var self = this;
        var http = this.global.http;
        var doc = document.createDocumentFragment();
        this.appendAllTo(doc);
        http.addEventListener("error", function () {
          p = p.split(",");

          try {
            for (var i = 0; i < p.length; i++) {
              self.eval(void 0, p[i]);
            }
          } catch (err) {
            console.error(
              self.parentParams.join(":") + "...catch:",
              p.join(","),
              err + ""
            );
          }
          http = delete self.global.http;

          self.putChild(__core__.XJSXCompiler(doc, self.eval));
        });
        !http.readyState && __core__.dispatcher(http, "error");
      },
    },
  ]);
})()