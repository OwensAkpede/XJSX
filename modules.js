 

  /** if **/
  XJSX.createModule([{
    keyword: "if",
    onload: function (q) {
      try {
        q = this.global.q = this.eval(q) ? true: false;
      } catch (e) {
        return console.error("if:", q, e);
      }
      if (!q) {
        this.killProcess();
      }
    },
    onprogress: function (q) {
      q = this.global.q;

      if (q) {
        return;
      }
      this.delete();
    },
    callback: function (q) {
      q = this.global.q;
      if (!q) {
        this.remove();
      } else {
        this.global.done = true;
      }
    },
    type: KEYWORD,
  },
    {
      keyword: "else-if",
      onload: function (_q) {
        _q = _q.trim();
        var q = this.global.q;
        if (q || this.global.done) {
          this.global.q = false;
          this.killProcess();
          return;
        }
        if (this.global.done) {}
        try {
          q = this.global.q = _q && this.eval("(" + _q + ")") ? true: false;
        } catch (e) {
          return console.error("if,else-if", _q, e);
        }
        if (!q) {
          this.killProcess();
        }
      },
      onprogress: function (q) {
        q = this.global.q;
        if (q) {
          return;
        }
        this.delete();
      },
      callback: function (q) {
        q = this.global.q;
        if (!q) {
          this.remove();
        } else {
          this.global.done = true;
        }
      },
    },
    {
      keyword: "else",
      onload: function (q) {
        if (this.global.done) {
          this.global.q = false;
          this.killProcess();
        } else {
          this.global.q = true;
        }
      },
      onprogress: function (q) {
        q = this.global.q;
        if (q) {
          return;
        }
        this.delete();
      },
      callback: function (q) {
        this.terminate();
        q = this.global.q;
        if (!q) {
          this.remove();
        }
      },
    },
  ]);




  /** print **/
  XJSX.createModule([{
    keyword: "print",
    _trusted: true,
    callback: function (e, node, eval) {
      // e = e.trim();
      if (e != 0) {
        try {
          node.putChild(eval("(" + e + ")"));
        } catch (err) {
          console.error("print:", e, err + "");
          e = "";
        }
      }
    },
    type: METHOD,
  },
  ]);





  /** parse-json **/
  XJSX.createModule([{
    keyword: "parse-json",
    _trusted: true,
    callback: function (e, node, eval) {
      if (e != 0) {
        try {
          eval("(" + e + ")=JSON.parse(" + e + ")", "");
        } catch (err) {
          console.error("parse-json:", e, err + "");
        }
      }
      node.remove();
    },
    type: METHOD,
  },
  ]);




  /** use-template **/
  XJSX.createModule([{
    keyword: "use-template",
    _trusted: true,
    callback: function (tmp, node, eval) {
      var e = tmp;
      tmp = eval(tmp);
      // console.log(tmp);
      if (tmp instanceof Node) {
        if (tmp instanceof HTMLTemplateElement) {
          tmp = tmp.content
        }
      } else {
        tmp = document.querySelector("template[id=\"" + tmp+"\"]");
        if (tmp) {
          tmp = tmp.content
        } else {
          // fetch
          console.log("use-template", e);
        }
      }

      if (!tmp) {
        return console.error(
          "use-template",
          "'template#" + e + "' no such template element found"
        );
      }

      tmp = tmp.cloneNode(true);
      XJSX.parseElement(tmp, eval);
      node.putChild(tmp);
    },
    type: METHOD,
  },
  ]);
  
  
  
  
  

  /** eval **/
  XJSX.createModule([{
    keyword: "eval",
    _trusted: true,
    callback: function (e, node, eval) {
      try {
        eval(e.trim().replace(/^"|"$/g, ""));
      } catch (err) {
        console.error("eval:", e, err.toString());
      }
      node.remove();
    },
    type: METHOD,
  },
  ]);
  
  
  


  /** console-log **/
  XJSX.createModule([{
    keyword: "console-log",
    _trusted: true,
    callback: function (e, node, eval) {
      e=e.trim()
      if (!e) {
        return 
      }
      try {
        eval("console.log("+e+")");
      } catch (err) {
        console.error("console-log:", e, err.toString());
      }
      node.remove();
    },
    type: METHOD,
  },
  ]);
  





  /** data **/
  XJSX.createModule([{
    keyword: "data",
    _trusted: true,
    callback: function (e, node, eval) {
      //  c=Date.now()
      // console.log(c);
      XJSX.on("data/"+e.trim(), function(ev) {
        //  console.log(c);
        if (node.isVisible()) {
          node.putChild(ev.detail || "")
        } else {
          //   console.log(node);
          removeEventListener("data/"+e.trim(), arguments.callee)
        }
      })
    },
    type: METHOD,
  },
  ]);






  /** fetch **/
  XJSX.createModule([{
    keyword: "fetch",
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
    },
  ]);
  





  /** for-each **/
  XJSX.createModule([{
    keyword: "for-each",
    type: KEYWORD,
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
  },
  ]);





  /** on **/
  XJSX.createModule([{
    keyword: "on",
    type: FUNCTION,
    onload: function () {
      this.killProcess();
    },
    onprogress: function () {
      this.disable();
    },
    callback: function (e) {
      try {
        e = XJSX.parseParameter(e)
        var param = e.parameter[0].trim()
        if (!param) {
          throw "empty parameter";
        } else {
          /* handle here */
          param = this.eval(param)
        }

        var self = this;
        var doc = document.createDocumentFragment(),
        _doc;
        self.appendAllTo(doc)
         //   console.log(doc.childNodes);

        XJSX.event.on(param, function() {
          if (self.isVisible()) {
            //   console.log(arguments[0]);
            for (var i = 0; i < e.arguments.length; i++) {
              self.eval(arguments[i], e.arguments[i])
            }
            _doc = doc.cloneNode(true)
           XJSX.parseElement(_doc, self.eval)
            self.putChild(_doc)
            // console.log(doc);
          } else {
            removeEventListener(param, arguments.callee)
          }
        });
      } catch (err) {
        console.log("on:",
          e.parameter.join(','),
          e.arguments.join(','),
          err+"");
      }
    },
  },
  ]);
