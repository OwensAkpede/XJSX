  XJSX.createModule(
     "for-each",
     XJSX.KEYWORD,
     {
    onload: function () {
      this.killProcess();
    },
    onprogress: function () {
      this.disable();
    },
    callback: function (p) {
      try {

        var self = this;
        //    console.log(this);
        self.terminate()
        p = XJSX.parseParameter(p, true)
        // var argument=p.arguments
        var param = p.parameter[0].trim()
        //  p = p.trim().split(";");
        //   console.log(p);
        var data;
        data = param && self.eval("(" + param + ")");
        if (data && "object" !== typeof data) {
          throw "not an Object.";
        }
        /*
      if (p[1]) {
        p = p[1].split(",");
      } else {
        p = void 0;
      }
*/
        var doc = document.createDocumentFragment(),
        _doc;
        this.appendAllTo(doc);
        /*
      if (p) {
        if (p[0] && !__core__.isVariable(p[0].trim())) {
          console.error("'" + p[0] + "' is not a valid variable name");
          p = void 0;
        } else if (p[1] && !__core__.isVariable(p[1].trim())) {
          console.error("'" + p[1] + "' is not a valid variable name");
          p = void 0;
        }
      }
      */
        var foo = function () {
          for (var i = 0; i < p.arguments.length; i++) {
            self.eval(arguments [i], p.arguments[i]);
          }
          // if (p) {
          //  p[0] && self.eval(data[prop], p[0]);
          //  p[1] && self.eval(prop, p[1]);
          // }
          XJSX.parseElement((_doc = doc.cloneNode(true)), self.eval());
          self.addChild(_doc);
        };

        if (data instanceof Array) {
          for (var i = 0; i < data.length; i++) {
            foo(data[i], i);
          }
        } else {
          for (var prop in data) {
            foo(data[prop], prop);
          }
        }
      } catch (e) {
        console.error("for-each:",
          p.parameter.join(','),
          p.arguments.join(','), e + "");
        self.remove();
        // return;
      }
    },
  })
  .end()
