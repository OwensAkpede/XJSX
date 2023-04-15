  
  XJSX.createModule(
     "fetch",
     XJSX.FUNCTION,
     {
    onload: function (url) {
      try {
        url = this.eval(url);
      } catch (e) {
        return console.error("fetch",
          url,
          e);
      }
      var http = new XMLHttpRequest();
      http.open("get",
        url);
      http.send();
      this.global.http = http;
    },
  })
  .append(
     "then",
     {
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

        http.onload = function () {
          p = p.split(",");
          var argument = [{
            responseURL: http.responseURL,
            status: http.status,
            statusText: http.statusText,
            responseType: http.responseType,
            response: http.response,
            opened: (http.abort(),
              (http = delete self.global.http)),
          }]

          try {
            /* code */
            for (var i = 0; i < p.length; i++) {
              self.eval(argument[i], p[i]);
            }
          } catch (err) {
            console.error("fetch:,then:", p.join(','), err+"")
          }



          XJSX.parseElement(doc, self.eval);

          self.putChild(doc);
        };
      },
    })
    .append(
     "catch",
     {
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

        http.onerror = function () {
          console.error(arguments[0]);
          p = p.split(",");
          //  var argument=[]

          try {
            for (var i = 0; i < p.length; i++) {
              self.eval(void 0, p[i]);
            }
          }catch(err) {
            console.error("fetch:,catch:", p.join(','), err+"")
          }
          http = delete self.global.http;


          XJSX.parseElement(doc, self.eval);
          self.putChild(doc);
        };
      },
    })
    .end();
  
