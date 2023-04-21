  /** for-each √ **/
  XJSX.__createModule__([ 
    {
      keyword: "for-each",
      type:  "function-keyword",
      onload: function (p) {
        this.global.callback = [];
        //console.log(this);
        this.global.p = XJSX.parseXJSXParameter(p, this.eval);
        //     console.log(this.global.p);
        //  this.global.doc=document.createDocumentFragment()
        this.killProcess();
      },
      onprogress: function () {
        this.disable(); //(this.global.doc);
      },
      onend: function () {
        //   console.log(600);
        try {
          //  console.log(this);
          var self = this;
          var p = this.global.p;
          var data = p.parameter[0];
           var ct=0;
          //  console.log("5",data);

          var foo = function () {
          //  ct++;
            var exec =self.eval()
            for (var i = 0; i < p.arguments.length; i++) {
              exec(arguments[i], p.arguments[i]);
            }
            function f() {
              if (!self.isVisible()) {
                return 
                }
            //  console.log(self.global.callback);
            //  console.log(670);
            for (var i = 0; i < self.global.callback.length; i++) {
              self.global.callback[i].addChild(
                XJSX.parseElement(
                  self.global.callback[i].d.cloneNode(true),
                  exec
                ),
                true
              );
              /**self.global.callback[i]();**/
            }
            }
            f();
           // setTimeout(f,500*ct++)
            
          // requestAnimationFrame(f)
            
          };

          if (data && "object" !== typeof data) {
            throw "not an Object.";
          }

          if (data instanceof Array) {
            for (var i = 0; i < data.length; i++) {
              foo(data[i], i);
            }
          } else {
            for (var prop in data) {
              foo(data[prop], prop);
            }
          }
        } catch (err) {
          console.log(err);
          console.error(
            "for-each:",
            p.parameter.join(","),
            p.arguments.join(","),
            err + ""
          );
          self.remove();
        }
      },
      callback: function () {
        //   console.log("callback for-each",this.global.p.parameter);
        var self = this;
        //   p = this.global.p;
        this.appendAllTo((self.d = document.createDocumentFragment()));
        /*  if (1 > self.d.childNodes.length) {
          return;
        }*/
        //  console.log(self);
        self.global.callback.push(self);
        /*   return 
        self.global.callback.push(function () {
          self.addChild(
            XJSX.parseElement(doc.cloneNode(true), self.eval),
            true
          );
        });*/
      },
    },
    {
      keyword: "break",
    },
    {
      keyword: "continue",
      onload: function (p) {
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      callback: function () {
        var self = this;
        this.appendAllTo((self.d = document.createDocumentFragment()));
        //   console.log(self.d);
        self.global.callback.push(self);
        /*   return 
        self.global.callback.push(function () {
          self.addChild(
            XJSX.parseElement(doc.cloneNode(true), self.eval),
            true
          );
        });*/
      },
    },
  ]);
