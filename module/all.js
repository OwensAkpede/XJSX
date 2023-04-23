var animation = {};
var dispatcher_init;
var domParser_node;
var _tmp;

XJSX.createAnimation = function(n, f) {
  "function" === typeof f && (animation[n] = f);
};
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

var dispatcher = function(win, name) {
  !dispatcher_init &&
    (dispatcher_init = document.createEvent("Event"));
  dispatcher_init.initEvent(name);
  win.dispatchEvent(dispatcher_init);
}

var domParser = function() {
  var d = domParser_node || (domParser_node = document.createElement("span"));
  d.innerHTML = arguments[0];
  return d;
}


/** animate √ **/
XJSX.__createModule__([
  {
    keyword: "animate",
    callback: function(arg, node) {
      try {
        arg = this.eval("[" + arg + "]");
        var param = arg[0];
        if (node) {
          var put = node.putChild;
          var doc;
          node.putChild = function(n) {
            doc = document.createElement("x-fragment");
            if (n instanceof NodeList) {
              while (n[0]) {
                doc.appendChild(n[0]);
              }
            } else {
              doc.appendChild(n);
            }
            var r = node.x_addChild(doc);
            animation[param] &&
              animation[param](doc, r, arg);
          };
        } else {
          throw "Unexpected token 'animate'";
        }
      } catch (err) {
        console.error("animate:", this.micro_parameter, err + "");
      }
    },
    type: "micro",
     },
   ]);


/** html-element **/
XJSX.__createModule__([
  {
    keyword: "html-element",
    type: "keyword",
    onload: function(arg) {
      var elm;
      var e = XJSX.parseXJSXParameter(arg, this.eval);
      var params = e.parameter;

      var _arg = [this.global.elm = elm = document.createElement(params[0])]

      if ("object" === typeof params[1]) {
        for (var att in params[1]) {
          var v = params[1][att]
          if (v instanceof Object /*elm[att]!==void 0*/ /*elm.hasOwnProperty(att)*/ ) {
            elm[att] = v
          } else {
            elm.setAttribute(att, v)
          }
        }
      }

      // this.addChild(elm)
      for (var i = 0; i < e.arguments.length; i++) {
        this.eval(_arg[i], e.arguments[i]);
      }
    },
    onprogress: function() {
      // this.appendTo(this.global.elm,true)
    },
    callback: function() {
      this.appendAllTo(this.global.elm)
      this.putChild(this.global.elm)
    }
    }
    ])


/** if **/
XJSX.__createModule__([
  {
    keyword: "if",
    type: "keyword",
    onload: function(q) {
      try {
        !(this.global.q = this.eval("(" + q + ")") ? true : false) &&
        this.killProcess();
      } catch (e) {
        return console.error("if:", q, e + "");
      }
    },
    onprogress: function() {
      !this.global.q && this.delete();
    },
    callback: function() {
      if (this.global.q) {
        this.global.done = true;
      }
      //this.remove();
      //  console.log(this);
    },
    },
  {
    keyword: "else-if",
    onload: function(q) {
      if (this.global.q || this.global.done) {
        this.global.q = false;
        this.killProcess();
        return;
      }
      try {
        !(this.global.q = this.eval("(" + q + ")") ? true : false) &&
        this.killProcess();
      } catch (e) {
        return console.error("if,else-if", q, e + "");
      }
    },
    onprogress: function() {
      !this.global.q && this.delete();
    },
    callback: function() {
      if (this.global.q) {
        this.global.done = true;
      }
    },
    },
  {
    keyword: "else",
    onload: function() {
      if (this.global.done) {
        this.global.q = false;
        this.killProcess();
      } else {
        this.global.q = true;
      }
    },
    onprogress: function() {
      !this.global.q && this.delete();
    },
    callback: function() {
      this.terminate();
      // !this.global.q && this.remove();
    },
    },
  ]);

