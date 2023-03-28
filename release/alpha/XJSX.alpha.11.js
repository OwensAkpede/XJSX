/***
 * @onprogress
 * @parentProcess
 * @core.execCallback
 */
//console.log("xjsx");

(function (eval) {
  var time = 0;
  var core = {
      _observer: window.MutationObserver
        ? function (foo, elm) {
            var obs = new window.MutationObserver(function (e) {
              var n;
              var tm = performance.now();
              for (var i = 0; i < e.length; i++) {
                var record = e[i];
                // console.log(record);
                if (XJSXHandlers.resolved) {
                  return;
                }
                if (record.type === "childList") {
                  for (var _i = 0; _i < record.addedNodes.length; _i++) {
                    if (XJSXHandlers.resolved) {
                      return;
                    }
                    n = record.addedNodes[_i];
                    if (n.lastProcess) {
                      n.remove();
                      XJSXHandlers.lastProcess();
                    } else if (!n.fromXJSXCore) {
                      foo(n);
                    }
                  }
                } else {
                  n = record.target;
                  if (n.lastProcess) {
                    n.remove();
                    XJSXHandlers.lastProcess();
                  } else if (!n.fromXJSXCore) {
                    foo(n);
                  }
                }
              }

              //      n=void 0;
              return (
                (n = e = i = void 0), (time += performance.now() - tm), void 0
              );
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
        /*** console.time('p') **/
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
          XJSXHandlers.process(e, currentProcess);
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
        /***  console.timeEnd('p') **/
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
        return (
          "string" === typeof e &&
          e.trim() &&
          e.length > 1 &&
          e.match(/^[a-z0-9]+([^]+[a-z0-9])?$/)
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
          if (!core.isKeyWord(module[i].keyword)) {
            delete core.modules[module[0].keyword];
            return console.error(core.error_meassages.IMC, module[i].keyword);
          }
          module[i].keyword = module[i].keyword.toLowerCase();
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
      //  currentonboardProcess: {},

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
        } else {
          trusted = name;
          name = document.createTextNode("");
          name.process = {};
          name.process.nodes = core.XJSXNodeList(name);
          name._remove = name.remove;
          name.remove = function () {
            if (this.process) {
              this.process.nodes.remove();
            }
            this._remove();
          };
        }
        name.fromXJSXCore = trusted;
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

        foo.prototype = core.CALLBACK_PROTOTYPE(crt, opt, node);
        new foo(crt.params[1], crt.eval, node);
        foo.prototype = {};
        crt.closed = true;
      },
      CALLBACK_PROTOTYPE: function (process, opt, node) {
        /*****
         * use process.__proto__ to set process
         * note: this process is an instance, use .__proto__
         *****/
        var type = process.module.operations[0].type;

        var _this = {
          parentParams: process.parentParams,
          eval: function () {
            if (process.closed) {
              return console.error("process has ended ");
            }
            var e = process.eval;

            e(arguments[0]);
            e = void 0;
          },
          forEach: function (foo) {
            if (process.closed) {
              return console.error("process has ended ");
            }
            if ("function" !== typeof foo) {
              return console.error("parameter should be a function ");
            }
            if (opt === "callback") {
              process.nodes.forEach(foo);
            } else if (opt === "onload") {
              /* code */
            }
          },
          global: process.global,
        };

        if (opt === "onprogress") {
          _this.element = node;
        }

        /****check**/
        // if (type === "keyword") {
        // }

        if (opt === "onload") {
          _this.killProcess = function () {
            process.__proto__.isDeadProcess = true;
          };
        }
        if (opt === "callback") {
          _this.terminate = function () {
            if (process.closed) {
              return console.error("process has ended ");
            }
            if (!process.isterminated) {
              process.__proto__.isterminated = true;
              core.onboardProcesses.pop();
            }
          };
        }

        return _this;
      },
      toXJSXElement: function (node, process) {
        return {
          remove: function () {
            if (process.closed) {
              return console.error("process has ended ");
            }
            node.remove();
            node.removed = true;
          },
          getAllTextContent: function () {
            var txt = node.textContent;
            if (node.process) {
              node.process.nodes.forEach(function (e) {
                txt += e.getAllTextContent();
              });
            } else {
            }
            return txt;
          },

          /*,
        get textContent() {
            return node.textContent;
        }
        */
        };
      },
      XJSXNodeList: function (process) {
        if (process instanceof Text) {
          process = process.process;
        }
        var nodes = [],
          currentNodeParant,
          foo,
          forEach = function (a) {
            if (a.process) {
              foo(a);
              /** commented for performance pp**/
              /***foo(core.toXJSXElement(a, process))***/
              a.process.nodes.forEach(forEach);
            } else {
              foo(a);
              /** commented for performance pp**/
              /***  foo(core.toXJSXElement(a, process)); **/
            }
          },
          self = {
            append: function (e, shouldProcess) {
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
            },
            forEach: function (f) {
              foo = f;
              if (process.closed) {
                return console.error("process has ended ");
              }
              if ("function" !== typeof foo) {
                return console.error("parameter should be a function ");
              }
              nodes.forEach(forEach);
              //  foo=void 0;
            },
            remove: function () {
              process.removed = self.removed = true;
              nodes.forEach(function (a) {
                a.remove();
              });
              nodes = [];
            },
            pop: function () {
              nodes.pop();
            },
            push: function (e) {
              self.append(e);
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
        console.log("done in " + time + "ms");
        //core.terminateCurrentProcess();
      },
      process: function (e, currentProcess) {
        var params = core.parseKeyWord(e.data);
        // if ("object" !== typeof currentProcess) {
        //  currentProcess = core.getOnboardProcess();
        //}
        if (currentProcess) {
          currentProcess = currentProcess.process;
        }

        var isNewProcess;
        var module =
          currentProcess &&
          currentProcess.module.keywords.hasOwnProperty(params[0])
            ? void 0
            : core.getModule(params[0]);

        if (module) {
          isNewProcess =
            module.operations[0].type === "x-keyword" ? false : true;
        }

        if (!isNewProcess && currentProcess) {
          currentProcess.isDeadProcess = currentProcess._isDeadProcess;
        }

        var shouldProcess =
          currentProcess && currentProcess.isDeadProcess ? false : true;

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

        //if (currentProcess) {
        if (
          currentProcess &&
          currentProcess.module.keywords.hasOwnProperty(params[0])
        ) {
          /** is next in line?**/
          var nextInLineProcess;
          var currentInLineProcess;
          module = currentProcess.module;

          var previousKeyword = currentProcess.name;
          previousKeyword =
            previousKeyword === module.operations[0].keyword
              ? 0
              : module.keywords[previousKeyword];

          nextInLineProcess = previousKeyword;
          currentInLineProcess = module.keywords[params[0]];

          var err_msg =
            "Unexpected token '" +
            params[0] +
            "'.\n" +
            (nextInLineProcess === 1
              ? ""
              : "( " + currentProcess.parentParams.join(":") + " )...") +
            "( " +
            currentProcess.params.join(":") +
            " )..." +
            "( " +
            params.join(":") +
            " ) " +
            "... ";

          if (nextInLineProcess > currentInLineProcess) {
            return console.error(err_msg);
          }

          // module = currentProcess.module;

          core.execCallback(currentProcess);
          if (currentProcess.isterminated) {
            /*** check **/
            core.terminateCurrentProcess();
            return console.error(err_msg);
          } else {
            core.terminateCurrentProcess();
          }
          err_msg = void 0;
        }
        //  }

        var newNode = core.createElement(true);

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
          currentProcess.nodes.append(e, shouldProcess);
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

        if (module.operations[0].type === "x-keyword") {
          if (shouldProcess) {
            module = module.operations;
            module = module[0].callback;
            if (module) {
              module(params[1], currentProcess);
            }
          } else {
            core.terminateCurrentProcess();
          }
          return;
        } else if (module.operations[0].type === "method" && shouldProcess) {
          module = module.operations;
          module = module[0].callback;
          if (module) {
            module(params[1], e);
          }
          return;
        }

        if (module.operations[0].type === "keyword") {
          var _eval = currentProcess ? currentProcess.eval : eval;
        } else {
          var _eval = currentProcess ? currentProcess.eval() : eval();
        }

        e.process.__proto__ = {
          name: params[0],
          params: params,
          isDeadProcess: currentProcess ? currentProcess.isDeadProcess : false,
          _isDeadProcess: currentProcess ? currentProcess.isDeadProcess : false,
          //   parentProcess: currentProcess,
          parentParams: isNewProcess ? params : currentProcess.parentParams,
          global: isNewProcess ? {} : currentProcess.global,

          //   documentFragment: document.createDocumentFragment(),

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
      onload: function (q) {
        try {
          q = this.global.q = eval(q) ? true : false;
        } catch (e) {
          return console.error(e);
        }
        if (!q) {
          this.killProcess();
        }
      },
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
      callback: function (q) {
        q = this.global.q;
        if (!q) {
          this.forEach(function (e) {
            e.remove();
          });
        } else {
          this.global.done = true;
        }
      },
      type: "keyword",
    },
    {
      keyword: "else-if",
      onload: function (_q) {
        var q = this.global.q;
        if (q || this.global.done) {
          this.global.q = false;
          this.killProcess();
          return;
        }
        if (this.global.done) {
          console.log(_q);
        }
        try {
          q = this.global.q = eval(_q) ? true : false;
        } catch (e) {
          return console.error(e);
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
        var node = this.element;
        if (node instanceof HTMLScriptElement) {
          node._type = node.type;
          node.type = "noscript";
        }
      },
      callback: function (q) {
        q = this.global.q;
        if (!q) {
          this.forEach(function (e) {
            e.remove();
          });
        } else {
          this.global.done = true;
        }
      },
    },
    {
      keyword: "else",
      onload: function (q) {
        q = this.global.q = this.global.done;
        if (q) {
          this.killProcess();
        }
      },
      onprogress: function (q) {
        q = this.global.q;
        if (q) {
          return;
        }
        var node = this.element;
        if (node instanceof HTMLScriptElement) {
          node._type = node.type;
          node.type = "noscript";
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
      callback: function (e, currentProcess) {
           if (currentProcess) {
          core.execCallback(currentProcess);
          if (!currentProcess.isterminated) {
            core.terminateCurrentProcess();
          }
        } else {
          console.error("Unexpected token 'end'");
        }
      },
      type: "x-keyword",
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
