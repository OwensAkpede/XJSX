/***
 * @use-template fragment tmp.performance
 */

(function (exec) {
  var KEYWORD = "keyword";
   var MICRO = "micro";
    var MKEYWORD = "micro-keyword";
   var FUNCTION = "function";
   var FKEYWORD = "function-keyword";
   var METHOD = "method";
   var time = 0;
   var __core__ = {
      _observer:
       (window.MutationObserver &&
          function () {
            var lastChild;
             var lastDoc;
             var cn;
             var core = this;
              var n;
              var lc;
             var obs = new window.MutationObserver(function (e) {
                 document.readyState==="complete"&&
                 (obs.disconnect(),core.XJSXLastProcessCallback());
               
                lastDoc&&
                (lc = lastDoc)||
                  (lc = document.body)&&
                    (lastDoc = lc)||
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
                      n.parentNode._removed||
                      n.parentNode.fromXJSXCore&&
                      (n.fromXJSXCore = true)
                      ||core.stage(n);
                  }
                }

               // return (n = e = i = void 0);
              });
            obs.observe( document, {
              childList: true,
              subtree: true,
            });
            addEventListener("load", function () {
              !core.resolved&&
               (obs.disconnect(),core.XJSXLastProcessCallback());
            });
          //  return (elm = void 0), obs;
          }) ||
        function () {
          console.warn("MutationObserver unavailable in this browser...");
          console.warn(
            'now manually parse this document with the "onload" event.'
          );
          addEventListener("load", function () {
            __core__.XJSXCompiler(document);
          });
        },
        animation:{},
        createAnimation:function(n,f) {
         "function"===typeof f &&(
           __core__.animation[n]=f
         );
        },
      events: {},
      addEventListener: function (name, foo) {
        __core__.events[name]&&
          foo(__core__.events[name]);
        window.addEventListener(name, foo);
      },
      dispatchEvent: function (name, data) {
        var evt = __core__.events[name];
        !evt&&(
          __core__.events[name] = evt = document.createEvent("CustomEvent")
        );
        evt.initCustomEvent(name, false, false, data);
        window.dispatchEvent(evt);
      },
      stage: function (e) {
        var currentProcess = this.getOnboardProcess();
        // var mode = this.XJSXSyntax(e);

        e instanceof Comment &&
          e.data.search(/^\?[^\?][^]+[^\?]\?$/) === 0 &&
          !this.XJSXProcessor(e, currentProcess) ||
          currentProcess && currentProcess.nodes.append(e /*, false*/);
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
        // if (e instanceof Comment) {
        /*  if (e.search(/^\?\?[^\?][^]+[^\?]\?\?$/) === 0) {
          return this.mode[0];
        } else*/
       return e.search(/^\?[^\?][^]+[^\?]\?$/) === 0&&
           this.mode[1];
        
 
        //  }
      },
      XJSXSyntax: function (e) {
          /*  if (e.data.search(/^\?\?[^\?][^]+[^\?]\?\?$/) === 0) {
            return this.mode[0];
          } else */
        return e instanceof Comment
          &&e.data.search(/^\?[^\?][^]+[^\?]\?$/) === 0&&
           this.mode[1];
          

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
        return "string" === typeof e &&
          e.trim() &&
          e.length > 1 &&
          e.match(/^[a-z0-9]+([^]+[a-z0-9])?$/)
        ;
      },
      isVariable: function (e) {
        return "string" === typeof e &&
          e.trim() &&
          e.length > 0 &&
          e.match(/^[a-z_$]*([a-z_$])?$/i)
        ;
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
       e[0] === ":"&& (e = e.substring(1));
        
        return [keyword.trim().toLowerCase(), e];
      },
      parseParameter: function (_e, eval) {
        _e = _e.split(";");
        2 > _e.length&&
          _e.push([])
        ||
         ( _e[_e.length - 1] = _e[_e.length - 1].split(","));
        
        return {
          arguments: _e.pop(),
          parameter: eval && eval("[" + _e + "]") || _e,
        };
      },
      mode: ["embedded", "defined"],
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
          this.modules[module[0].keyword] ||
          this.signedKeywords[module[0].keyword]
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

         // this.signedKeywords[module[0].keyword] = module[0].keyword;
      
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
          return arguments.length === 0&&__core__._eval(__eval__)||
          arguments.length === 1 && "string" === typeof arguments[0]&&r[0];
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
        cP&&(
          cP.isterminated = true,
          this.onboardProcesses.pop());
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
        return node&&(
        node.firstChild||
        node.nextSibling||
        node.parentNode&&node.parentNode.nextSibling);
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
        "string" === typeof name &&
         (name = document.createElement(name))
          ||
        (
          trusted = name,
          name = document.createTextNode(""),
          name.process = {},
          name.process.nodes = this.XJSXNodeList(name),
          name._remove = name.remove,
          name.remove = function () {
            name.process.nodes.remove();
            name._remove();
          });
        
        name.fromXJSXCore = trusted;
        return name;
      },
      execCallback: function (crt, opt, node) {
        /*** check ***/
        if (crt.isDeadProcess && opt !== "onprogress") {
          return;
        }
     //   var foo = crt.callback;
//console.log(crt);
       !opt&&(opt = "callback")
        
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

        var o = this.CALLBACK_PROTOTYPE(crt, opt, node);
        o.f = foo;
        o.f(
          crt.params[1],
          (o.f = void 0),
          opt === "callback" && crt.micro_callback && crt.micro_callback(crt.micro_parameter,o)
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
              return arguments.length===0&&process.eval()||
              arguments[1]&&!process.eval(arguments[0], arguments[1])||
              process.eval(arguments[0]);
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
              
              opt === "callback"&&
                process.nodes.forEach(function (a) {
                  foo(core.toXJSXElement(a, process));
                });
              
              console.warn("this .forEach() method is deprecated");
            },
            global: process.global,
          };

        opt === "onprogress" && 
        (
          _this.appendTo = function (doc) {
            doc.appendChild(node.cloneNode(true));
          },
          _this.disable = function () {
          !process.closed&&
            (node.remove(),node._removed = true)||
          console.error("process has ended ");
          },
          _this.delete = function () {
           !process.closed&&
            (node.remove(),node.removed = true)||
           console.error("process has ended ");
          }
        )||

        /****check**/

        opt === "onload"&&
        (
          _this.killProcess = function () {
            process.__proto__.isDeadProcess = true;
          }
        )||
        
        opt === "callback"&&
        (
          _this.appendAllTo = function (doc, clone) {
            clone&&
              !process.nodes.forEach(function (node) {
                doc.appendChild(node.cloneNode(true));
              })||
              process.nodes.forEach(function (node) {
                doc.appendChild(node);
              })||
              process.nodes.flush();
          },
          _this.remove = process.remove,
          _this.removeAllNode = process.nodes.remove,
          _this._removeAllNode = function (foo) {
            process.nodes.forEach(function (node) {
              node.remove();
             "function" === typeof foo&&
               ( 
                 foo(node),
                console.log("deprecated argument in removeAllNode() method")
              );
            });
            process.nodes.flush();
          },
          _this.flush = function () {
            process.nodes.flush();
          },
          _this.addChild = function (child, sub) {
            var pp = process;

            if (!sub) {
              while (pp.parentProcess) {
                pp = pp.parentProcess;
              }
            }

            pp = pp.nodes;

            if (child instanceof Array) {
              pp.push(child);
              pp = pp.me();

              for (var i = 0; i < child.length; i++) {
                child[i].fromXJSXCore = true;
                pp.parentNode.insertBefore(child[i], pp);
              }

              return;
            } else if (child instanceof DocumentFragment) {
              for (var i = 0; i < child.childNodes.length; i++) {
                child.childNodes[i].fromXJSXCore = true;
                pp.push(child.childNodes[i]);
              }
            } else {
              pp.push(child);
            }
            pp = pp.me();
            child.fromXJSXCore = true;
            pp.parentNode.insertBefore(child, pp);
          },
          _this.putChild = function (child, sub) {
            var pp = process;
            if (!sub) {
              while (pp.parentProcess) {
                pp = pp.parentProcess;
              }
            }
            pp = pp.nodes;
            pp.remove();
            // console.log(child);
            if (child instanceof Array) {
              pp.flush();
              pp.push(child);
              pp = pp.me();

              for (var i = 0; i < child.length; i++) {
                child[i].fromXJSXCore = true;
                pp.parentNode.insertBefore(child[i], pp);
              }
            } else {
              if (child instanceof DocumentFragment) {
                pp.flush();
                for (var i = 0; i < child.childNodes.length; i++) {
                  child.childNodes[i].fromXJSXCore = true;
                  pp.push(child.childNodes[i]);
                }
              } else {
                pp.flush();
                pp.push(child);
              }
              pp = pp.me();
              child.fromXJSXCore = true;
              pp.parentNode.insertBefore(child, pp);
            }
          },
          _this.terminate = function () {
            !process.closed&&
            process.isterminated|| (
              core.onboardProcesses.pop(),
              process.__proto__.isterminated = true
            )||
              console.error("process has ended ");
          }
        )&&
          process.micro_callback&&
           (
            _this.x_addChild = function (child) {
              var pp = process;
              while (pp.parentProcess) {
                pp = pp.parentProcess;
              }
              pp = pp.nodes;
              var n = pp.cut();
              if (child instanceof Array) {
                pp.push(child);
                pp = pp.me();

                for (var i = 0; i < child.length; i++) {
                  child[i].fromXJSXCore = true;
                  pp.parentNode.insertBefore(child[i], pp);
                }

                return;
              } else if (child instanceof DocumentFragment) {
                for (var i = 0; i < child.childNodes.length; i++) {
                  child.childNodes[i].fromXJSXCore = true;
                  pp.push(child.childNodes[i]);
                }
              } else {
                pp.push(child);
              }
              pp = pp.me();
              child.fromXJSXCore = true;
              pp.parentNode.insertBefore(child, pp);
              return n;
            }
             );
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
      XJSXNodeList: function (node) {
        var process = node.process;

        var nodes = [];
         var currentNodeParent;
          var foo;
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
            // if (a.process&&a.process.nodes.forEach) {
            /** commented for performance pp**/
            /***foo(core.toXJSXElement(a, process))***/
            //  } //else {
            //foo(a);
            /** commented for performance pp**/
            /***  foo(core.toXJSXElement(a, process)); **/
            //  }
          };
         var self = {
            isVisible: function () {
              return core.document.contains(node);
            },
            me: function () {
              //console.trace("5")
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

              if (currentNodeParent && currentNodeParent.contains(e)) {
                return;
              }
                currentNodeParent = e;
              

              /***/

             !process._isDeadProcess&&
                core.execCallback(process, "onprogress", e);
              

             e.removed||
              self.removed&&
                !e.remove()||
                nodes.push(e);
              
            },
            forEach: function (f) {
              foo = f;
              if (process.closed) {
 console.error("process has ended ");
                return
              }
              if ("function" !== typeof foo) {
 console.error("parameter should be a function ");
                return
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
          putChild: function (node) {
            process.remove();
            if (node instanceof NodeList) {
              var len = node.length;
              for (var i = 0; i < len; i++) {
                len !== node.length && ((i = 0), (len = node.length));
                // (a[i]);
                !node[i].fromXJSXCore && (node[i].fromXJSXCore = true);
                //  node[i].fromXJSXCore = true;
                e.parentNode.insertBefore(node[i], e);
              }
              return;
            }else if (node instanceof Array) {
              for (var i = 0; i < node.length; i++) {
                !node[i].fromXJSXCore && (node[i].fromXJSXCore = true);
                process.push(node[i]);
                e.parentNode.insertBefore(node[i], e);
              }
              return;
            } else if (node instanceof DocumentFragment) {
              for (var i = 0; i < node.childNodes.length; i++) {
                node.childNodes[i].fromXJSXCore = true;
                process.push(node.childNodes[i]);
              }
            } else if (node instanceof Node) {
             node.parentNode && (node = node.cloneNode(true));
              process.push(node);
            } else {
              process.push((node = document.createTextNode(node)));
            }
            !node.fromXJSXCore && (node.fromXJSXCore = true);
            e.parentNode.insertBefore(node, e);
          },
        };
      },
      XJSXLastProcessCallback: function () {
        this.resolved = true;

        this.onboardProcesses.length&&
          /***check end**/
          this.modules.end.operations[0].callback(
            void 0,
            this.onboardProcesses[this.onboardProcesses.length - 1],
            this
          );
       
        this.timeStamp &&
          console.log(`onload: ${performance.now() - this.timeStamp}ms`);
      },
      XJSXProcessor: function (e, currentProcess) {
        var params = this.parseKeyWord(e.data);

        var isNewProcess;
        var type;
        var isChildProcess;
        var module =
          !currentProcess && this.getModule(params[0]) ||
          !currentProcess.module.keywords[params[0]]&&
             this.getModule(params[0])
              ||
             false;
             

        module&&
        (
          type = module.operations[0].type,
          isNewProcess = type === MKEYWORD || type === MICRO ? false : true
        )

        if (type === MICRO ) {
         // e.remove();
          if (!currentProcess||currentProcess._isDeadProcess||currentProcess.type!=="function") {
             //    currentProcess &&
         /* !(shouldProcess && isChildProcess) &&
          !(shouldProcess && type === MKEYWORD) &&*/
         // currentProcess.nodes.append(e /*, shouldProcess*/);

        //  console.log(currentProcess);
            return;
          }
          
          e.remove();
       //   e._removed=true
        //  e.data=""
          //module.operations[0].callback(currentProcess)
         currentProcess.micro_parameter = params[1];
         currentProcess.micro_callback = module.operations[0].callback;
          return;
        }

        !isNewProcess && currentProcess &&(
          currentProcess.isDeadProcess = currentProcess._isDeadProcess
        )

        var shouldProcess =
          !currentProcess &&1||
          !currentProcess.isDeadProcess&&1||0;
        //  && currentProcess.isDeadProcess ? 0 : 1;

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

        // currentProcess.module.keywords.hasOwnProperty(params[0])
        //   currentProcess &&
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
          type = module.operations[0].type;
          var previousKeyword = currentProcess.name;
         // console.log(previousKeyword === module.name);
          if (previousKeyword === module.name) {
          previousKeyword =0
          }else{
          previousKeyword =module.keywords[previousKeyword]
          }
          /*
          previousKeyword =
            previousKeyword === module.name
              && 0
              || module.keywords[previousKeyword];*/
//console.log(module.keywords,previousKeyword);
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

          if (
            type === KEYWORD &&
              // !module.operations[0].escape &&
              nextInLineProcess > currentInLineProcess ||
            type === FUNCTION &&
              nextInLineProcess + 1 !== currentInLineProcess
          ) {
         //   console.log(currentInLineProcess,nextInLineProcess);
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
        // var newNode;
        if (shouldProcess) {
          var newNode = this.createElement(true);
          e.parentNode.insertBefore(newNode, e);
          e.remove();
          e = newNode;
        } else {
          //   e.process = {nodes:{append:currentProcess.nodes.append}};
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
              //  if (module) {
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
          // }

          return;
        }

        /*
     (type === KEYWORD&&((currentProcess && currentProcess.eval) || this.eval)
      )||
        ((currentProcess && alert(7))|| alert(9));
      */
        // var _eval
        //console.log(module.operations[0].escape);

        /* else if(type===FKEYWORD){
        _eval=currentProcess ? isChildProcess?currentProcess.eval:currentProcess.eval() : this.eval();
        console.log(currentProcess);
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

        //  console.log(r);

        e.process.__proto__ = {
          name: params[0],
          params: params,
          remove: e.remove,
          isterminated: void 0,

          isDeadProcess:
            currentProcess && currentProcess.isDeadProcess || void 0,
          _isDeadProcess:
            currentProcess && currentProcess.isDeadProcess || void 0,
          parentProcess: !isNewProcess && currentProcess || void 0,
          parentParams: isNewProcess && params || currentProcess.parentParams,
          global: isNewProcess && {} || currentProcess.global,
          /*
        eval: type === KEYWORD&&currentProcess && currentProcess.eval || this.eval
      ||
        currentProcess && currentProcess.eval() || this.eval()
      ,*/
          // eval:_eval,
          module: module,
          type: module.operations[0].type,
          callback:
            module.operations[module.keywords[params[0]]] ||
            module.operations[0],
        };

        shouldProcess &&
          this.execCallback(e.process, "onload");
        
        this.onboardProcesses.push(e.process);
      },
      XJSXCompilerCS: function () {},
      XJSXCompiler: function (element, _eval) {
        var core = {
          // id: true,
          //   timeStamp:performance.now(),
          document: element,
          onboardProcesses: [],
          eval: "function" === typeof _eval && _eval || __core__._eval(exec),
          __proto__: __core__,
        };

        //  console.log(element.childElementCount, element);
        // return element

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
        var _n = node && (node.nextSibling||node.parentNode);

           // console.log(node, element);
          // return 
        while (node) {
         if( node === last){
          core.stage(node);
           break;
         }
         
          core.stage(node);
       
        if (node.parentNode) {
            node = core.getNextNode(node);
            _n = core.getNextNode(node);
          }else{
            node = _n;
           _n = node.nextSibling;
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
      error_meassages: {
        IMC: "invalid module case",
      },
    };


  /** end **/
  __core__.createModule([
    {
      keyword: "end",
      callback: function (e, currentProcess, core) {
        if (currentProcess) {
          core.execCallback(currentProcess);
          if (currentProcess.module.operations[0].onend) {
            currentProcess.callback.callback =
              currentProcess.module.operations[0].onend;
            core.execCallback(currentProcess);
          }

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

  /** animate √ **/
  __core__.createModule([
    {
      keyword: "animate",
      callback: function (arg,node) {
        try {
          var param = this.eval("[" + arg + "][0]");
          if (node) {
            var put = node.putChild;
            var doc;
            node.putChild = function (n) {
              doc = document.createElement("x-fragment");
              doc.appendChild(n);
              var r = node.x_addChild(doc);
              __core__.animation[param]&& (__core__.animation[param])(doc,r, param);
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
        // !this.global.q && this.remove();
      },
    },
  ]);

  /** print √ **/
  __core__.createModule([
    {
      keyword: "print",
      _trusted: true,
      callback: function (e, node, eval) {
        try {
          node.putChild(eval("[" + e + "][0]"));
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
      callback: function (e, node, eval) {
        if (e != 0) {
          try {
            var tmp=__core__.tmp||(__core__.tmp=document.createElement("template"));
            tmp.innerHTML=eval(e);
            __core__.XJSXCompiler(tmp.content)
            node.putChild(tmp.content)
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

  /** use-template √ **/
  __core__.createModule([
    {
      keyword: "use-template",
      _trusted: true,
      callback: function (tmp, node, eval) {
        var e = tmp;
        var snapshot;

        try {
          (tmp= eval("[" + e + "]")), (snapshot = tmp[1]), (tmp = tmp[0]);

          if (tmp instanceof Node) {
            tmp instanceof HTMLTemplateElement&&(tmp = tmp.content)
          } else {
            tmp = document.querySelector('template[id="' + tmp + '"]')||tmp;
            if (tmp instanceof Node) {
              tmp = tmp.content;
            } else {
              tmp=XJSX.customTemplates[tmp]
              /*** promise **/
            tmp instanceof HTMLTemplateElement&&(tmp = tmp.content)
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
          
          if (snapshot||snapshot===0) {
            console.warn("use-template:...; "+snapshot,
            "This feature is still in alpha")
            /** disabling this for now **/
            if (tmp.fragment) {
           /*  
              console.log(tmp);
             delete tmp._removed
             delete tmp.fromXJSXCore
             console.log(tmp.fragment.parentNode);
           tmp.fragment.remove()
             */
             snapshot===0&&tmp.fragment.remove();   
        //   console.log(snapshot);
              /*__core__.XJSXCompiler(tmp.fragment, eval)*/
            tmp.fragment=tmp.fragment.cloneNode(true)
            } else {
              tmp.fragment = document.createElement("x-fragment");
              tmp.fragment.appendChild(tmp.cloneNode(true));
              __core__.XJSXCompiler(tmp.fragment, eval);
            }
              node.putChild(tmp.fragment);
          } else {
            node.putChild(__core__.XJSXCompiler(tmp.cloneNode(true), eval));
          }
        } catch (err) {
          // console.log(err);
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
      callback: function (e, node, eval) {
        try {
          eval(e.trim().replace(/^"([^]+)"$/g, "$1"));
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
      callback: function (e, node, eval) {
        e = e.trim();
        if (!e) {
          return;
        }
        try {
          eval("console.log(" + e + ")");
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
      callback: function (e, node, eval) {
        try {
          e = eval("[" + e + "][0]");

          __core__.addEventListener("data/" + e, function (ev) {
            node.isVisible()&&
              node.putChild(ev.detail)||
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
        try {
          arg= this.eval("[" + arg + "]");
          url=arg[0];
          if ("object"=== typeof arg[1]) {
            opt=arg[1]
          }
        } catch (e) {
          return console.error("fetch", arg, e);
        }
        var http = new XMLHttpRequest();
        opt&&opt.type&&(http.responseType=opt.type)
        http.open(opt&&opt.method||"get", url);
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
          var argument = [
            {
              responseURL: http.responseURL,
              status: http.status,
              statusText: http.statusText,
              responseType: http.responseType,
              response: http.response,
              opened: (http.abort(), (http = delete self.global.http)),
            },
          ];

          try {
            /* code */
            for (var i = 0; i < p.length; i++) {
              self.eval(argument[i], p[i]);
            }
          } catch (err) {
            console.error("fetch:,then:", p.join(","), err + "");
          }
          self.putChild(__core__.XJSXCompiler(doc, self.eval));
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

          try {
            for (var i = 0; i < p.length; i++) {
              self.eval(void 0, p[i]);
            }
          } catch (err) {
            console.error("fetch:,catch:", p.join(","), err + "");
          }
          http = delete self.global.http;

          self.putChild(__core__.XJSXCompiler(doc, self.eval));
        };
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
        this.global.p = __core__.parseParameter(p, self.eval);
        //console.log(this);
        //  this.global.doc=document.createDocumentFragment()
        this.killProcess();
      },
      onprogress: function () {
        this.disable(); //(this.global.doc);
      },
      onend: function () {
        try {
          var self = this;
          var p = this.global.p;
          var data = p.parameter[0];

          var foo = function () {
            for (var i = 0; i < p.arguments.length; i++) {
              self.eval(arguments[i], p.arguments[i]);
            }
            for (var i = 0; i < self.global.callback.length; i++) {
              self.global.callback[i]();
            }
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
        var self = this;
        p = this.global.p;
        var doc = document.createDocumentFragment();
        this.appendAllTo(doc);
        if (1 > doc.childNodes.length) {
          return;
        }
        self.global.callback.push(function () {
          self.addChild(
            __core__.XJSXCompiler(doc.cloneNode(true), self.eval()),
            true
          );
        });
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
        var doc = document.createDocumentFragment();
        this.appendAllTo(doc);
        self.global.callback.push(function () {
          self.addChild(
            __core__.XJSXCompiler(doc.cloneNode(true), self.eval()),
            true
          );
        });
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
       var   e = __core__.parseParameter(a, this.eval);
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
  //    console.log(err);
          console.log(
            "on:",
            a,
            err + ""
          );
        }
      },
    },
  ]);

  /** animatesss **/

  /*
  var ev=function() {
    var _ev=_eval;
this.eval=function() {
    _ev=_ev(arguments[0],arguments[1],true)
    return eval("(" + arguments.callee.toString().
    replace("var ev=_eval;","")

    + ")");

}
  }
  */

!document.documentElement.attributes.xjsx&&
  ({
    //  id: true,
    timeStamp: performance.now(),
    eval: __core__._eval(exec),
    onboardProcesses: [],
    document: document,
    __proto__: __core__,
  }._observer());

  window.XJSX = {
    FUNCTION: 2,
    METHOD: 1,
    KEYWORD: 0,
    createAnimation:__core__.createAnimation,
    parseXJSXParameter: __core__.parseParameter,
    customTemplates:{},
    event: {
      emit: __core__.dispatchEvent,
      on: __core__.addEventListener,
    },
    parseElement: function (node, eval) {
      node instanceof Node&&
        __core__.XJSXCompiler(node, window.eval === eval&&!(
          console.warn("parseElement","second argument is not a valid instance"),
          eval = void 0
        )||eval)
      ||
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
      
      type === 1&&(
        __core__.createModule(module),
        module = void 0
      );
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
          module&&
          !__core__.createModule(module)||
             console.warn(
              "no need to panic...this is not an error",
              "module initialized already."
            );
          
        },
      };
    },
  };
})(function () {
  return !arguments[1] && "string" === typeof arguments[0]&&
     [
      eval(arguments[0], (arguments[0] = arguments[1] = void 0)),
      eval("(" + arguments.callee + ")"),
    ] ||
  "string" === typeof arguments[1]&&
     [
      eval(`var ${arguments[1]}=arguments[0]`),
      eval("(" + arguments.callee + ")"),
      (arguments[0] = arguments[1] = void 0),
    ]||
    [
      eval(arguments[0], (arguments[0] = arguments[1] = void 0)),
      eval("(" + arguments.callee + ")"),
    ];
});