/** print √ **/
XJSX.__createModule__([
  {
    keyword: "print",
    _trusted: true,
    callback: function(e, node, exec) {
      try {
        node.putChild(exec("[" + e + "][0]"));
      } catch (err) {
        console.error("print:", e, err + "");
        e = "";
      }
    },
    type: "method",
    },
  ]);

/** print-html **/
XJSX.__createModule__([
  {
    keyword: "print-html",
    _trusted: true,
    callback: function(e, node, exec) {
      if (e != 0) {
        try {
          var tmp =
            _tmp || (_tmp = document.createElement("span"));
          tmp.innerHTML = exec(e);
          //  XJSX.parseElement(tmp.content)
          node.putChild(tmp.childNodes);
        } catch (err) {
          console.error("print-html:", e, err + "");
        }
      }
    },
    type: "method",
    },
  ]);

/** parse-json **/
XJSX.__createModule__([
  {
    keyword: "parse-json",
    _trusted: true,
    callback: function(e, node, exec) {
      if (e != 0) {
        try {
          exec("(" + e + ")=JSON.parse(" + e + ")", "");
        } catch (err) {
          console.error("parse-json:", e, err + "");
        }
      }
      node.remove();
    },
    type: "method",
    },
  ]);

/** use-template √ **/
XJSX.__createModule__([
  {
    keyword: "use-template",
    _trusted: true,
    callback: function(tmp, node, exec) {
      var e = tmp;
      var snapshot;

      try {
        (tmp = exec("[" + e + "]")), (snapshot = tmp[1]), (tmp = tmp[0]);

        if (tmp instanceof Node) {
          tmp instanceof HTMLTemplateElement && (tmp = tmp.content);
        } else {
          tmp = document.querySelector('template[id="' + tmp + '"]') || tmp;
          if (tmp instanceof Node) {
            tmp = tmp.content;
          } else {
            console.warn("alpha implementation ");
            tmp = XJSX.customTemplates[tmp];
            /*** promise **/
            tmp instanceof HTMLTemplateElement && (tmp = tmp.content);
            /* 
              if (tmp instanceof Node) {
               if (tmp instanceof HTMLTemplateElement) {
                 tmp = tmp.content;
               }
              }else{
                XJSX.customTemplates[tmp]=document.createElement("template")
                XJSX.customTemplates[tmp].innerHTML=tmp
                tmp=XJSX.customTemplates[tmp]=XJSX.customTemplates[tmp]. content 
             console.log("use-template", e);
              }*/
          }
        }

        if (!tmp) {
          throw "could not render such template";
        }

        if (snapshot || snapshot === 0) {
          console.warn(
            "use-template:...; " + snapshot,
            " alpha implementation"
          );
          /** disabling this for now **/
          if (tmp.fragment) {
            /*  
              console.log(tmp);
             delete tmp._removed
             delete tmp.fromXJSXCore
             console.log(tmp.fragment.parentNode);
           tmp.fragment.remove()
             */
            snapshot === 0 && tmp.fragment.remove();
            //   console.log(snapshot);
            /*XJSX.parseElement(tmp.fragment, eval)*/
            tmp.fragment = tmp.fragment.cloneNode(true);
          } else {
            tmp.fragment = document.createElement("x-fragment");
            tmp.fragment.appendChild(tmp.cloneNode(true));
            XJSX.parseElement(tmp.fragment, exec);
          }
          node.putChild(tmp.fragment);
        } else {
          node.putChild(XJSX.parseElement(tmp.cloneNode(true), exec));
        }
      } catch (err) {
        // console.log(err);
        console.error("use-template:", e, err + "");
      }
    },
    type: "method",
    },
  ]);

/** eval √ **/
XJSX.__createModule__([
  {
    keyword: "eval",
    _trusted: true,
    callback: function(e, node, exec) {
      try {
        exec(e.trim().replace(/^"([^]+)"$/g, "$1"));
      } catch (err) {
        console.error("eval:", e, err.toString());
      }
      node.remove();
    },
    type: "method",
    },
  ]);

