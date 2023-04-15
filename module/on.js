  /** on √ **/
  XJSX.__createModule__([
    {
      keyword: "on",
      type: "function",
      onload: function () {
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      callback: function (a) {
        try {
          var e = XJSX.parseXJSXParameter(a, this.eval);
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

          XJSX.event.on(param, function () {
            if (self.isVisible()) {
              for (var i = 0; i < e.arguments.length; i++) {
                self.eval(arguments[i], e.arguments[i]);
              }
              self.putChild(
                XJSX.parseElement(doc.cloneNode(true), self.eval)
              );
            } else {
              removeEventListener(param, arguments.callee);
            }
          });
        } catch (err) {
          //    console.log(err);
          console.log("on:", a, err + "");
        }
      },
    },
  ]);
  