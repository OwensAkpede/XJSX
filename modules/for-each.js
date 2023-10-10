(function() {
var __core__=XJSX.__XJSXCORE__();
var FKEYWORD = 0xE;
  /** for-each √ **/
  __core__.createModule([
    {
      keyword: "for-each",
      type: FKEYWORD,
      onload: function (p) {
        this.global.callback = [];
        this.global.p = __core__.parseParameter(p, this.eval);
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      onend: function (arg) {
        try {
          var self = this;
          // var exec = this.eval()
          var p = this.global.p;
          var data = p.parameter[0];
          var useDelay = p.parameter[1];

          var foo = function () {
            var exec = self.eval()
            for (var i = 0; i < p.arguments.length; i++) {
              exec(arguments[i], p.arguments[i]);
            }

            for (var i = 0; i < self.global.callback.length; i++) {
              
              
              self.global.callback[i].addChild(
                __core__.XJSXCompiler(
                  self.global.callback[i].e.cloneNode(true),
                  exec
                ),
                true
              );
              /**self.global.callback[i]();**/
            }
          };


          /*  if (data && "object" !== typeof data) {
                        throw "not an Object.";
                      }
                      
            */
          if (!self.isVisible()) {
            // self.terminate();
            return;
          }
          if (!useDelay&&useDelay!==0) {
            if ("number" === typeof data) {
              for (var i = 0; i < data; i++) {
                foo(i);
              }
            } else if (data instanceof Array) {
              for (var i = 0; i < data.length; i++) {
                foo(data[i], i);
              }
            } else if (data instanceof Object) {
              for (var prop in data) {
                foo(data[prop], prop);
              }
            } else {
              throw data + " has no properties.";
            }
          } else {
        
            var lp = __core__.loop(data, foo, useDelay, self);

            "number" === typeof data && !lp.nm()
              ||
              data instanceof Array && !lp.arr()
              ||
              data instanceof Object && !lp.obj()
              || (function () {
                //has no properties
                throw data + " has no properties."
              })()
          }
        } catch (err) {
          // console.log(err);
          console.error(
            "for-each:",
            arg,
            err + ""
          );
          self.remove();
        }
      },
      callback: function () {

       // var self = this;

        this.appendAllTo((this.e = document.createDocumentFragment()));
        /*  if (1 > self.d.childNodes.length) {
          return;
        }*/

        this.global.callback.push(this);
        /*   return 
        self.global.callback.push(function () {
          self.addChild(
            __core__.XJSXCompiler(doc.cloneNode(true), self.eval),
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
     //   var self = this;
        this.appendAllTo((this.e = document.createDocumentFragment()));

        this.global.callback.push(this);
        /*   return 
        self.global.callback.push(function () {
          self.addChild(
            __core__.XJSXCompiler(doc.cloneNode(true), self.eval),
            true
          );
        });*/
      },
    },
  ]);
})()