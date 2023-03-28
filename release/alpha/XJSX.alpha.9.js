/***
 * @onprogress
 * @parentProcess
 * @core.execCallback
 */
//console.log("xjsx");

(function (eval) {
  var time=performance.now()
  var core = {
      _observer: window.MutationObserver
        ? function (foo, elm) {
            var obs = new window.MutationObserver(function (e) {
              var n;
              for (var i = 0; i < e.length; i++) {
                if (XJSXHandlers.resolved) {
                  return;
                }
                if (e[i].type === "childList") {
                  for (var _i = 0; _i < e[i].addedNodes.length; _i++) {
                    if (XJSXHandlers.resolved) {
                      return;
                    }
                    n = e[i].addedNodes[_i];
                    if (n.lastProcess) {
                      n.remove();
                      XJSXHandlers.lastProcess();
                    } else {
                      void (n.fromXJSXCore ? 0 : foo(n));
                    }
                  }
                } else {
                  n = e[i].target;
                  if (n.lastProcess) {
                    n.remove();
                    XJSXHandlers.lastProcess();
                  } else {
                    void (n.fromXJSXCore ? 0 : foo(n));
                  }
                }
              }
              //      n=void 0;
              return (n = e = i = void 0);
            });
            obs.observe(elm || document, {
              childList: true,
              subtree: true,
            });
            addEventListener("load", function () {
              obs.disconnect();
            });
            return (elm = void 0), obs;
          }
        : function (foo, elm) {
            elm.addEventListener("DOMNodeInserted", function (e) {
              void (e.target.fromXJSXCore ? 0 : foo(e.target));
              e = void 0;
            });
            return (elm = void 0);
          },

      stage: function (e) {
        if (!core.lastNodeInit && e instanceof HTMLBodyElement) {
          var t = document.createComment("");
          t.lastProcess = true;
          e.appendChild(t, e);
          t = void 0;
          core.lastNodeInit = true;
        }

        var currentProcess = core.getOnboardProcess();

        var mode = core.isOurs(e);

        if (mode === core.mode[0]) {
          XJSXHandlers.processKeyword(e, currentProcess);
        } else {
          if (currentProcess) {
            currentProcess = currentProcess.process;

            currentProcess.nodes.append(e, false);
            /***
             * if (currentProcess.module.operations[0].type === "keyword") {
              
            } else {
              currentProcess.documentFragment.appendChild(e);
            }
            ***/
          }
        }
        /*
        else if (mode === core.mode[1]) {
        } else if (mode === "null") {
           console.error("mode");
        }
        */
      },
      isOurs: function (e) {
        return e instanceof Comment
          ? e.data.match(/^\?\?[^]+\?\?$/)
            ? core.mode[0]
            : null
          : false;

        /*
          ? e.data.match(/\?\?/gim)
            ? core.mode[0]
            : e.data.match(/\?\?/gim)
            ? core.mode[1]
            : "null"
          : false;
          */
      },
      isKeyWord: function (e) {
        return "string" === typeof e && e.length > 1 && !e.match(/[\W\d]/);
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
        return [keyword.trim().toLowerCase(), e];
      },
      mode: ["embedded", "defined"],
      createModule: function (module) {
        if (module instanceof Array && 1 > module.length) {
          return console.error(this.error_meassages.IMC);
        }

        if (!core.isKeyWord(module[0].keyword)) {
          return console.error(core.error_meassages.IMC);
        }
        module[0].keyword = module[0].keyword.toLowerCase();

        if (
          core.modules.hasOwnProperty(module[0].keyword) ||
          core.signedKeywords.hasOwnProperty(module[0].keyword)
        ) {
          return console.error(core.error_meassages.IMC);
        }

        core.modules[module[0].keyword] = {
          operations: module,
          keywords: {},
          name: module[0].keyword,
        };
        for (var i = 1; i < module.length; i++) {
          core.modules[module[0].keyword].keywords[module[i].keyword] = i;
          core.signedKeywords[module[i].keyword] = module[0].keyword;
        }
      },
      getModule: function (key) {
        return core.modules[key];
      },
      //  processTypes:{},
      modules: {},
      signedKeywords: {},
      moduleLength: 0,
      currentonboardProcess: {},
      hasOnboardProcess: function () {
        return core.onboardProcesses.length > 0;
      },
      getOnboardProcess: function () {
        return core.onboardProcesses[core.onboardProcesses.length - 1] || null;
      },
      terminateCurrentProcess: function () {
        var cP = core.onboardProcesses[core.onboardProcesses.length - 1];
        if (cP) {
          cP = cP.process;
          cP.isterminated = true;
          core.onboardProcesses.pop();
        }
      },
      onboardProcesses: [],
      createElement: function (name, trusted) {
        if ("string" === typeof name) {
          name = document.createElement(name);
        } else if (name === null) {
          name = document.createTextNode("");
          name.process = {};
          name.process.nodes = new core.XJSXNodeList(name);
          name._remove = name.remove;
          name.remove = function () {
            if (this.process) {
              this.process.nodes.remove();
            }
            this._remove();
          };
        } else {
        }
        if (trusted) {
          name.fromXJSXCore = true;
        }
        return name;
      },
      execCallback: function (crt, opt, node) {
        if (crt instanceof Text) {
          crt = crt.process;
        }

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
        foo.prototype = new core.CALLBACK_PROTOTYPE(crt, opt, node);
        new foo(crt.params[1], crt.eval, node);
        foo.prototype = new Object();
        crt.closed = true;
      },
      CALLBACK_PROTOTYPE: function (process, opt, node) {
        /*****
         * use process.__proto__ to set process
         * note: this process is an instance, use .__proto__
         *****/
        if (opt === "onprogress") {
          this.element = node;
        }
        var type = process.module.operations[0].type;

        /****check**/
        // if (type === "keyword") {
        this.parentParams = process.parentParams;
        // }

        this.eval = function () {
          if (process.closed) {
            return console.error("process has ended ");
          }
          var e = process.eval;

          e(arguments[0]);
          e = void 0;
        };

        if (opt === "onload") {
          this.killProcess = function () {
            process.__proto__.isDeadProcess = true;
          };
        }
        if (opt.match(/^callback$/)) {
          this.terminate = function () {
            if (process.closed) {
              return console.error("process has ended ");
            }
            if (!process.isterminated) {
              process.__proto__.isterminated = true;
              core.onboardProcesses.pop();
            }
          };
        }

        this.forEach = function (foo) {
          if (process.closed) {
            return console.error("process has ended ");
          }
          if ("function" !== typeof foo) {
            return console.error("parameter should be a function ");
          }
          if (opt === "callback") {
            process.nodes.forEach(function (a, b) {
              foo(a, b, null);
            });
          } else if (opt === "onload") {
            /* code */
          }
        };
        this.global = process.global;
      },
      toXJSXElement: function (node, process) {
      
        this.remove = function () {
          if (process.closed) {
            return console.error("process has ended ");
          }
          node.remove();
          node.removed = true;
        };
        this.getAllTextContent = function () {
          var txt = node.textContent;
          if (node.process) {
            node.process.nodes.forEach(function (e) {
              console.log(e);
              txt += e.getAllTextContent();
            });
          } else {
          }
          return txt;
        };
        Object.defineProperty(this, "textContent", {
          get() {
            return node.textContent;
          },
        });
      },
      XJSXNodeList: function (process) {
        if (process instanceof Text) {
          process = process.process;
        }
        var nodes = [],
          currentNodeParant,
          self = this;

        Object.defineProperty(self, "length", {
          get() {
            return nodes.length;
          },
        });
        Object.defineProperty(self, "lastChild", {
          get() {
            return nodes[nodes.length - 1];
          },
        });

        self.push = self.append = function (e, shouldProcess) {
          /*** this will prevent dublicate*/

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
        };
        self.pop = function () {
          nodes.pop();
        };
        self.remove = function () {
          process.removed = self.removed = true;
          nodes.forEach(function (a, b) {
            a.remove();
          });
          nodes = [];
        };
        self.forEach = function (foo) {
          if (process.closed) {
            return console.error("process has ended ");
          }
          if ("function" !== typeof foo) {
            return console.error("parameter should be a function ");
          }
          nodes.forEach(function (a, b) {
            var _foo = arguments.callee;

            if (a.process) {
              foo(new core.toXJSXElement(a, process), b, null);
              a.process.nodes.forEach(function (a) {
                _foo(a);
              });
            } else {
              foo(new core.toXJSXElement(a, process), b, null);
            }
          });
        };
      },
      error_meassages: {
        IMC: "invalid module case",
      },
    },
    XJSXHandlers = {
      lastProcess: function () {
        XJSXHandlers.resolved = true;
        console.log("process ended");

        if (core.hasOnboardProcess()) {
          /***check end**/
          core.modules.end.operations[0].callback(["end", ""]);
        }
        obs.disconnect();
        console.log("took "+(performance.now()-time)+"ms");
        //core.terminateCurrentProcess();
      },
      processKeyword: function (e, currentProcess) {
        var params = core.parseKeyWord(e.data);
        if ("object" !== typeof currentProcess) {
          currentProcess = core.getOnboardProcess();
        }

        var isNewProcess;
        var module =
          currentProcess &&
          currentProcess.process.module.keywords.hasOwnProperty(params[0])
            ? void 0
            : core.getModule(params[0]);

        if (module) {
          isNewProcess = module.operations[0].type === null ? false : true;
        }

        if (!isNewProcess && currentProcess) {
          currentProcess.process.isDeadProcess =
            currentProcess.process._isDeadProcess;
        }

        var shouldProcess =
          currentProcess && currentProcess.process.isDeadProcess ? false : true;

        /***
         * comment code
         * **/

        /****
        if (
          !isNewProcess&&
        currentProcess.process.isDeadProcess&&
        !currentProcess.process._isDeadProcess
       
        ) {
          shouldProcess=true
          console.log(params[1]);
 
}
***/

        if (currentProcess) {
          if (
            currentProcess.process.module.keywords.hasOwnProperty(params[0])
          ) {
            /** is next in line?**/
            var nextInLineProcess;
            var currentInLineProcess;

            var previousKeyword = currentProcess.process.name;
            previousKeyword =
              previousKeyword ===
              currentProcess.process.module.operations[0].keyword
                ? 0
                : currentProcess.process.module.keywords[previousKeyword];

            nextInLineProcess = previousKeyword;
            currentInLineProcess =
              currentProcess.process.module.keywords[params[0]];

            var err_msg =
              "Unexpected token '" +
              params[0] +
              "'.\n" +
              (nextInLineProcess === 1
                ? ""
                : "( " +
                  currentProcess.process.parentParams.join(":") +
                  " )...") +
              "( " +
              currentProcess.process.params.join(":") +
              " )..." +
              "( " +
              params.join(":") +
              " ) " +
              "... ";

            if (nextInLineProcess > currentInLineProcess) {
              return console.error(err_msg);
            }

            module = currentProcess.process.module;

            core.execCallback(currentProcess);
            if (currentProcess.process.isterminated) {
              /*** check **/
              core.terminateCurrentProcess();
              return console.error(err_msg);
            } else {
              core.terminateCurrentProcess();
            }
            err_msg = void 0;
          }
        }

        var newNode = core.createElement(null, true);

        if (e.parentNode) {
          e.parentNode.insertBefore(newNode, e);
          e.remove();
          e.process = newNode.process;
          if (shouldProcess) {
            e = newNode;
          }
        } else {
          /**
          this is weird...nodes should have parents 
          ***/
        }

        if (currentProcess) {
          currentProcess.process.nodes.append(e, shouldProcess);
        }

        if (e instanceof Comment) {
          e = newNode;
        }

        if (!module) {
          console.error(
            "Unexpected token '%s' (%s:%s)",
            params[0],
            params[0],
            params[1]
          );
          return;
        }

        if (module.operations[0].type === null) {
          if (shouldProcess) {
            module = module.operations;
            module = module[0].callback;
            module(params[1]);
          } else {
            core.terminateCurrentProcess();
          }
          return;
        }

        if (module.operations[0].type === "keyword") {
          var _eval = currentProcess ? currentProcess.process.eval : eval;
        } else {
          var _eval = currentProcess
            ? currentProcess.process.eval(null, true)
            : eval();
        }

        e.process.__proto__ = {
          name: params[0],
          params: params,
          isDeadProcess: currentProcess
            ? currentProcess.process.isDeadProcess
            : false,
          _isDeadProcess: currentProcess
            ? currentProcess.process.isDeadProcess
            : false,
          parentProcess: currentProcess,
          parentParams: isNewProcess
            ? params
            : currentProcess.process.parentParams,
          global: isNewProcess ? {} : currentProcess.process.global,

          documentFragment: document.createDocumentFragment(),

          eval: _eval,
          module: module,
          type: module.operations[0].type,
          callback:
            module.operations[module.keywords[params[0]]] ||
            module.operations[0],
        };
        if (shouldProcess) {
          core.execCallback(e, "onload");
        }

        core.onboardProcesses.push(e);
      },
    };

  core.createModule([
    {
      keyword: "if",
      onprogress: function (q) {
        q = this.global.q;
        var node = this.element;
        if (!q) {
          return;
        }
        if (node instanceof HTMLScriptElement) {
          node._type = node.type;
          node.type = "noscript";
        }
      },
      onload: function (q) {
        try {
          q = this.global.q = !eval(q);
        } catch (e) {
          return console.error(e);
        }
        if (q) {
          this.killProcess();
        }
      },
      callback: function (q) {
        q = this.global.q;
        if (q) {
          this.forEach(function (e) {
            e.remove();
          });
        }
        if (q) {
          this.global.q = false;
        } else {
          this.global.q = true;
        }
      },
      type: "keyword",
    },
    {
      keyword: "else if",
      onprogress: function (q) {
        q = this.global.q;
        var node = this.element;
        if (!q) {
          return;
        }
        if (node instanceof HTMLScriptElement) {
          node._type = node.type;
          node.type = "noscript";
        }
      },
      onload: function (_q) {
        q = this.global.q;
        if (q) {
          this.killProcess();
          return;
        }
        try {
          q = this.global.q = !eval(_q);
        } catch (e) {
          return console.error(e);
        }
        if (q) {
          this.killProcess();
        }
      },
      callback: function (q) {
        q = this.global.q;
        if (q) {
          this.forEach(function (e) {
            e.remove();
          });
          this.global.q = false;
        } else {
          this.global.q = this.global.resolved = true;
        }
      },
    },
    {
      keyword: "else",
      onprogress: function (q) {
        q = this.global.q;
        var node = this.element;
        if (!q) {
          return;
        }
        if (node instanceof HTMLScriptElement) {
          node._type = node.type;
          node.type = "noscript";
        }
      },
      onload: function (q) {
        if (this.global.resolved) {
          this.global.q = true;
        }
        q = this.global.q;
        if (q) {
          this.killProcess();
        }
      },
      callback: function (q) {
        this.terminate();
        q = this.global.q;
        if (q) {
          this.forEach(function (e) {
            e.remove();
          });
        }
      },
    },
  ]);

  core.createModule([
    {
      keyword: "end",
      callback: function (e) {
        console.log(e);
        var f = document.createDocumentFragment();
        var el = document.createElement("b");
        el.innerHTML = `
       documentFragment
       `;
        f.appendChild(el);
        //  console.log(f.firstElementChild);
        document.body.appendChild(f);

        var currentProcess = core.getOnboardProcess();
        if (currentProcess) {
          core.execCallback(currentProcess);
          if (!currentProcess.process.isterminated) {
            core.terminateCurrentProcess();
          }
        } else {
          console.error("Unexpected token 'end'");
        }
      },
      type: null,
    },
  ]);

  var obs = core._observer(core.stage, document);
})(function () {
  /***
   * use strict inside eval to avoid "arguments"
   */

  if ("string" === typeof arguments[0]) {
    if (!arguments[1]) {
      return eval(arguments[0]);
    }
  }

  void eval(arguments[0]);
  return eval("(" + arguments.callee.toString() + ")");
});
