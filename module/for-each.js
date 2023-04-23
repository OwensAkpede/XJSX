var loop = function(v, foo, dly, node) {
  var self = this;
  var i = 0

  var _keys = function(e) {
    var k = [];
    for (var p in e) {
      k.push(p)
    }
    return k
  }


  this.nm = function(s) {
    if (!node.isVisible) {
      return
    }
    if (i < v) {
      if (i === 0 || !s) {
        foo(i), i++, self.nm(true);
      } else {
        setTimeout(self.nm, dly)
      }
    }
  }

  this.arr = function(s) {
    if (!node.isVisible) {
      return
    }
    if (i < v.length) {
      if (i === 0 || !s) {
        foo(v[i], i), i++, self.arr(true);
      } else {
        setTimeout(self.arr, dly)
      }
    }
  }

  this.obj = function() {
    var keys = _keys(v);
    var key;
    var loop = function(s) {
      if (!node.isVisible()) {
        return
      }
      if (i < keys.length) {
        key = keys[i]
        if (i === 0 || !s) {
          foo(v[key], key), i++, loop(true);
        } else {
          setTimeout(loop, dly)
        }
      }
    }
    loop()
  }
  // this.i=0
};


/** for-each √ **/
XJSX.__createModule__([
  {
    keyword: "for-each",
    type: "function-keyword",
    onload: function(p) {
      this.global.callback = [];
      //console.log(this);
      this.global.p = XJSX.parseXJSXParameter(p, this.eval);
      //     console.log(this.global.p);
      //  this.global.doc=document.createDocumentFragment()
      this.killProcess();
    },
    onprogress: function() {
      this.disable(); //(this.global.doc);
    },
    onend: function() {
      //   console.log(600);
      try {
        //  console.log(this);
        var self = this;
        var p = this.global.p;
        var data = p.parameter[0];
        var useDelay = p.parameter[1];
        var ct = 0;
        //  console.log("5",data);

        var foo = function() {
          //  ct++;
          var exec = self.eval()
          for (var i = 0; i < p.arguments.length; i++) {
            exec(arguments[i], p.arguments[i]);
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


          // setTimeout(f,500*ct++)

          // requestAnimationFrame(f)

        };


        /*  if (data && "object" !== typeof data) {
                    throw "not an Object.";
                  }
                  
        */
        if (!useDelay) {
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
            throw "not an Object.";
          }
        } else {
          var lp = new loop(data, foo, useDelay, self);
          if ("number" === typeof data) {
            lp.nm()
          } else if (data instanceof Array) {
            lp.arr()
          } else if (data instanceof Object) {
            lp.obj()
          } else {
            throw "not an Object.";
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
    callback: function() {
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
    onload: function(p) {
      this.killProcess();
    },
    onprogress: function() {
      this.disable();
    },
    callback: function() {
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