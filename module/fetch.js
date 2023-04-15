
var dispatcher_init;
var dispatcher=function (win, name) {
      !dispatcher_init &&
        (dispatcher_init = document.createEvent("Event"));
          dispatcher_init.initEvent(name);
      win.dispatchEvent(dispatcher_init);
    }
    

  /** fetch √ **/
  XJSX.__createModule__([
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
        http.send(opt && opt.body);
      },
      type: "function",
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
          //    console.log(http);
          var argument;
          try {
            argument = [
              Object.assign(http.response, {
                responseURL: http.responseURL,
                status: http.status,
                statusText: http.statusText,
                get response() {
                  console.warn(
                    self.parentParams.join(":") +
                      "\nthen:" +
                      p[0] +
                      ".response this function is now deprecated"
                  );
                  return (!http.readyState && argument[0]) || http.response;
                },
                responsetype: http.responseType,
              }),
            ];
          } catch(e){
            argument = [http.response];
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
          self.putChild(XJSX.parseElement(doc, self.eval));
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
          //   console.error(arguments[0]);
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

          self.putChild(XJSX.parseElement(doc, self.eval));
        });
        !http.readyState && dispatcher(http, "error");
      },
    },
  ]);