/** console-log √ **/
XJSX.__createModule__([
  {
    keyword: "console-log",
    _trusted: true,
    callback: function(e, node, exec) {
      e = e.trim();
      if (!e) {
        return;
      }
      try {
        exec("console.log(" + e + ")");
      } catch (err) {
        console.error("console-log:", e, err.toString());
      }
      node.remove();
    },
    type: "method",
    },
  ]);

/** data √ **/
XJSX.__createModule__([
  {
    keyword: "data",
    _trusted: true,
    callback: function(e, node, exec) {
      try {
        e = exec("[" + e + "][0]");

        XJSX.event.on("data/" + e, function(ev) {
          (node.isVisible() && !node.putChild(ev.detail)) ||
          removeEventListener("data/" + e, arguments.callee);
        });
      } catch (err) {
        console.error("data:", e, err + "");
      }
    },
    type: "method",
    },
  ]);

/** fetch √ **/
XJSX.__createModule__([
  {
    keyword: "fetch",
    onload: function(arg) {
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
    onload: function() {
      this.killProcess();
    },
    onprogress: function() {
      this.disable();
    },
    callback: function(p) {
      var self = this;
      var http = this.global.http;
      var doc = document.createDocumentFragment();
      this.appendAllTo(doc);

      http.addEventListener("load", function() {
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
        } catch (e) {
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
    onload: function() {
      this.killProcess();
    },
    onprogress: function() {
      this.disable();
    },
    callback: function(p) {
      var self = this;
      var http = this.global.http;
      var doc = document.createDocumentFragment();
      this.appendAllTo(doc);

      http.addEventListener("error", function() {
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

/** include**/
XJSX.__createModule__([
  {
    keyword: "include",
    callback: function(url) {
      var url;
      try {
        if (!(url = this.eval("[" + url + "][0]"))) {
          throw "'" + url + "'" + " is not a valid argument";
        }

        var self = this;
        /*XRequest(url,function() {
          
          self.putChild(XJSX.parseElement(domParser(arguments[0]),self.eval).childNodes)
        },true)*/

        var http = new XMLHttpRequest();
        self.global.http = http;
        http.addEventListener("load", function() {
          /*if (!http.response) {
            dispatcher(http,"error")
            console.error(url+"\npath could not be included"+"\nmake sure the provided url is a valid html file")
            return 
          }
          */

          self.putChild(
            XJSX.parseElement(
              domParser(http.response, http.abort()),
              self.eval
            ).childNodes
          );
        });
        //http.responseType="text"
        http.open("get", url);
        http.send();
      } catch (e) {
        console.error("include:", url, e);
      }
    },
    type: "function",
    },
  {
    keyword: "catch",
    onload: function() {
      this.killProcess();
    },
    onprogress: function() {
      this.disable();
    },
    callback: function() {
      var self = this;
      var doc = document.createDocumentFragment();
      this.appendAllTo(doc);

      if (!self.global.http) {
        self.putChild(XJSX.parseElement(doc, self.eval));
        console.error(self.parentParams.join(":"), "uncaught error");
        return;
      }
      self.global.http.addEventListener("error", function() {
        //    console.error(arguments[0]);
        self.putChild(XJSX.parseElement(doc, self.eval));
        this.abort();
        delete self.global.http;
      });
    },
    },
  ]);

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
        var exec = this.eval()
        //  console.log("5",data);

        var foo = function() {
          for (var i = 0; i < p.arguments.length; i++) {
            exec(arguments[i], p.arguments[i]);
          }

          //  console.log(self.global.callback);
          //  console.log(670);
          for (var i = 0; i < self.global.callback.length; i++) {
            self.global.callback[i].addChild(
              XJSX.parseElement(
                self.global.callback[i].d.cloneNode(true),
                self.eval
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

/** on √ **/
XJSX.__createModule__([
  {
    keyword: "on",
    type: "function",
    onload: function() {
      this.killProcess();
    },
    onprogress: function() {
      this.disable();
    },
    callback: function(a) {
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

        XJSX.event.on(param, function() {
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