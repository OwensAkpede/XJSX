/***
* @param {file} script.js(14) subset of this
* @onprogress
* @parentProcess
* @core.execCallback
* check XJSXNodeList>append>if>!e.parentNode  at about line 535
* document.replaceChildren:()
*/

(function (exec) {
  var KEYWORD = "keyword",
  MKEYWORD = "micro-keyword",
  METHOD = "method",
  FUNCTION = "function",
  MICRO = "micro";
  var time = 0;
  
  var __core__ = {
    // document: document,
    _observer: window.MutationObserver
    ? function (elm) {
      var lastChild,
      lastDoc,
      cn,
      core = this,
      n,
      lc,
      obs = new window.MutationObserver(function (e) {
        if (!lastDoc) {
          if ((lc = document.body)) {
            lastDoc = lc;
          } else {
            lc = document.head || document.documentElement;
          }
        } else {
          lc = lastDoc;
        }

        while (lc.lastChild) {
          lc = lc.lastChild;
        }
        /*****/
        //if (lastChild) {
        // }
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
            if (
              !n.parentNode ||
              n.fromXJSXCore ||
              n.parentNode.removed ||
              n.parentNode._removed
            ) {
              continue;
            }else if (n.parentNode.fromXJSXCore) {
             n.fromXJSXCore=true;
             continue;
            }
            core.stage(n);
          }
        }

        return (n = e = i = void 0);
      });
      obs.observe(elm || document,
        {
          childList: true,
          subtree: true,
        });
      addEventListener( "load",
        function () {
          if (!core.resolved) {
            obs.disconnect();
            core.XJSXLastProcessCallback();
          }
        });
      return (elm = void 0), obs;
    }
    : function (elm) {
      elm.addEventListener("DOMNodeInserted",
        function (e) {
          void (e.target.fromXJSXCore ? 0: core.stage(e.target));
          e = void 0;
        });
      return (elm = void 0);
    },
    events: {},
    addEventListener: function(name,
      foo) {
      //  console.log(66);
      if (__core__.events[name]) {
        foo(__core__.events[name])
      }
      window.addEventListener(name, foo);
    },
    dispatchEvent: function(name, data) {
      var evt = __core__.events[name];
      if (!evt) {
        __core__.events[name] = evt = document.createEvent('CustomEvent');
      }
      evt.initCustomEvent(name, false, false, data);
      window.dispatchEvent(evt);
    },
    stage: function (e) {
      /*** console.time('p') **/

      var currentProcess = this.getOnboardProcess();

      var mode = this.XJSXSyntax(e);

      if (mode === this.mode[1]) {
        this.XJSXProcessor(e, currentProcess);
      } else {
        if (currentProcess) {
          currentProcess.nodes.append(e, false);
          /***
          * if (currentProcess.module.operations[0].type === KEYWORD) {

          } else {
          currentProcess.documentFragment.appendChild(e);
          }
          ***/
        }
      }
      /***  console.timeEnd('p') **/
      /*
        else if (mode === this.mode[1]) {
        } else if (mode === "null") {
           console.error("mode");
        }
        */
    },
    XJSXSyntax: function (e) {
      if (e instanceof Comment) {
        if (e.data.search(/^\?\?[^\?][^]+[^\?]\?\?$/) === 0) {
          return this.mode[0];
        } else if (e.data.search(/^\?[^\?][^]+[^\?]\?$/) === 0) {
          return this.mode[1];
        }
        return void 0;
      }

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
        e.trim() &&
        e.length > 1 &&
        e.match(/^[a-z0-9]+([^]+[a-z0-9])?$/)
      );
    },
    isVariable: function (e) {
      return (
        "string" === typeof e &&
        e.trim() &&
        e.length > 0 &&
        e.match(/^[a-z_$]*([a-z_$])?$/i)
      );
    },
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
      if (e[0] === ":") {
        e = e.substring(1);
      }


      return [keyword.trim().toLowerCase(),
        e];
    },
    parseParameter: function(_e) {
      _e = _e.split(';')
      if (2 > _e.length) {
        _e.push([])
      } else {
        _e[_e.length-1] = _e[_e.length-1].split(',');
      }
      return {
        arguments: _e.pop(),
        parameter: _e
      }
      // obj.arguments=_e[_e.length-1]
      // var r=  _e.pop();
      //  obj.parameter=_e

    },
    mode: ["embedded",
      "defined"],
    createModule: function (module) {
      if (module instanceof Array && 1 > module.length) {
        return console.error(this.error_meassages.IMC, module);
      }

      if (!this.isKeyWord(module[0].keyword)) {
        return console.error(
          this.error_meassages.IMC,
          "invalid keyword",
          module
        );
      }

      module[0].keyword = module[0].keyword.toLowerCase();

      if (
        this.modules.hasOwnProperty(module[0].keyword) ||
        this.signedKeywords.hasOwnProperty(module[0].keyword)
      ) {
        return console.error(
          this.error_meassages.IMC,
          "keyword already taken",
          module
        );
      }

      this.modules[module[0].keyword] = {
        operations: module,
        keywords: {},
        name: module[0].keyword,
      };

      for (var i = 1; i < module.length; i++) {
        if (!this.isKeyWord(module[i].keyword)) {
          delete this.modules[module[0].keyword];
          return console.error(this.error_meassages.IMC, module[i].keyword);
        }
        module[i].keyword = module[i].keyword.toLowerCase();
        this.modules[module[0].keyword].keywords[module[i].keyword] = i;
        this.signedKeywords[module[i].keyword] = module[0].keyword;
      }
    },
    getModule: function (key) {
      return this.modules[key];
    },
    _eval: function (__eval__) {
      /***
      * use strict inside eval to avoid "arguments"
      */
      return function () {
        var r = __eval__(arguments[0], arguments[1]);
        __eval__ = r[1];
        if (arguments.length === 1 && "string" === typeof arguments[0]) {
          return r[0];
        } else if (arguments.length === 0) {
          return __core__._eval(r[1]);
        }
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
    moduleType: [KEYWORD,
      MKEYWORD,
      METHOD,
      FUNCTION],
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
      if (cP) {
        cP.isterminated = true;
        this.onboardProcesses.pop();
      }
    },
    onboardProcesses: [],
    getPreviousNode: function (node) {
      if (!node) {
        return;
      } else if (node.previousSibling) {
        return node.previousSibling;
      } else if (node.parentNode) {
        return node.parentNode;
      }
      return;
    },
    getNextNode: function (node) {
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
      }
    },
    createElement: function (name, trusted) {
      if ("string" === typeof name) {
        name = document.createElement(name);
      } else {
        trusted = name;
        name = document.createTextNode("");
        name.process = {};
        name.process.nodes = this.XJSXNodeList(name);

        name._remove = name.remove;
        name.remove = function () {
          name.process.nodes.remove();
          name._remove();
          // document.removeChild(name)
        };
      }
      name.fromXJSXCore = trusted;
      return name;
    },
    execCallback: function (crt, opt, node) {
      /*** check ***/
      if (crt.isDeadProcess && opt !== "onprogress") {
        return;
      }
      var foo = crt.callback;

      if (!opt) {
        opt = "callback";
      }
      foo = foo[opt];
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
      //var p=performance.now()
      var o = this.CALLBACK_PROTOTYPE(crt, opt, node)
      o.f = foo
      o.f(crt.params[1], o.f = void 0,opt==="callback"&&crt.micro_callback&&crt.micro_callback(o));
      
      //  console.log(performance.now()-p);
      crt.closed = true;
    },
    CALLBACK_PROTOTYPE: function (process, opt, node) {
      /*****
      * use process.__proto__ to set process
      * note: this process is an instance, use .__proto__
      * fixed!!
      *****/
      //console.log(process);
      var type = process.module.operations[0].type,
      core = this,
      _this = {
        parentParams: process.parentParams,
        isVisible: process.nodes.isVisible,
        eval: function () {
          if (arguments.length === 0) {
            return process.eval();
          } else if (arguments[1]) {
            return process.eval(arguments[0], arguments[1]);
          } else {
            return process.eval(arguments[0]);
          }
        },
        forEach: function (foo) {
          if (process.closed) {
            return console.error("process has ended ");
          }
          if ("function" !== typeof foo) {
            return console.error("parameter should be a function ");
          }
          if (opt === "callback") {
            process.nodes.forEach(function (a) {
              //     console.log(a);
              foo(core.toXJSXElement(a, process));
            });
          } else if (opt === "onload") {
            /* code */
          }
          console.error("this .forEach() method is deprecated");
        },
        global: process.global,
      };

      if (opt === "onprogress") {
        _this.appendTo = function (doc) {
          doc.appendChild(node.cloneNode(true));
        };
        /** core.id === "observer" **/
        if (core.id) {
          _this.disable = function () {
            if (process.closed) {
              return console.error("process has ended ");
            }

            return (node._removed = true),
            node.remove();
          };
          _this.delete = function () {
            if (process.closed) {
              return console.error("process has ended ");
            }
            return (node.removed = true),
            node.remove();
          };
        } else {
          _this.delete = _this.disable = function () {};
        }
      }

      /****check**/

      if (opt === "onload") {
        _this.killProcess = function () {
          //  process.isDeadProcess = true;
          process.__proto__.isDeadProcess = true;
        };
      }

      if (opt === "callback") {
        _this.appendAllTo = function (doc, clone) {
          if (clone) {
            process.nodes.forEach(function (node) {
              doc.appendChild(node.cloneNode(true));
            });
            //  process.nodes.flush();
          } else {
            process.nodes.forEach(function (node) {
              doc.appendChild(node);
            });
            process.nodes.flush();
          }
        };
        _this.remove = process.remove;
        _this.removeAllNode = process.nodes.remove;
        _this._removeAllNode = function (foo) {
          process.nodes.forEach(function (node) {
            node.remove();
            if ("function" === typeof foo) {
              console.log("deprecated argument in removeAllNode() method");
              foo(node);
            }
          });
          process.nodes.flush();
        };
        _this.flush = function () {
          process.nodes.flush();
        };
        _this.addChild = function (child) {
          var pp = process;
          while (pp.parentProcess) {
            pp = pp.parentProcess;
          }
          pp = pp.nodes;

          if (child instanceof Array) {
            pp.push(child);
            pp = pp.me();

            for (var i = 0; i < child.length; i++) {
              child[i].fromXJSXCore=true
              pp.parentNode.insertBefore(child[i], pp);
            }

            return;
          } else if (child instanceof DocumentFragment) {
            // var t=performance.now()
            for (var i = 0; i < child.childNodes.length; i++) {
              child.childNodes[i].fromXJSXCore=true 
              pp.push(child.childNodes[i]);
            }
            // console.log(performance.now()-t);
          } else {
            pp.push(child);
          }
          pp = pp.me();
          child.fromXJSXCore=true 
          pp.parentNode.insertBefore(child, pp);
        };
      
       if (process.micro_callback) {
        _this.x_addChild = function (child) {
          var pp = process;
          while (pp.parentProcess) {
            pp = pp.parentProcess;
          }
          pp = pp.nodes;
      var n=pp.cut();
          if (child instanceof Array) {
            pp.push(child);
            pp = pp.me();

            for (var i = 0; i < child.length; i++) {
              child[i].fromXJSXCore=true 
              pp.parentNode.insertBefore(child[i], pp);
            }

            return;
          } else if (child instanceof DocumentFragment) {
            // var t=performance.now()
            for (var i = 0; i < child.childNodes.length; i++) {
              child.childNodes[i].fromXJSXCore=true
              pp.push(child.childNodes[i]);
            }
            // console.log(performance.now()-t);
          } else {
            pp.push(child);
          }
          pp = pp.me();
          child.fromXJSXCore=true
          pp.parentNode.insertBefore(child, pp);
          return n
        };
       }
        
        _this.putChild = function (child) {
          var pp = process;
          while (pp.parentProcess) {
            pp = pp.parentProcess;
          }
          pp = pp.nodes;
          pp.remove();

          if (child instanceof Array) {
            pp.flush();
            pp.push(child);
            pp = pp.me();

            for (var i = 0; i < child.length; i++) {
              child[i].fromXJSXCore=true 
              pp.parentNode.insertBefore(child[i], pp);
            }
          } else {
            if (child instanceof DocumentFragment) {
              pp.flush();
              for (var i = 0; i < child.childNodes.length; i++) {
               child.childNodes[i].fromXJSXCore=true 
                pp.push(child.childNodes[i]);
              }
            } else {
              pp.flush();
              pp.push(child);
            }
            pp = pp.me();
            child.fromXJSXCore=true
            pp.parentNode.insertBefore(child, pp);
          }
        };
        _this.terminate = function () {
          if (process.closed) {
            return console.error("process has ended ");
          }
          if (!process.isterminated) {
            // process.isterminated = true;
            process.__proto__.isterminated = true;
            core.onboardProcesses.pop();
          }
        };
      }

      return _this;
    },
    toXJSXElement: function (node, process) {
      return {
        appendTo: function(doc, clone) {
          if (clone) {
            doc.appendChild(node.cloneNode(true))
          } else {
            doc.appendChild(node)
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
          } else {}
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

      var nodes = [],
      currentNodeParant,
      foo,
      core = this,
      forEach = function (a) {
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
        if (a.process) {
          foo(a);
          // console.log(a.process);
          /** commented for performance pp**/
          /***foo(core.toXJSXElement(a, process))***/
          a.process.nodes.forEach(forEach);
          // a.process.nodes.forEach(function(n) {
          //  console.log(n);
          // });

        } else {
          foo(a);
          /** commented for performance pp**/
          /***  foo(core.toXJSXElement(a, process)); **/
        }
      },
      self = {
        isVisible: function() {
          return core.document.contains(node)
        },
        me: function () {
          return node;
        },
        flush: function (a) {
          nodes = [];
        },
        cut: function() {
          var n=nodes;
          nodes=[]
          return function() {
           for (var i = 0; i < n.length; i++)
           {
             var a=n[i]
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
          }
        },
        push: function (e) {
          nodes.push(e);
        },
        append: function (e, shouldProcess) {
          /*** this will prevent dublicate*/
          if (!e.parentNode && currentNodeParant) {
            console.error("this is not supposed to happen");

            return;
          }
          if (currentNodeParant && e.parentNode === currentNodeParant) {
            return;
          } else {
            currentNodeParant = void 0;
          }

          if (e instanceof Element) {
            currentNodeParant = e;
          }
          /***/

          if (!shouldProcess) {
            core.execCallback(process, "onprogress", e);
          }
          if (e.removed) {
            return;
          }
          if (self.removed) {
            e.remove();
          } else {
            nodes.push(e);
          }
        },
        forEach: function (f) {
          foo = f;
          if (process.closed) {
            return console.error("process has ended ");
          }
          if ("function" !== typeof foo) {
            return console.error("parameter should be a function ");
          }
          for (var i = 0; i < nodes.length; i++) {
            forEach(nodes[i])
          }
        //  nodes.forEach(forEach);
        },
        remove: function () {
          if (process.closed) {
            return console.error("process has ended ");
          }
          process.removed = self.removed = true;
        for (var i = 0; i < nodes.length; i++)
           {
             var a=nodes[i]
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
      // return this.CALLBACK_PROTOTYPE(e.process,"callback")
      return {
        remove: e.remove,
        isVisible: process.isVisible,
        putChild: function (node) {
          process.remove()
          //    process.flush();
          //    console.log(process);
          if (node instanceof DocumentFragment) {
            for (var i = 0; i < node.childNodes.length; i++) {
              node.childNodes[i].fromXJSXCore=true
              process.push(node.childNodes[i]);
            }
          } else if (node instanceof Node) {
            node.parentNode && (node = node.cloneNode(true));
            //node.fromXJSXCore=true
            process.push(node);
          } else {
            process.push(node = document.createTextNode(node));
           // node.fromXJSXCore=true
          }
          node.fromXJSXCore=true
          e.parentNode.insertBefore(node, e);
        },
      };
    },
    XJSXLastProcessCallback: function () {
      this.resolved = true;

      if (this.hasOnboardProcess()) {
        /***check end**/
        this.modules.end.operations[0].callback(
          void 0,
          this.onboardProcesses[this.onboardProcesses.length - 1],
          this
        );
      }
      this.timeStamp && console.log(`onload: ${performance.now()-this.timeStamp}ms`);
    },
    XJSXProcessor: function (e, currentProcess) {
      //var t=performance.now()
      var params = this.parseKeyWord(e.data);

      var isNewProcess;
      var type;
      var isChildProcess;
      var module =
      currentProcess &&
      currentProcess.module.keywords.hasOwnProperty(params[0])
      ? void 0: this.getModule(params[0]);

      if (module) {
        type = module.operations[0].type;
        isNewProcess = type === MKEYWORD || type === MICRO ? false: true;
      }

if (type===MICRO&&currentProcess) {
         currentProcess.micro_parameter=params[1];
         currentProcess.micro_callback=module.operations[0].callback;
          e.remove();
        // module && module(params[1], currentProcess, this);
  return 
}


      if (!isNewProcess && currentProcess) {
        currentProcess.isDeadProcess = currentProcess._isDeadProcess;
      }

      var shouldProcess =
      currentProcess && currentProcess.isDeadProcess ? false: true;

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

      if (
        currentProcess &&
        currentProcess.module.keywords.hasOwnProperty(params[0])
      ) {
        // console.log(currentProcess);
        /** is next in line?**/
        isChildProcess = true;
        var nextInLineProcess;
        var currentInLineProcess;
        module = currentProcess.module;
        type = module.operations[0].type;
        var previousKeyword = currentProcess.name;
        previousKeyword =
        previousKeyword === module.operations[0].keyword
        ? 0: module.keywords[previousKeyword];

        nextInLineProcess = previousKeyword;
        currentInLineProcess = module.keywords[params[0]];

        var err_msg =
        "Unexpected token '" +
        params[0] +
        "'.\n" +
        (nextInLineProcess === 1
          ? "": "( " + currentProcess.parentParams.join(":") + " )...") +
        "( " +
        currentProcess.params.join(":") +
        " )..." +
        "( " +
        params.join(":") +
        " ) " +
        "... ";

        if (
          (type === KEYWORD && nextInLineProcess > currentInLineProcess) ||
          (type === FUNCTION && nextInLineProcess + 1 !== currentInLineProcess)
        ) {
          return console.error(err_msg);
        }

        this.execCallback(currentProcess);
        if (currentProcess.isterminated) {
          /*** check **/
          this.terminateCurrentProcess();
          return console.error(err_msg);
        } else {
          this.terminateCurrentProcess();
        }
      }


      if (e.parentNode) {
        if (shouldProcess) {
          var newNode = this.createElement(true);
          e.parentNode.insertBefore(newNode, e);
          e.remove();
          e = newNode;
        } else {
          
          e.process = {};
          e.process.nodes = this.XJSXNodeList(e);
        }
      } else {
        console.error(
          "Note: this error was handled successfully",
          "not sure what happened, but this node was offtrack",
          e
        );
        return;
        /**
        this is weird...nodes should have parents
        ***/
      }

      /*** @check isChildProcess **/
      //console.log(params[0]);
      if (
        currentProcess &&
        !(shouldProcess && isChildProcess) &&
        !(shouldProcess && type === MKEYWORD)
      ) {
        currentProcess.nodes.append(e, shouldProcess);
      }
      //else{
   //   }

      if (!module) {
       //console.log(params);
        console.error(
          "Unexpected token '%s' (%s:%s)",
          params[0],
          params[0],
          params[1]
        );
        return;
      }

      if (type === MKEYWORD) {
        //  if (shouldProcess) {
       // console.log(module,params);
        module = module.operations;
        module = module[0].callback;
       //    console.log(params);
     //   e.remove()
        if (module) {
          module(params[1], currentProcess, this);
        }
        // } else {
        /*** check ***/
        //   console.log(55);
        //   this.terminateCurrentProcess();
        // }
        return;
      } else if (type === METHOD) {
        if (shouldProcess) {
          module = module.operations;
          var trusted = module[0].trusted;
          module = module[0].callback;
          if (module) {
            //console.log(this.getOnboardProcess());
            module(
              params[1],
              trusted ? e: this.XJSXMethodKeyword(e),
              currentProcess ? currentProcess.eval: this.eval
             /* function(core) {
                console.log(params,currentProcess);
                if (core===__core__) {
                  return 0
                }
              }*/
              
            );
          }
        }
        return;
      }

      if (type === KEYWORD) {
        var _eval = currentProcess ? currentProcess.eval: this.eval;
      } else {
        var _eval = currentProcess ? currentProcess.eval(): this.eval();
      }
   //console.log(params);
      e.process.__proto__ = {
        name: params[0],
        params: params,
        remove: e.remove,
        isterminated: void 0,
        // getNode: function () {
        //  return e;
        // },
        isDeadProcess: currentProcess ? currentProcess.isDeadProcess: false,
        _isDeadProcess: currentProcess ? currentProcess.isDeadProcess: false,
        parentProcess: !isNewProcess ? currentProcess: void 0,
        parentParams: isNewProcess ? params: currentProcess.parentParams,
        global: isNewProcess ? {}: currentProcess.global,

        eval: _eval,
        module: module,
        type: module.operations[0].type,
        callback:
        module.operations[module.keywords[params[0]]] || module.operations[0],
      };

      if (shouldProcess) {
        this.execCallback(e.process, "onload");
      }

      this.onboardProcesses.push(e.process);
    },
    XJSXCompiler: function (element, _eval) {
      var core = {
        __proto__: __core__,
        document: element,
        onboardProcesses: []
      };

      if ("function" === typeof _eval) {
        core.eval = _eval;
      } else {
        core.eval = __core__._eval(exec);
      }
      var node,
      last;
      if (element.childElementCount > 6) {
        node = document.createTreeWalker(element, NodeFilter.SHOW_COMMENT, function(n) {
          return __core__.XJSXSyntax(n) && true;
        }).firstChild()

        last = document.createTreeWalker(element, NodeFilter.SHOW_COMMENT, function(n) {
          return __core__.XJSXSyntax(n) && true;
        }).lastChild();
      } else {
        node = element.firstChild
      }

      //console.log(wk);
      //console.log(wk.firstChild(),
      //  wk.lastChild());
      //   var node = element.firstChild;
      // var lastNode=wk.lastChild();
      //  console.log(node,last);

      var _n = core.getNextNode(node);
      while (node) {
        core.stage(node);
        if (node === last) {
          break;
        }//else{
        //node = core.getNextNode(node);
        //  }
        node = _n;
        _n = core.getNextNode(node);
      }
      core.document = document;
      core.XJSXLastProcessCallback();
    },
    error_meassages: {
      IMC: "invalid module case",
    },
  };



  /** end **/
  __core__.createModule([{
    keyword: "end",
    callback: function (e, currentProcess, core) {
      if (currentProcess) {
        core.execCallback(currentProcess);
        if (!currentProcess.isterminated) {
          core.terminateCurrentProcess();
        }
      } else {
        console.error("Unexpected token 'end'");
      }
    },
    type: MKEYWORD,
  },
  ]);

 

  ({
    __proto__: __core__,
    id: 1,
 //   timeStamp: performance.now(),
    eval: __core__._eval(exec),
    onboardProcesses: [],
    document: document,
  }._observer(document));

  window.XJSX = {
    FUNCTION: 3,
    METHOD: 2,
    KEYWORD: 0,
  //  MKEYWORD: 1,
    parseXJSXParameter: __core__.parseParameter,
    event: {
      emit: __core__.dispatchEvent,
      on: __core__.addEventListener
    },
    parseElement: function (node,
      eval) {
      if (node instanceof Node) {
        if (window.eval === eval) {
          eval = void 0;
          console.warn("window.eval is not a valid instance");
        }
        __core__.XJSXCompiler(node, eval);
        return true;
      } else {
        console.error("XJSX/parse", "invalid argument", node);
      }
    },
    createModule: function (name, type, obj) {
      if (!__core__.moduleType[type]) {
        return console.error("invalid value...");
      }
      var module = [{
        keyword: name,
        type: __core__.moduleType[type],
        onload: obj.onload,
        onprogress: obj.onprogress,
        callback: obj.callback,
      },
      ];
      if (type === 1 || type === 2) {
        __core__.createModule(module);
        module = void 0;
      }
      return {
        append: function (name, obj) {
          if (!module) {
            return console.warn(
              "no need to panic...this is not an error",
              "module initialize already."
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
          if (!module) {
            return console.warn(
              "no need to panic...this is not an error",
              "module initialize already."
            );
          }
          __core__.createModule(module);
        },
      };
    },
  };
})(function () {
  if (!arguments[1] && "string" === typeof arguments[0]) {
    return [
      eval(arguments[0], (arguments[0] = arguments[1] = void 0)),
      eval("(" + arguments.callee + ")"),
    ];
  } else if ("string" === typeof arguments[1]) {
    return [
      eval(`var ${arguments[1]}=arguments[0]`),
      eval("(" + arguments.callee + ")"),
      (arguments[0] = arguments[1] = void 0),
    ];
  } else {
    return [
      eval(arguments[0], (arguments[0] = arguments[1] = void 0)),
      eval("(" + arguments.callee + ")"),
    ];
  }
});