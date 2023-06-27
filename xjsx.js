/*! XJSX v 1.5.5 - 24-06-2023  */

/***
 * for-each eval bug fixed
 */

(function (exec) {
  var KEYWORD = "keyword";
  var MICRO = "micro";
  var MKEYWORD = "micro-keyword";
  var FUNCTION = "function";
  var FKEYWORD = "function-keyword";
  var METHOD = "method";
  var time = 0;
  var loop = function (v, foo, dly, node) {
    var self = this;
    var i = 0

    var _keys = function (e) {
      var k = [];
      for (var p in e) {
        k.push(p)
      }
      return k
    }


    this.nm = function (s) {
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

    this.arr = function (s) {
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

    this.obj = function () {
      var keys = _keys(v);
      var key;
      var loop = function (s) {
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
  };
  var __core__ = {
    _observer: (window.MutationObserver &&
      function () {
        var lastChild;
        var lastDoc;
        var cn;
        var core = this;
        var n;
        var lc;
        var obs = new window.MutationObserver(function (e) {
          document.readyState === "complete" &&
            (obs.disconnect(), core.XJSXLastProcessCallback());

          (lastDoc && (lc = lastDoc)) ||
            ((lc = document.body) && (lastDoc = lc)) ||
            (lc = document.head || document.documentElement);

          while (lc.lastChild) {
            lc = lc.lastChild;
          }
          /*****/

          if (lastChild && lastChild === lc) {
            return;
          }
          lastChild = lc;
          /****/
          /***
      if ((cn=e[e.length-1])&&(cn=cn.addedNodes[0])) {
      while (cn.lastChild) {
      cn=cn.lastChild
      }
      if (cn!==lc) {
      return;
      }
      }else{
      return
      }
      ***/

          for (var i = 0; i < e.length; i++) {
            var record = e[i];

            for (var _i = 0; _i < record.addedNodes.length; _i++) {
              n = record.addedNodes[_i];

              !n.parentNode ||
                n.fromXJSXCore ||
                n.parentNode.removed ||
                n.parentNode._removed ||
                (n.parentNode.fromXJSXCore && (n.fromXJSXCore = true)) ||
                core.stage(n);
            }
          }


        });
        obs.observe(document, {
          childList: true,
          subtree: true,
        });
        addEventListener("load", function () {
          !core.resolved &&
            (obs.disconnect(), core.XJSXLastProcessCallback());
          removeEventListener('load', arguments.callee);
        });

      }) ||
      function () {
        console.warn("MutationObserver unavailable in this browser...");
        console.warn(
          'will now manually parse this document with the "onload" event.'
        );
        var doc = this.document;
        addEventListener("load", function () {
          __core__.XJSXCompiler(doc);
          removeEventListener('load', arguments.callee);
        });
      },
    animation: {},
    createAnimation: function (n, f) {
      "function" === typeof f && (__core__.animation[n] = f);
    },
    events: {},
    addEventListener: function (name, foo) {
      __core__.events[name] && foo(__core__.events[name]);
      window.addEventListener(name, foo);
    },
    dispatchEvent: function (name, data) {
      var evt = __core__.events[name];
      !evt &&
        (__core__.events[name] = evt = document.createEvent("CustomEvent"));
      evt.initCustomEvent(name, false, false, data);
      window.dispatchEvent(evt);
    },
    dispatcher: function (win, name) {
      !__core__.dispatcher_init &&
        (__core__.dispatcher_init = document.createEvent("Event"));
      __core__.dispatcher_init.initEvent(name);
      win.dispatchEvent(__core__.dispatcher_init);
    },
    stage: function (e) {
      var currentProcess = this.getOnboardProcess();


      (e instanceof Comment &&
        e.data.search(/^\?[^\?][^]+[^\?]\?$/) === 0 &&
        !this.XJSXProcessor(e, currentProcess)) ||
        (currentProcess && currentProcess.nodes.append(e /*, false*/));
      /***
          * if (currentProcess.module.operations[0].type === KEYWORD) {

          } else {
          currentProcess.documentFragment.appendChild(e);
          }
          ***/

      /***  console.timeEnd('p') **/
      /*
        else if (mode === this.mode[1]) {
        } else if (mode === "null") {
           console.error("mode");
        }
        */
    },
    _XJSXSyntax: function (e) {

      /*  if (e.search(/^\?\?[^\?][^]+[^\?]\?\?$/) === 0) {
          return this.mode[0];
        } else*/
      return e.search(/^\?[^\?][^]+[^\?]\?$/) === 0 && this.mode[1];


    },
    XJSXSyntax: function (e) {
      /*  if (e.data.search(/^\?\?[^\?][^]+[^\?]\?\?$/) === 0) {
            return this.mode[0];
          } else */
      return (
        e instanceof Comment &&
        e.data.search(/^\?[^\?][^]+[^\?]\?$/) === 0 &&
        this.mode[1]
      );

      /*
          ? e.data.match(/\?\?/gim)
            ? this.mode[0]
            : e.data.match(/\?\?/gim)
            ? this.mode[1]
            : "null"
          : false;
          */
    },
    isKeyWord: function (e) {
      return (
        "string" === typeof e &&


        e.match(/^[a-z0-9]+([^]+[a-z0-9])?$/)
      );
    },
    /* isVariable: function (e) {
        return "string" === typeof e &&
          e.trim() &&
          e.length > 0 &&
          e.match(/^[a-z_$]*([a-z_$])?$/i)
        ;
      },*/
    parseKeyWord: function (e) {
      e = e.trim();
      while (e[0] === "?") {
        e = e.substring(1);
      }
      while (e[e.length - 1] === "?") {
        e = e.substring(0, e.length - 1);
      }
      var i = 0;
      var keyword = "";

      while (e[0] !== ":" && e.length > 0) {
        i++;
        keyword += e[0];
        e = e.substring(1);
      }
      e[0] === ":" && (e = e.substring(1));

      return [keyword.trim() /*.toLowerCase()*/, e];
    },
    parseParameter: function (_e, exec) {
      _e = _e.split(";");
      (2 > _e.length && _e.push([])) ||
        (_e[_e.length - 1] = _e[_e.length - 1].split(","));

      return {
        arguments: _e.pop(),
        parameter: (exec && exec("[" + _e + "]")) || _e,
      };
    },
    domParser: function () {
      var d = __core__.domParser_node
      d = d && d.cloneNode(true) || document.createElement("span");
      d.innerHTML = arguments[0];
      return d;
    },
    /**  domParser:{
      parseFromString:function() {
        var d=new DOMParser();
        __core__.domParser=d;
       return d.parseFromString(arguments[0],arguments[1]);
      }
      },**/
    mode: ["embedded", "defined"],
    createModule: function (module) {
      if (module instanceof Array && 1 > module.length) {
        return console.error(
          "createModule",
          "module could not be created",

          module
        );
      }

      if (!this.isKeyWord(module[0].keyword)) {
        return console.error(
          "createModule",

          "invalid keyword",
          module[0].keyword,
          module
        );
      }

      /*module[0].keyword = module[0].keyword.toLowerCase();*/

      if (
        this.modules[module[0].keyword] ||
        this.signedKeywords[module[0].keyword]
      ) {
        return console.error(
          "createElement",

          "keyword already taken",
          module[0].keyword,
          module
        );
      }

      this.modules[module[0].keyword] = {
        operations: module,
        keywords: {},
        name: module[0].keyword,
      };

      /*this.signedKeywords[module[0].keyword] = module[0].keyword;*/

      for (var i = 1; i < module.length; i++) {
        /*  if (!this.isKeyWord(module[i].keyword)) {
            delete this.modules[module[0].keyword];
            return console.error("createModule","invalid module name",module[i].keyword);
          }*/

        /*else if (
          this.modules[module[i].keyword] 

        ) {



        }*/

        /* module[i].keyword = module[i].keyword.toLowerCase();*/
        this.modules[module[0].keyword].keywords[module[i].keyword] = i;
        this.signedKeywords[module[i].keyword] = module[0].keyword;

        !this.isKeyWord(module[i].keyword) &&
          delete this.modules[module[0].keyword] &&
          console.error(
            "createModule",
            "invalid module name",
            module[i].keyword,
            (module = [])
          );
        this.modules[module[i].keyword] &&
          console.warn(
            "createElement",

            "keyword already taken",
            module[i].keyword,
            module


          );
      }
    },
    /*  getModule: function (key) {
        return this.modules[key];
      },*/
    _eval: function (exec) {
      /***
       * use strict inside eval to avoid "arguments"
       */
      return function () {
        var r = exec(arguments[0], arguments[1])
        exec = r[1];

        // if (arguments.length===0) {
        // }else{
        // }

        return (
          (arguments.length === 0 && __core__._eval(exec)) ||
          (arguments.length === 1 && "string" === typeof arguments[0] && r[0])
        );
      };
    },
    /*eval:_eval,
    _eval:function() {
    },
    get_scope:function() {
        return _eval(arguments[0],arguments[1])
      },
    set_scope:function() {
        _eval=_eval(arguments[0],arguments[1], true)
      },*/
    modules: {},
    moduleType: [KEYWORD, METHOD, FUNCTION],
    customTemplates: {},
    signedKeywords: {},
    moduleLength: 0,
    hasOnboardProcess: function () {
      return this.onboardProcesses.length > 0;
    },
    getOnboardProcess: function () {
      return this.onboardProcesses[this.onboardProcesses.length - 1] || null;
    },
    terminateCurrentProcess: function () {
      var cP = this.onboardProcesses[this.onboardProcesses.length - 1];
      cP && ((cP.isterminated = true), this.onboardProcesses.pop());
    },
    onboardProcesses: [],
    /* getPreviousNode: function (node) {
        if (!node) {
          return;
        } else if (node.previousSibling) {
          return node.previousSibling;
        } else if (node.parentNode) {
          return node.parentNode;
        }
        return;
      },*/
    getPNextNode: function (p) {
      return p && (p.nextSibling || p.parentNode && this.getPNextNode(p.parentNode));
    },
    getNextNode: function (node) {
      return (
        node &&
        (node.firstChild ||
          node.nextSibling ||
          node.parentNode && this.getPNextNode(node.parentNode))
      );

      /*
        if (!node) {
          return;
        } else if (node.firstChild) {
          return node.firstChild;
        } else if (node.nextSibling) {
          return node.nextSibling;
        } else if (node.parentNode) {
          return node.parentNode.nextSibling;
        } else {
          return;
        }*/
    },
    createElement: function (name, trusted) {
      ("string" === typeof name && (name = document.createElement(name))) ||
        ((trusted = name),
          (name = document.createTextNode("")),
          (name.process = {}),
          (name.process.nodes = this.XJSXNodeList(name)),
          (name._remove = name.remove),
          (name.remove = function () {
            name.process.nodes.remove();

            name._remove();
          }));

      name.fromXJSXCore = trusted;
      return name;
    },
    execCallback: function (crt, opt, node) {
      /*** check ***/
      if (crt.isDeadProcess && opt !== "onprogress") {

        return;
      }


      !opt && (opt = "callback");

      var foo = crt.callback[opt];

      if ("function" !== typeof foo) {
        return;
      }





      crt = {
        __proto__: crt,
      };

      /*
     foo.prototype = this.CALLBACK_PROTOTYPE(crt, opt, node);
      new foo(crt.params[1]);
     foo.prototype = {};
    */
      var o = this.CALLBACK_PROTOTYPE(
        crt,
        ("onend" === opt && "callback") || opt,
        node
      );

      o.__callback__ = foo;
      o.__callback__(
        crt.params[1],
        // (o.f = void 0),
        opt === "callback" &&
        crt.micro_callback &&
        crt.micro_callback(crt.micro_parameter, o)
      );

      crt.closed = true;
    },
    CALLBACK_PROTOTYPE: function (process, opt, node) {
      /*****
       * use process.__proto__ to set process
       * note: this process is an instance, use .__proto__
       * fixed!!
       *****/

      var type = process.module.operations[0].type;
      var core = this;
      var _this = {
        parentParams: process.parentParams,
        isVisible: process.nodes.isVisible,
        eval: function () {
          return (
            (arguments.length === 0 && process.eval()) ||
            (arguments[1] && !process.eval(arguments[0], arguments[1])) ||
            process.eval(arguments[0])
          );
          /*
              if (arguments.length === 0) {
                return process.eval();
              } else if (arguments[1]) {
                return process.eval(arguments[0], arguments[1]);
              } else {
                return process.eval(arguments[0]);
              }*/
        },
        forEach: function (foo) {
          if (process.closed) {
            return console.warn("process has ended ");
          }
          if ("function" !== typeof foo) {
            return console.error("parameter should be a function ");
          }

          opt === "callback" &&
            process.nodes.forEach(function (a) {
              foo(core.toXJSXElement(a, process));
            });

          console.warn("this .forEach() method is deprecated");
        },
        global: process.global,
      };

      (opt === "onprogress" &&
        ((_this.appendTo = function (doc) {



          doc.appendChild(node.cloneNode(true));
        }),
          /* (_this.moveNodeTo=function(doc) {
             console.warn("moveNodeTo:","not fully implemented!")
           }),*/
          (_this.disable = function () {
            (!process.closed && (node.remove(), (node._removed = true))) ||
              console.error("process has ended ");
          }),
          (_this.delete = function () {
            (!process.closed && (node.remove(), (node.removed = true))) ||
              console.error("process has ended ");
          }))) ||
        /****check**/

        (opt === "onload" &&
          (_this.killProcess = function () {
            process.__proto__.isDeadProcess = true;
          })) ||
        (opt === "callback" &&
          ((_this.appendAllTo = function (doc, clone) {
            (clone &&
              !process.nodes.forEach(function (node) {
                doc.appendChild(node.cloneNode(true));
              })) ||
              process.nodes.forEach(function (node) {
                doc.appendChild(node);
              }) ||
              process.nodes.flush();
          }),
            (_this.remove = process.remove),

            (_this.removeAllNode = process.nodes.remove),
            (_this._removeAllNode = function (foo) {
              process.nodes.forEach(function (node) {
                node.remove();
                "function" === typeof foo &&
                  (foo(node),
                    console.error("deprecated argument at removeAllNode() method", foo));
              });
              process.nodes.flush();
            }),
            (_this.flush = function () {
              process.nodes.flush();
            }),
            (_this.addChild = function (child, sub) {
              var pp = process;

              if (!sub) {
                while (pp.parentProcess) {
                  pp = pp.parentProcess;
                }
              }

              pp = pp.nodes;

              if (child instanceof NodeList) {
                var _p = pp.me();
                while (child.length) {
                  child[0].fromXJSXCore = true;
                  pp.push(child[0]);
                  _p.parentNode.insertBefore(child[0], _p);
                }
                return;
              } else if (child instanceof DocumentFragment) {
                for (var i = 0; i < child.childNodes.length; i++) {
                  child.childNodes[i].fromXJSXCore = true;
                  pp.push(child.childNodes[i]);
                }
              } else if (child instanceof Node) {

                pp.push(child);
              } else {
                pp.push((child = document.createTextNode(child)));
              }
              pp = pp.me();
              child.fromXJSXCore = true;
              pp.parentNode.insertBefore(child, pp);
            }),
            /*put*/
            (_this.putChild = function (child, sub) {
              var pp = process;
              if (!sub) {
                while (pp.parentProcess) {
                  pp = pp.parentProcess;
                }
              }

              pp = pp.nodes;

              pp.remove();

              pp.flush();
              if (child instanceof NodeList) {
                var _p = pp.me();
                while (child.length) {
                  child[0].fromXJSXCore = true;
                  pp.push(child[0]);
                  _p.parentNode.insertBefore(child[0], _p);
                }
                return;
              } else if (child instanceof DocumentFragment) {
                for (var i = 0; i < child.childNodes.length; i++) {
                  child.childNodes[i].fromXJSXCore = true;
                  pp.push(child.childNodes[i]);
                }
              } else if (child instanceof Node) {

                pp.push(child);
              } else {
                pp.push((child = document.createTextNode(child)));
              }
              pp = pp.me();
              child.fromXJSXCore = true;
              pp.parentNode.insertBefore(child, pp);
            }),
            (_this.terminate = function () {
              (!process.closed && process.isterminated) ||
                (core.onboardProcesses.pop(),
                  (process.__proto__.isterminated = true)) ||
                console.error("process has ended ");
            })) &&
          process.micro_callback &&
          (_this.x_addChild = function (child) {
            var pp = process;
            while (pp.parentProcess) {
              pp = pp.parentProcess;
            }
            pp = pp.nodes;
            var n = pp.cut();
            if (child instanceof NodeList) {
              var _p = pp.me();
              while (child.length) {
                child[0].fromXJSXCore = true;
                pp.push(child[0]);
                _p.parentNode.insertBefore(child[0], _p);
              }
              return;
            } else if (child instanceof DocumentFragment) {
              for (var i = 0; i < child.childNodes.length; i++) {
                child.childNodes[i].fromXJSXCore = true;
                pp.push(child.childNodes[i]);
              }
            } else if (child instanceof Node) {

              pp.push(child);
            } else {
              pp.push((child = document.createTextNode(child)));
            }
            pp = pp.me();
            child.fromXJSXCore = true;
            pp.parentNode.insertBefore(child, pp);
            return n;
          }));
      return _this;
    },
    toXJSXElement: function (node, process) {
      return {
        appendTo: function (doc, clone) {
          if (clone) {
            doc.appendChild(node.cloneNode(true));
          } else {
            doc.appendChild(node);
          }
        },
        remove: function () {
          if (process.closed) {
            return console.error("process has ended ");
          }
          node.remove();
        },
        getAllTextContent: function () {
          var txt = node.textContent;
          if (node.process) {
            node.process.nodes.forEach(function (e) {
              txt += e.textContent;
            });
          } else { }
          return txt;
        },

        /*,
        get textContent() {
            return node.textContent;
        }
        */
      };
    },
    XJSXNodeList: function (node) {
      var process = node.process;

      var nodes = [];
      var currentNodeParent;
      var foo; /**this would be a bug in the future**/
      var core = this;
      var forEach = function (a) {
        if (a instanceof Array) {
          a.forEach(forEach);
          return;
        } else if (a instanceof NodeList) {
          var len = a.length;
          for (var i = 0; i < len; i++) {
            len !== a.length && ((i = 0), (len = a.length));
            foo(a[i]);
          }

          return;
        }
        foo(a);
        a.process &&
          a.process.nodes.forEach &&
          a.process.nodes.forEach(forEach);

        /** commented for performance pp**/
        /***foo(core.toXJSXElement(a, process))***/


        /** commented for performance pp**/
        /***  foo(core.toXJSXElement(a, process)); **/

      };
      var self = {
        isVisible: function () {
          // console.log([core.document.contains && core.document.contains(node.parentElement || node),node.parentNode,core.document]);
          return core.document.contains && core.document.contains(node.parentElement || node); /*core.document.documentElement*/
        },
        me: function () {

          return node;
        },
        flush: function (a) {
          nodes = [];
        },
        cut: function () {
          var n = nodes;
          nodes = [];
          return function () {
            for (var i = 0; i < n.length; i++) {
              var a = n[i];
              if (a instanceof Array) {
                for (var _i = 0; _i < a.length; _i++) {
                  a[_i].remove();
                }
                return;
              } else if (a instanceof NodeList) {
                while (a.length > 0) {
                  a[a.length - 1].remove();
                }
                return;
              }

              a.remove();
            }
            n = [];
          };
        },
        push: function (e) {
          nodes.push(e);
        },
        append: function (e) {
          /*** this will prevent dublicate*/
          /**   if (process._isDeadProcess) {
         if (self.removed) {
           e.remove()
         }
         return
       }**/

          /*
            if (!e.parentNode && currentNodeParent) {
              console.error("this is not supposed to happen");

              return;
            }
            if (currentNodeParent && e.parentNode === currentNodeParent) {
              return;
            } else {
              currentNodeParent = void 0;
            }

            if (e instanceof Element) {
              currentNodeParent = e;
            }
            */
          if (currentNodeParent && currentNodeParent.contains && currentNodeParent.contains(e)) {
            return;
          }
          currentNodeParent = e;

          /***/

          !process._isDeadProcess &&
            core.execCallback(process, "onprogress", e);

          e.removed || (self.removed && !e.remove()) || nodes.push(e);
        },
        forEach: function (f) {
          foo = f;
          if (process.closed) {
            console.error("process has ended ");
            return;
          }
          if ("function" !== typeof foo) {
            console.error("parameter should be a function ");
            return;
          }
          for (var i = 0; i < nodes.length; i++) {
            forEach(nodes[i]);
          }
        },
        remove: function () {
          if (process.closed) {
            return console.error("process has ended ");
          }
          process.removed = self.removed = true;
          for (var i = 0; i < nodes.length; i++) {
            var a = nodes[i];
            if (a instanceof Array) {
              for (var _i = 0; _i < a.length; _i++) {
                a[_i].remove();
              }
              return;
            } else if (a instanceof NodeList) {
              while (a.length > 0) {
                a[a.length - 1].remove();
              }
              return;
            }

            a.remove();
          }
          nodes = [];
        },
        pop: function () {
          nodes.pop();
        },

        /*,
        get length(){
            return nodes.length;
        },
        get lastChild() {
            return nodes[nodes.length - 1];
        } */
      };
      return self;
    },
    XJSXMethodKeyword: function (e) {
      var process = e.process.nodes;

      return {
        remove: e.remove,
        isVisible: process.isVisible,
        /*put*/
        putChild: function (node) {
          process.remove();
          if (node instanceof NodeList) {
            while (node.length) {
              node[0].fromXJSXCore = true;
              process.push(node[0]);
              e.parentNode.insertBefore(node[0], e);
            }
            return;
          } else if (node instanceof DocumentFragment) {
            for (var i = 0; i < node.childNodes.length; i++) {
              node.childNodes[i].fromXJSXCore = true;
              process.push(node.childNodes[i]);
            }
          } else if (node instanceof Node) {

            process.push(node);
          } else {
            process.push((node = document.createTextNode(node)));
          } !node.fromXJSXCore && (node.fromXJSXCore = true);
          e.parentNode.insertBefore(node, e);
        },
      };
    },
    XJSXLastProcessCallback: function () {
      this.resolved = true;
      /** here should be a loop that loops through all onboardProcesses - really convenient*/
      this.onboardProcesses.length &&
        /***check end**/
        this.modules.end.operations[0].callback(
          void 0,
          this.onboardProcesses[this.onboardProcesses.length - 1],
          this
        );

      this.timeStamp &&
        console.log("onload: %dms", window.performance && performance.now() - this.timeStamp);
    },
    XJSXProcessor: function (e, currentProcess) {
      var params = this.parseKeyWord(e.data);
      var isNewProcess;
      var type;
      var isChildProcess;
      var module;

      (currentProcess &&
        currentProcess.module.keywords[params[0]] &&
        !(module = false)) ||
        (module = this.modules[params[0]]) /*getModule(params[0])*/;

      /*     var module=
        currentProcess &&
        currentProcess.module.keywords[params[0]]&&
        false||
        this.getModule(params[0]);
        
        
        if (currentProcess &&
        currentProcess.module.keywords[params[0]]) {
          var module=false;
        }else{
          var module=this.getModule(params[0]);
        }*/
      /* var module =
        currentProcess &&
        currentProcess.module.keywords[params[0]]
          ?  false
          : this.getModule(params[0]);*/
      /* var module =
          !currentProcess && (this.getModule(params[0]),true) ||
          !currentProcess.module.keywords[params[0]]&&
             this.getModule(params[0])
              ||
             false;
             */

      module &&
        ((type = module.operations[0].type),

          (isNewProcess = !(type === MKEYWORD || type === MICRO)));


      if (type === MICRO) {

        if (
          !currentProcess ||
          currentProcess._isDeadProcess ||
          currentProcess.type !== "function"
        ) {

          /* !(shouldProcess && isChildProcess) &&
          !(shouldProcess && type === MKEYWORD) &&*/



          return;
        }

        e.remove();



        currentProcess.micro_parameter = params[1];
        currentProcess.micro_callback = module.operations[0].callback;
        return;
      }

      !isNewProcess &&
        currentProcess &&
        (currentProcess.isDeadProcess = currentProcess._isDeadProcess);

      var shouldProcess =
        (!currentProcess && 1) || (!currentProcess.isDeadProcess && 1) || 0;


      /***
       * comment code
       * **/

      /****
      if (
      !isNewProcess&&
      currentProcess.isDeadProcess&&
      !currentProcess._isDeadProcess

      ) {
      shouldProcess=true
      console.log(params[1]);

      }
      ***/



      if (module === false) {
        if (!shouldProcess) {
          currentProcess.nodes.append(e /*, shouldProcess*/);
          return;
        }
        /** is next in line?**/
        isChildProcess = true;
        var nextInLineProcess;
        var currentInLineProcess;

        module = currentProcess.module;
        type = currentProcess.type;
        /*
          var previousKeyword = currentProcess.name;

          if (previousKeyword === module.name) {
          previousKeyword =0
          }else{
          previousKeyword =module.keywords[previousKeyword]
          }*/
        /*
          previousKeyword =
            previousKeyword === module.name
              && 0
              || module.keywords[previousKeyword];*/


        (currentProcess.name === module.name && !(nextInLineProcess = 0)) ||
          (nextInLineProcess = module.keywords[currentProcess.name]);



        currentInLineProcess = module.keywords[params[0]];

        var err_msg =
          "Unexpected token '" +
          params[0] +
          "'.\n" +
          ((nextInLineProcess >= 1 &&
            "( " + currentProcess.parentParams.join(":") + " )...") ||
            "") +
          "( " +
          currentProcess.params.join(":") +
          " )..." +
          "( " +
          params.join(":") +
          " ) " +
          "... ";

        if (
          (type === KEYWORD &&

            nextInLineProcess > currentInLineProcess) ||
          (type === FUNCTION && nextInLineProcess + 1 !== currentInLineProcess)
        ) {

          return console.error(err_msg);
        }

        this.execCallback(currentProcess);
        if (currentProcess.isterminated) {
          this.terminateCurrentProcess();
          /*** check **/
          return console.error(err_msg);
        } else {
          this.terminateCurrentProcess();
        }
      }

      /**
      if (!e.parentNode) {
                console.error(
          "Note: this error was handled successfully",
          "not sure what happened, but this node was offtrack",
          e
        );
        return "this is weird...nodes should have parents"
     
      }
        ***/

      if (shouldProcess) {
        var newNode = this.createElement(true);
        e.parentNode.insertBefore(newNode, e);
        e.remove();

        e = newNode;
      } else {

        e.process = {};
        e.process.nodes = {};
        e.process.nodes.append = currentProcess.nodes.append;
      }

      /*** @check isChildProcess **/

      currentProcess &&
        !(shouldProcess && isChildProcess) &&
        !(shouldProcess && type === MKEYWORD) &&
        currentProcess.nodes.append(e /*, shouldProcess*/);

      if (!module) {
        console.error(
          "Unexpected token '%s' (%s:%s)",
          params[0],
          params[0],
          params[1]
        );
        return;
      }

      if (type === MKEYWORD) {
        module.operations[0].callback &&
          module.operations[0].callback(params[1], currentProcess, this);

        /*** check ***/

        return;
      } else if (type === METHOD) {
        shouldProcess &&
          module.operations[0].callback &&
          module.operations[0].callback(
            /*var trusted = module[0].trusted;*/

            params[1],
            this.XJSXMethodKeyword(e),
            /*  trusted ? e : this.XJSXMethodKeyword(e),*/
            (currentProcess && currentProcess.eval) || this.eval
            /* function(core) {
                console.log(params,currentProcess);
                if (core===__core__) {
                  return 0
                }
              }*/
          );


        return;
      }

      /*
     (type === KEYWORD&&((currentProcess && currentProcess.eval) || this.eval)
      )||
        ((currentProcess && alert(7))|| alert(9));
      */



      /* else if(type===FKEYWORD){
        _eval=currentProcess ? isChildProcess?currentProcess.eval:currentProcess.eval() : this.eval();
        console.log(currentProcess);
      }*/

      /* if (type===KEYWORD) {
            e.process.eval=currentProcess&&currentProcess.eval||this.eval
          }else{
            if (type===FKEYWORD&&isChildProcess) {
               e.process.eval=currentProcess.eval
            }else{
            e.process.eval=currentProcess&&currentProcess.eval()||this.eval()
            }
            try {
          
            console.log(type,currentProcess&&currentProcess.eval("data"));
            } catch (e) {}
          }*/

      e.process.eval =
        (type === KEYWORD &&
          ((currentProcess && currentProcess.eval) || this.eval)) ||
        (FKEYWORD === type &&
          isChildProcess &&
          currentProcess &&
          currentProcess.eval) ||
        (currentProcess && currentProcess.eval()) ||
        this.eval();

      /*   var r= (0&&currentProcess && 1 || 2)
      ||
        currentProcess && 3|| 4*/



      e.process.__proto__ = {
        name: params[0],
        params: params,
        remove: e.remove,
        isterminated: void 0,

        isDeadProcess: (currentProcess && currentProcess.isDeadProcess) || void 0,
        _isDeadProcess: (currentProcess && currentProcess.isDeadProcess) || void 0,
        parentProcess: (!isNewProcess && currentProcess) || void 0,
        parentParams: (isNewProcess && params) || currentProcess.parentParams,
        global: (isNewProcess && {}) || currentProcess.global,
        /*
        eval: type === KEYWORD&&currentProcess && currentProcess.eval || this.eval
      ||
        currentProcess && currentProcess.eval() || this.eval()
      ,*/

        module: module,
        type: module.operations[0].type,
        callback: module.operations[module.keywords[params[0]]] || module.operations[0],
      };

      shouldProcess && this.execCallback(e.process, "onload");

      this.onboardProcesses.push(e.process);
    },
    /**  XJSXCompilerCS: function () {},**/
    XJSXCompiler: function (element, _exec) {
      var core = {


        document: element,
        onboardProcesses: [],
        eval: ("function" === typeof _exec && _exec) || __core__._eval(exec),
        __proto__: __core__,
      };



      /*   if(element.childElementCount>0){*/
      var node = document
        .createTreeWalker(element, NodeFilter.SHOW_COMMENT, function (n) {
          return __core__._XJSXSyntax(n.data) && true;
        })
        .nextNode();

      var last = document
        .createTreeWalker(element, NodeFilter.SHOW_COMMENT, function (n) {
          return __core__._XJSXSyntax(n.data) && true;
        })
        .lastChild();
      /*  }else{

          var node=element.firstChild;
          var last;
          }*/
      var _n = node && (node.nextSibling || node.parentNode);

      // console.log(_n);
      // var o=Math.random()

      while (node) {
        if (node === last) {
          core.stage(node);
          break;
        }

        core.stage(node);

        if (node.parentNode) {
          node = core.getNextNode(node);
          _n = core.getNextNode(node);
          // console.log("_n",o,_n);
        } else {
          node = _n;
          // node&&
          // console.log(node.parentNode,o);
          _n = node.nextSibling || (node.parentNode && node.parentNode.nextSibling);
          // o=2
        }
        /*
       (node === last)&&!(core.stage(node),node=void 0)||(
          
              !core.stage(node)&&
              
                 (
                   node.parentNode && 
                    (node = core.getNextNode(node), _n = core.getNextNode(node), true)
                   ||
                   (node = _n,_n = core.getNextNode(node))
                  )
                  );
       
*/

        /* 
         node = _n;
        _n = core.getNextNode(node);
        
          */
        /*
         !node||
         node.parentNode && 
            (node = core.getNextNode(node)) &&
            (_n = core.getNextNode(node))
          ||
            _n&&(node = _n) && (_n = core.getNextNode(node));
            
        */
      }
      core.document = document;
      core.XJSXLastProcessCallback();
      return element;
    },
    /* error_meassages: {
        IMC: "invalid module case",
      },*/
  };


  /** end **/
  __core__.createModule([
    {
      keyword: "end",
      callback: function (e, currentProcess, core) {
        /* if (currentProcess&&currentProcess.isDeadProcess) {
                    !currentProcess.isterminated &&
            core.terminateCurrentProcess()
            return 
        }*/
        (currentProcess &&
          (!currentProcess.isDeadProcess &&
            !core.execCallback(currentProcess) &&
            currentProcess.module.operations[0].onend &&
            (currentProcess.callback = currentProcess.module.operations[0]) &&
            core.execCallback(currentProcess, "onend"),
            !(!currentProcess.isterminated && core.terminateCurrentProcess()))) ||
          console.error("Unexpected token 'end'");
      },
      type: MKEYWORD,
    },
  ]);

  /** animate √ **/
  __core__.createModule([
    {
      keyword: "animate",
      callback: function (arg, node) {
        try {
          arg = this.eval("[" + arg + "]");
          var param = arg[0];
          if (node) {
            var put = node.putChild;
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
              var r = node.x_addChild(doc);
              __core__.animation[param] &&
                __core__.animation[param](doc, r, arg);
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
      _trusted: true,
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
      _trusted: true,
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
      _trusted: true,
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
      _trusted: true,
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
             delete tmp._removed
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
      _trusted: true,
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
      _trusted: true,
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
      _trusted: true,
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
              throw data + " has no properties.";
            }
          } else {
            var lp = new loop(data, foo, useDelay, self);

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

        var self = this;

        this.appendAllTo((self.e = document.createDocumentFragment()));
        /*  if (1 > self.d.childNodes.length) {
          return;
        }*/

        self.global.callback.push(self);
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
        var self = this;
        this.appendAllTo((self.e = document.createDocumentFragment()));

        self.global.callback.push(self);
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



  !window.DISABLE_XJSX/*||!document.documentElement.attributes.xjsx*/ &&
    {
      eval: __core__._eval(exec),
      onboardProcesses: [],
      document: document,
      __proto__: __core__,
    }._observer();

  window.XJSX = {
    FUNCTION: 2,
    METHOD: 1,
    KEYWORD: 0,
    createAnimation: __core__.createAnimation,
    parseXJSXParameter: __core__.parseParameter,
    createTemplate: function (name, val) {
      var cust = __core__.customTemplates
      return new Promise(function (res, rej) {
        function check() {
          _i++
          // console.log(_i, i);
          if (done && _i >= i) {
            res()
          }
        }
        var obj = {};
        if ("object" === typeof name) {
          obj = name
        } else {
          obj[name] = val;
        }
        var i = 0
        var _i = 0;
        var done
        for (var key in obj) {
          i++
          val = obj[key]
          delete obj[key]
          if (val instanceof Promise) {
            (function (key) {
              val.then(function (e) {
                cust[key] = e;
                check()
              })
              val.catch(function () {
                cust[key] = "";
                check()
              })
            })(key)
          } else {
            cust[key] = val;
            _i++;
          }
        }
        done = true
        i++
        check()
      })
    },
    customTemplates: __core__.customTemplates,
    eval: __core__._eval(exec),
    event: {
      emit: __core__.dispatchEvent,
      on: __core__.addEventListener,
      emitData: function (name, data) {
        __core__.dispatchEvent('data/' + name, data)
      },
    },
    parseElement: function (node, exec) {
      (node instanceof Node &&
        __core__.XJSXCompiler(
          node,
          (window.eval === exec &&
            !(console.warn(
              "parseElement",
              "second argument is not a valid instance"
            ),
              (exec = void 0))) ||
          exec
        )) ||
        console.error("XJSX/parse", "invalid argument", node);
    },
    createModule: function (name, type, obj) {
      if (!__core__.moduleType[type]) {
        return console.error("invalid value...");
      }
      var module = [
        {
          keyword: name,
          type: __core__.moduleType[type],
          onload: obj.onload,
          onprogress: obj.onprogress,
          callback: obj.callback,
        },
      ];

      type === 1 && (__core__.createModule(module), (module = void 0));
      return {
        append: function (name, obj) {
          if (!module) {
            return console.warn(
              "no need to panic...this is not an error",
              "module initialized already."
            );
          }
          module.push({
            keyword: name,
            onload: obj.onload,
            onprogress: obj.onprogress,
            callback: obj.callback,
          });
          return this;
        },
        end: function () {
          (module && !__core__.createModule(module)) ||
            console.warn(
              "no need to panic...this is not an error",
              "module initialized already."
            );
        },
      };
    },
    __createModule__: function () {
      __core__.createModule(arguments[0])
    }
  };

  !Node.prototype.remove && (Node.prototype.remove = function () {
    this.parentNode && this.parentNode.removeChild(this)
  })

  !Document.prototype.contains && (Node.prototype.contains = function (nd) {
    for (var i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i].contains && this.childNodes[i].contains(nd)) { return true }
    }
    return false
  })

  !XMLHttpRequest.prototype.hasOwnProperty("response") && Object.defineProperty(XMLHttpRequest.prototype, 'response', {
    get: function () {
      return this.responseText || this.responseXML || ""
    }
  })

})(function () {
  return (
    (!arguments[1] &&
      "string" === typeof arguments[0] && [
        eval(arguments[0], (arguments[0] = arguments[1] = void 0)),
        eval("(" + arguments.callee + ")"),
      ]) ||
    ("string" === typeof arguments[1] && [
      eval("var " + arguments[1] + "=arguments[0]"),
      eval("(" + arguments.callee + ")"),
      (arguments[0] = arguments[1] = void 0),
    ]) || [
      eval(arguments[0], (arguments[0] = arguments[1] = void 0)),
      eval("(" + arguments.callee + ")"),
    ]
  );
});