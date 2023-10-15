(function(){
  var __core__=XJSX.__XJSXCORE__();
  var MICRO = 0xA;
  var METHOD = 0xB;
  var KEYWORD = 0xC;
  var FUNCTION = 0xD;
  var FKEYWORD = 0xE;
  var MMETHOD = 0x16;
  
  /** use-effect √ **/
  __core__.createModule([
    {
      /*keyword: "animate",*/
      keyword: "use-effect",
      callback: function (arg, node) {
        try {
          arg = this.eval("[" + arg + "]");
          var param = arg[0];
          if (node) {
            var put = node.putChild;
            var id=Date.now()+"-"+Math.random();
            var doc;
            node.putChild = function (n) {
              doc = document.createElement("x-fragment");
              if (n instanceof NodeList) {
                while (n[0]) {
                  doc.appendChild(n[0]);
                }
              } else {
                doc.appendChild(n);
              }
              doc.XJSXEffectId=id
             // console.log(node.id);
              var obj={previousElement:void 0}
              obj.resolve = node.x_addChild(doc);
              obj.newElement = doc

              var pr=doc.previousSibling;
              if (pr&&(pr=pr.XJSXEffectId)) {
              obj.previousElement= doc.previousSibling
              }
              
              obj.arguments =arg

              __core__.effect[param] &&
              //  __core__.effect[param](doc, r, arg);
                __core__.effect[param](obj);
            };
          } else {
            throw "Unexpected token 'animate'";
          }
        } catch (err) {
          console.error("animate:", this.micro_parameter, err + "");
        }
      },
      type: MICRO,
    },
  ]);

  /** html-element **/
  __core__.createModule([
    {
      keyword: "html-element",
      type: KEYWORD,
      onload: function (arg) {
        var elm;
        var e = __core__.parseParameter(arg, this.eval);
        var params = e.parameter;

        var _arg = [this.global.elm = elm = document.createElement(params[0])]

        if ("object" === typeof params[1]) {
          for (var att in params[1]) {
            var v = params[1][att]
            if (v instanceof Object /*elm[att]!==void 0*/ /*elm.hasOwnProperty(att)*/) {
              elm[att] = v
            } else {
              elm.setAttribute(att, v)
            }
          }
        }


        for (var i = 0; i < e.arguments.length; i++) {
          this.eval(_arg[i], e.arguments[i]);
        }
      },
      onprogress: function () {

      },
      callback: function () {
        this.appendAllTo(this.global.elm)
        this.putChild(this.global.elm)
      }
    }
  ])

  /** if **/
  __core__.createModule([
    {
      keyword: "if",
      type: KEYWORD,
      onload: function (q) {
        try {
          !(this.global.q = this.eval("(" + q + ")") ? true : false) &&
            this.killProcess();
        } catch (e) {
          return console.error("if:", q, e + "");
        }
      },
      onprogress: function () {
        !this.global.q && this.delete();
      },
      callback: function () {
        if (this.global.q) {
          this.global.done = true;
        }


      },
    },
    {
      keyword: "else-if",
      onload: function (q) {
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
      onprogress: function () {
        !this.global.q && this.delete();
      },
      callback: function () {
        if (this.global.q) {
          this.global.done = true;
        }
      },
    },
    {
      keyword: "else",
      onload: function () {
        if (this.global.done) {
          this.global.q = false;
          this.killProcess();
        } else {
          this.global.q = true;
        }
      },
      onprogress: function () {
        !this.global.q && this.delete();
      },
      callback: function () {
        this.terminate();

      },
    },
  ]);

  /** print √ **/
  __core__.createModule([
    {
      keyword: "print",
      callback: function (e, node, exec) {
        try {
          node.putChild(exec("[" + e + "][0]"));
        } catch (err) {
          console.error("print:", e, err + "");
          e = "";
        }
      },
      type: METHOD,
    },
  ]);

  /** print-html **/
  __core__.createModule([
    {
      keyword: "print-html",
      callback: function (e, node, exec) {
        if (e != 0) {
          try {
            var tmp =
              __core__.tmp || (__core__.tmp = document.createElement("span"));
            tmp.innerHTML = exec(e);

            node.putChild(tmp.childNodes);
          } catch (err) {
            console.error("print-html:", e, err + "");
          }
        }
      },
      type: METHOD,
    },
  ]);

  /** parse-json **/
  __core__.createModule([
    {
      keyword: "parse-json",
      callback: function (e, node, exec) {
        if (e != 0) {
          try {
            exec("(" + e + ")=JSON.parse(" + e + ")", "");
          } catch (err) {
            console.error("parse-json:", e, err + "");
          }
        }
        node.remove();
      },
      type: METHOD,
    },
  ]);

  /** use-template √ **/
  __core__.createModule([
    {
      keyword: "use-template",
      callback: function (tmp, node, exec) {
        var e = tmp;
        var snapshot;

        try {
          (tmp = exec("[" + e + "]")), (snapshot = tmp[1]), (tmp = tmp[0]);
          if (("string" === typeof tmp) && (tmp in __core__.customTemplates)) {
            console.warn("alpha implementation ");
            tmp = __core__.customTemplates[tmp];
            tmp instanceof HTMLTemplateElement && (tmp = tmp.content || tmp) ||
              !(tmp instanceof Node) && (tmp = document.createTextNode(tmp + ""));
          } else if (tmp instanceof Node) {
            tmp instanceof HTMLTemplateElement && (tmp = tmp.content || tmp);
          } else {
            tmp = document.querySelector('template[id="' + tmp + '"]');
            if (tmp) {
              tmp = tmp.content || tmp;
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
             delete tmp.disabled
             delete tmp.fromXJSXCore
             console.log(tmp.fragment.parentNode);
           tmp.fragment.remove()
             */
              snapshot === 0 && tmp.fragment.remove();

              /*__core__.XJSXCompiler(tmp.fragment, eval)*/
              tmp.fragment = tmp.fragment.cloneNode(true);
            } else {
              tmp.fragment = document.createElement("x-fragment");
              tmp.fragment.appendChild(tmp.cloneNode(true));
              __core__.XJSXCompiler(tmp.fragment, exec);
            }
            node.putChild(tmp.fragment);
          } else {
            node.putChild(__core__.XJSXCompiler(tmp.cloneNode(true), exec));
          }
        } catch (err) {

          console.error("use-template:", e, err + "");
        }
      },
      type: METHOD,
    },
  ]);

  /** eval √ **/
  __core__.createModule([
    {
      keyword: "eval",
      callback: function (e, node, exec) {
        try {
          exec(e.trim().replace(/^"([^]+)"$/g, "$1"));
        } catch (err) {
          console.error("eval:", e, err.toString());
        }
        node.remove();
      },
      type: METHOD,
    },
  ]);

  /** console-log √ **/
  __core__.createModule([
    {
      keyword: "console-log",
      callback: function (e, node, exec) {
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
      type: METHOD,
    },
  ]);

  /** data √ **/
  __core__.createModule([
    {
      keyword: "data",
      callback: function (e, node, exec) {
        try {
          e = exec("[" + e + "][0]");
          __core__.addEventListener("data/" + e, function (ev) {
            (node.isVisible() && !node.putChild(ev.detail)) ||
              removeEventListener("data/" + e, arguments.callee);
          });
        } catch (err) {
          console.error("data:", e, err + "");
        }
      },
      type: METHOD,
    },
  ]);

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

  /** include**/
  __core__.createModule([
    {
      keyword: "include",
      callback: function (url) {
        var url;
        try {
          if (!(url = this.eval("[" + url + "][0]"))) {
            throw "'" + url + "'" + " is not a valid argument";
          }

          var self = this;
          /*XRequest(url,function() {
          
          self.putChild(__core__.XJSXCompiler(__core__.domParser(arguments[0]),self.eval).childNodes)
        },true)*/

          var http = new XMLHttpRequest();
          self.global.http = http;
          http.addEventListener("load", function () {
            /*if (!http.response) {
            __core__.dispatcher(http,"error")
            console.error(url+"\npath could not be included"+"\nmake sure the provided url is a valid html file")
            return 
          }
          */

            self.putChild(
              __core__.XJSXCompiler(
                __core__.domParser(http.response, http.abort()),
                self.eval
              ).childNodes
            );
          });

          http.open("get", url);
          http.send();
        } catch (e) {
          console.error("include:", url, e);
        }
      },
      type: FUNCTION,
    },
    {
      keyword: "catch",
      onload: function () {
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      callback: function () {
        var self = this;
        var doc = document.createDocumentFragment();
        this.appendAllTo(doc);

        if (!self.global.http) {
          self.putChild(__core__.XJSXCompiler(doc, self.eval));
          console.error(self.parentParams.join(":"), "uncaught error");
          return;
        }
        self.global.http.addEventListener("error", function () {

          self.putChild(__core__.XJSXCompiler(doc, self.eval));
          this.abort();
          delete self.global.http;
        });
      },
    },
  ]);

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

  /** on √ **/
  __core__.createModule([
    {
      keyword: "on",
      type: FUNCTION,
      onload: function () {
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      callback: function (a) {
        try {
          var e = __core__.parseParameter(a, this.eval);
          // console.log(e);
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

          __core__.addEventListener(param, function () {
            if (self.isVisible()) {
              for (var i = 0; i < e.arguments.length; i++) {
                self.eval(arguments[i], e.arguments[i]);
              }
              self.putChild(
                __core__.XJSXCompiler(doc.cloneNode(true), self.eval)
              );
            } else {
              removeEventListener(param, arguments.callee);
            }
          });
        } catch (err) {

          console.error("on:", a, err + "");
        }
      },
    },
  
  ]);
  
  /** var √ **/
  __core__.createModule([
    {
      keyword: "var",
      callback: function (param, currentProcess, core) {
        var exec = currentProcess && currentProcess.eval || core.eval
        param = __core__.parseParameter(param).parameter[0].trim();
        param = param.split(/(^[a-zA-Z ]+)\=/);
        param.shift()
        if (param[0]) {
          try {
            exec("var " + param[0] + "=(" + param[1] + ")")
            // exec(exec(param[1]), param[0])
          } catch (err) {
            console.error("var:", param.join(""), err + "");
          }
        }
        param = void 0;
      },
      type: MMETHOD,
    },
  ]);

  /** function √ **/
  __core__.createModule([
    {
      keyword: "function",
      callback: function (e, node, exec) {
        var param = __core__.parseParameter(e).parameter[0];
        try {

          var arg = "";
          for (var i = 0; i < param.length; i++) {
            if (param[i] === ",") {
              break
            }
            arg += param[i]
          }

          param = param.substring(i + 1)
          arg = exec(arg)

          param = exec("[" + param + "]")
          var foo = window[arg]

          arg = ""

          if (typeof foo === "function") {
            for (var i = 0; i < param.length; i++) {
              arg += "param[" + i + "]";
              !(i + 1 === param.length) && (arg += ", ")
            }
            arg = eval("foo(exec, " + arg + ")")
          }
          if (arg) {
            node.putChild(arg)
          }

          arg = void 0;

        } catch (err) {
          console.error("function:", e, err + "");
        }
        e = void 0;
        param = void 0;
      },
      type: METHOD,
    },
  ]);

  /** update √ **/
  __core__.createModule([
    {
      keyword: "update",
      callback: function (arg, node, exec) {
        try {
          var e = "";
          function update() {
            var _e = exec(arg);
            if (_e !== e) {
              node.putChild(_e);
              e = _e;
            }
            return node.isVisible() && requestAnimationFrame(update);
          }
          update();
        } catch (err) {
          console.error("Update:", arg, err + "");
        }
      },
      type: METHOD,
    },
  ]);
  
  /** eval-html **/
  __core__.createModule([
    {
      keyword: "eval-html",
      type: KEYWORD,
      onprogress: function () {
        this.disable();
      },
      callback: function () {
        try {
        var str = "";
        var self = this;
        this.forEach(function(e){
          str+=e.getAllTextContent();
        });
      var doc = document.createElement("span")
      console.log(str);
      str = eval("`"+str.replaceAll("`","\\`")+"`")
      doc.innerHTML=str
      str = void 0;
      this.putChild(doc.childNodes);
      doc = void 0;
        } catch (e) {
          console.log("eval-html:",e);
        }
      }
    }
  ])
})()