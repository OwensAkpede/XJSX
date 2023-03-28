/***
 * @param {file} script.js(14) subset of this
 * @onprogress
 * @parentProcess
 * @core.execCallback
 * check XJSXNodeList>append>if>!e.parentNode  at about line 535
 */
//console.log("xjsx");

(function (exec) {
  //console.log(_eval);
  //_eval=_eval();
  var KEYWORD = "keyword",
    MKEYWORD = "micro-keyword",
    METHOD = "method",
    FUNCTION = "function";

  var time = 0;
  var __core__ = {
    _observer: window.MutationObserver
      ? function (elm) {
          var lastChild,
            lastDoc,
            cn,
            core = this,
            n,
            lc,
            
            obs = new window.MutationObserver(function (e) {
              //    var n,
              //    lc;
              if (!lastDoc) {
                if ((lc = document.body)) {
                  lastDoc = lc;
                } else {
                  lc = document.head || document.documentElement; //.lastChild
                }
              } else {
                lc = lastDoc;
              }

              while (lc.lastChild) {
                lc = lc.lastChild;
              }
              /*****/
              if (lastChild) {
              }
              if (lastChild && lastChild === lc) {
                //console.log(e,lastChild.textContent);
                //  console.log(document.documentElement.innerHTML,e);
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
              //  var cn;((cn=e[e.length-1])&&(cn=cn.addedNodes[0]))

               // console.log(e);
              // if (e[0]&&e[0].addedNodes[0]/*!e[0].addedNodes[0].parentNode*/) {
              //  console.log(e);
                 
            //   }
              for (var i = 0; i < e.length; i++) {
                var record = e[i];
                // console.log(record);
                for (var _i = 0; _i < record.addedNodes.length; _i++) {
                  n = record.addedNodes[_i];
                  if (!n.parentNode||n.fromXJSXCore||n.parentNode.removed) {
                    //console.log(n,n.parentNode);
                    continue 
                  }
                   core.stage(n);
                }
              }

              return (n = e = i = void 0);
            });
          obs.observe(elm || document, {
            childList: true,
            subtree: true,
          });
          addEventListener("load", function () {
            if (!core.resolved) {
              //  console.log(document.body.textContent);
              obs.disconnect();
              core.XJSXLastProcessCallback();
            }
          });
          return (elm = void 0), obs;
        }
      : function (elm) {
          elm.addEventListener("DOMNodeInserted", function (e) {
            void (e.target.fromXJSXCore ? 0 : core.stage(e.target));
            e = void 0;
          });
          return (elm = void 0);
        },
    stage: function (e) {
   //   console.log(e.parentNode.removed,e.textContent);
      // console.log(e.textContent);
      /*** console.time('p') **/
      //console.log(this);

      //if (!this.lastNodeInit && e instanceof HTMLBodyElement) {
      //  var t = document.createComment("jj");
      // t.lastProcess = true;
      //   e.appendChild(t, e);
      //   t = void 0;
      //  this.lastNodeInit = true
      //  }

      var currentProcess = this.getOnboardProcess();

      var mode = this.XJSXSyntax(e);

      if (mode === this.mode[1]) {
        this.XJSXProcessor(e, currentProcess);
      } else {
        if (currentProcess) {
        //  currentProcess = currentProcess. process;
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
        if (e.data.search(/^\?\?[^\?][^]+[^\?]\?\?$/)===0) {
          return this.mode[0]
        }else if(e.data.search(/^\?[^\?][^]+[^\?]\?$/)===0){
          return this.mode[1]
        }
      return null
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
      return [keyword.trim().toLowerCase(), e];
    },
    mode: ["embedded", "defined"],
    createModule: function (module) {
      if (module instanceof Array && 1 > module.length) {
        return console.error(this.error_meassages.IMC,module);
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
        return console.error(this.error_meassages.IMC,
        "keyword already taken",
        module);
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
    moduleType:[KEYWORD,MKEYWORD,METHOD,FUNCTION],
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
      //  cP = cP . process;
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
        //  if (this.process) {
      //   console.log(name);
            name.process.nodes.remove();
         // }
          name._remove();
        };
      }
      name.fromXJSXCore = trusted;
      return name;
    },
    execCallback: function (crt, opt, node) {
      //  if (crt instanceof Node) {
      // crt = crt. process;
      //  }

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

      foo.prototype = this.CALLBACK_PROTOTYPE(crt, opt, node);
      new foo(crt.params[1]);
    //  new foo(crt.params[1], crt.eval, node);
      foo.prototype = {};
      crt.closed = true;
    },
    CALLBACK_PROTOTYPE: function (process, opt, node) {
      /*****
       * use process.__proto__ to set process
       * note: this process is an instance, use .__proto__
       *****/

      var type = process.module.operations[0].type,
        core = this,
        _this = {
          parentParams: process.parentParams,
          eval: function () {
            // if (process.closed) {
            //  return console.error("process has ended ");
            // }
           // var e = process.eval;
          // console.log(process.eval);
            if (arguments.length === 0) {
              return process.eval();
            } else if (arguments[1]) {
              return process.eval(arguments[0], arguments[1]);
            } else {
              //    console.log(e,process);
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
                foo(core.toXJSXElement(a));
              });
            } else if (opt === "onload") {
              /* code */
            }
            console.error("this .forEach() method is deprecated");
          },
          global: process.global,
        };

      if (opt === "onprogress") {
        // _this.element = node;
        _this._delete = function () {
          if (process.closed) {
            return console.error("process has ended ");
          }
 // console.log(node,node.textContent);
          return node.removed=true, node.remove();
  //  if (__core__.strictElements.includes(node.constructor.name+",")) {
       //      node.remove()
         //    return
  //  }
    
        }
        _this.disable=function() {
          if (process.closed) {
            return console.error("process has ended ");
          }
          switch (node.constructor.name) {
            case 'HTMLScriptElement':
              node._type=node.type
              node.type="noscript"
              break;
          }
        }
      }

      /****check**/
      // if (type === KEYWORD) {
      // }

      if (opt === "onload") {
        _this.killProcess = function () {
        //  process.nodes.removed=true
          process.__proto__.isDeadProcess = true;
        };
      }

      if (opt === "callback") {
        _this.appendAllTo = function (doc) {
          process.nodes.forEach(function (node) {
            doc.appendChild(node);
          });
          process.nodes.flush();
        };
       _this.remove = process.remove;
        _this.removeAllNode = process.nodes.remove
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
          // pp.forEach(function(a) {
          //   a.remove()
          //  })

          if (child instanceof Array) {
            //  pp.flush()
            pp.push(child);
            pp = pp.me();
           // var _ch = pp;
            for (var i = 0; i < child.length; i++) {
              pp.parentNode.insertBefore(child[i], pp);
            }
           // for (var i = child.length - 1; i >= 0; i--) {
            //  pp.parentNode.insertBefore(child[i], _ch), (_ch = child[i]);
          //  }
          return 
          } else if (child instanceof DocumentFragment) {
              //   pp.flush();
              for (var i = 0; i < child.childNodes.length; i++) {
                pp.push(child.childNodes[i]);
              }
         } else {
              //   pp.flush()
              pp.push(child);
         }
            pp = pp.me();
            pp.parentNode.insertBefore(child, pp);
        };
        _this.putChild = function (child) {
          var pp = process;
          while (pp.parentProcess) {
            pp = pp.parentProcess;
          }
          pp = pp.nodes;
          pp.remove();
       //   pp.forEach(function (a) {
          //console.log(a);
           // a.remove();
         // });

          if (child instanceof Array) {
            pp.flush();pp.push(child);
            pp = pp.me();
            
          //  var _ch = pp;
            for (var i = 0; i < child.length; i++) {
              pp.parentNode.insertBefore(child[i], pp);
            }
          //  for (var i = child.length - 1; i >= 0; i--) {
            //  pp.parentNode.insertBefore(child[i], _ch), (_ch = child[i]);
          //  }
          } else {
            if (child instanceof DocumentFragment) {
              pp.flush();
              for (var i = 0; i < child.childNodes.length; i++) {
                pp.push(child.childNodes[i]);
              }
            } else {
              pp.flush();
              pp.push(child);
            }
            pp = pp.me();
            pp.parentNode.insertBefore(child, pp);
          }
        };
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
          // node.removed = true;
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
    XJSXNodeList: function (node) {
      var process = node.process;
      //if (node instanceof Node) {
      //}else{
      // console.error("unusual code...")
      // process=node
      //}
      var nodes = [],
        currentNodeParant,
        foo,
        core = this,
        forEach = function (a) {
          if (a instanceof Array) {
            a.forEach(forEach);
            return;
          } else if (a instanceof NodeList) {
           var len=a.length;
           for (var i = 0; i < len; i++) {
            len!==a.length&&(i=0,len=a.length);
             foo(a[i]);
           }
           // while (len=a.length) {
            // foo(a[len])
           // }
            return;
          }
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
          me: function () {
            return node;
          },
          flush: function (a) {
            nodes = [];
          },
          push: function (e) {
            nodes.push(e);
          },
          append: function (e, shouldProcess) {
            /*** this will prevent dublicate*/
            if (!e.parentNode && currentNodeParant) {
              console.error("this is not supposed to happen");
              // currentNodeParant.appendChild(e)
              //console.log(e.textContent,currentNodeParant);
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


            if (e.removed) {
              return;
            }
            if (!shouldProcess) {
              core.execCallback(process, "onprogress", e);
            }
            if (self.removed) {
     //    console.log(e);
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
            if (process.closed) {
              return console.error("process has ended ");
            }
            process.removed = self.removed = true;
            nodes.forEach(function (a) {
              if (a instanceof Array) {
            for (var i = 0; i < a.length; i++) {
              a[i].remove ()
            }
            return 
          } else if (a instanceof NodeList) {
            while (a.length>0) {
              a[a.length-1].remove()
            }
            return;
          }
            //  console.log(a.process);
            a.remove()
            });
            nodes = [];
          },
          pop: function () {
            nodes.pop();
          },
          //push: function (e) {
          //   self.append(e);
          //   },

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
     // console.log(e.process.eval);
      return {
       // eval: arguments[1],
        remove:e.remove,
        putChild: function (node) {
          process.flush();
          if (node instanceof DocumentFragment) {
            for (var i = 0; i < node.childNodes.length; i++) {
              process.push(node.childNodes[i]);
            }
          } else if (node instanceof Node) {
            node.parentNode && (node = node.cloneNode(true));
            process.push(node);
          } else {
            process.push((node = document.createTextNode(node)));
          }
          e.parentNode.insertBefore(node, e);
        },
      };
    },
    XJSXLastProcessCallback: function () {
      //   time += performance.now() - tm
      this.resolved = true;
    //  console.log("process ended");

      if (this.hasOnboardProcess()) {
        /***check end**/
        this.modules.end.operations[0].callback(
          void 0,
          this.onboardProcesses[this.onboardProcesses.length - 1],//.process,
          this
        );
      }
      //  console.log("done in " + time + "ms");
      //core.terminateCurrentProcess();
    },
    XJSXProcessor: function (e, currentProcess) {
      
      var params = this.parseKeyWord(e.data);
      // if ("object" !== typeof currentProcess) {
      //  currentProcess = core.getOnboardProcess();
      //}
      //if (currentProcess) {
     //   currentProcess = currentProcess.process;
   //   }

      var isNewProcess;
      var type;
      var isChildProcess;
      var module =
        currentProcess &&
        currentProcess.module.keywords.hasOwnProperty(params[0])
          ? void 0
          : this.getModule(params[0]);

      if (module) {
        type = module.operations[0].type;
        isNewProcess = type === MKEYWORD ? false : true;
      }

      if (!isNewProcess && currentProcess) {
        currentProcess.isDeadProcess = currentProcess._isDeadProcess;
       // console.log("a",e.textContent,currentProcess);
      }//else{
     // }

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
      if (currentProcess &&currentProcess.module.keywords.hasOwnProperty(params[0])) {
        /** is next in line?**/
        isChildProcess=true
        var nextInLineProcess;
        var currentInLineProcess;
        module = currentProcess.module;
        type = module.operations[0].type;
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

        if (
          (type === KEYWORD && nextInLineProcess > currentInLineProcess) ||
          (type === FUNCTION && nextInLineProcess + 1 !== currentInLineProcess)
        ) {
          //   console.log(nextInLineProcess,currentInLineProcess,type);
          return console.error(err_msg);
        }

        // module = currentProcess.module;

        this.execCallback(currentProcess);
        if (currentProcess.isterminated) {
          /*** check **/
          this.terminateCurrentProcess();
          return console.error(err_msg);
        } else {
          this.terminateCurrentProcess();
        }
       // err_msg = void 0;
      }
      //  }

      //console.log(e, type,shouldProcess);

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
        //   e.process = newNode.process;
     } else {
         console.error(
           "Note: this error was handled successfully",
           "not sure what happened, but this node was offtrack",
           e);
       return 
        /**
          this is weird...nodes should have parents 
          ***/
     }

/*** @check isChildProcess **/
      if (currentProcess && !(shouldProcess&&isChildProcess) && !(shouldProcess && type === MKEYWORD)) {
  //    console.log("pp",e.textContent);
        currentProcess.nodes.append(e, shouldProcess);
      }

      //  if (e instanceof Comment) {
      // e = newNode;
      // e .remove()
      //}

      if (!module) {
   //   console.log(currentProcess);
        console.error(
          "Unexpected token '%s' (%s:%s)",
          params[0],
          params[0],
          params[1]
        );
        return;
      }
      if (type === MKEYWORD) {
        if (shouldProcess) {
          module = module.operations;
          module = module[0].callback;
          if (module) {
            module(params[1], currentProcess, this);
          }
         // e.remove();
        } else {
          this.terminateCurrentProcess();
        }
        return;
      } else if (type === METHOD) {
        if (shouldProcess) {
          module = module.operations;
          var trusted = module[0].trusted;
          module = module[0].callback;
          if (module) {
            module(
              params[1],
              trusted ? e : this.XJSXMethodKeyword(e),
              currentProcess ? currentProcess.eval : this.eval
            );
          }
        }
        return;
      }

       // console.log(this.eval);
      if (type === KEYWORD) {
        var _eval = currentProcess ? currentProcess.eval : this.eval;
      } else {
        var _eval = currentProcess ? currentProcess.eval() : this.eval();
      }

      e.process.__proto__ = {
        name: params[0],
        params: params,
        remove:e.remove,
        getNode: function () {
          return e;
        },
        isDeadProcess: currentProcess ? currentProcess.isDeadProcess : false,
        _isDeadProcess: currentProcess ? currentProcess.isDeadProcess : false,
        parentProcess: !isNewProcess ? currentProcess : void 0,
        parentParams: isNewProcess ? params : currentProcess.parentParams,
        global: isNewProcess ? {} : currentProcess.global,

        //   documentFragment: document.createDocumentFragment(),

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
      var core = { __proto__: __core__, onboardProcesses: [] };
      //    console.log(core.getOnboardProcess(),__core__); return
      if ("function" === typeof _eval) {
     // console.log(_eval); 
        core.eval = _eval;
      } else {
        core.eval = __core__._eval(exec);
      }
      var node=element.firstChild
      var _n=core.getNextNode(node)
     while(node){
        core.stage(node);
        node=_n
        _n=core.getNextNode(node)
     }
     core.XJSXLastProcessCallback();
      
      return 
      var node = element.firstChild;
      var _n = core.getNextNode(node);
      var _p = core.getPreviousNode(node)
      var i=0
      while (node) {
       _p = core.getPreviousNode(node)
        if (i>200) {
          return console.error("max loop")
        }
        i++
        if (node.fromXJSXCore) {
                //  _p=node;
        node = _n;
      //  _n = core.getNextNode(node);
      //    continue
        } else{
        core.stage(node);
       // console.log(node.removed,node.parentNode);
        if (node.removed||!node.parentNode) {
       //   console.log(node,_p);
       //   console.log(node,_p);
          node=_p
       //   return 
       // node=_p;
          
        }else{
       // _p=node;
        node = _n;
        }
        }
        _n = core.getNextNode(node);
      }
      core.XJSXLastProcessCallback();
      //console.log(element.textContent);
    },
  //  strictElements:
 //   "HTMLCanvasElement,HTMLObjectElement,HTMLEmbedElement,HTMLTemplateElement,Text,Comment,HTMLScriptElement,HTMLTitleElement,HTMLStyleElement,HTMLLinkElement,HTMLMetaElement,HTMLIFrameElement,HTMLTextAreaElement,HTMLInputElement,",
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
          if (!currentProcess.isterminated) {
            core.terminateCurrentProcess();
          }
        } else {
          console.error("Unexpected token 'end'");
        }
      },
      type: MKEYWORD
    }
  ]);
  
/** if **/
  __core__.createModule([
    {
      keyword: "if",
      onload: function (q) {
        try {
          q = this.global.q = this.eval(q) ? true : false;
        } catch (e) {
          return console.error("if:", q, e);
        }
        if (!q) {
          this.killProcess();
        }
      },
      onprogress: function (q) {
        q = this.global.q;
       // console.log(q);
        if (q) {
          return;
        }
        this.disable();
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
        if (this.global.done) {
          //console.log(_q);
        }
        try {
          q = this.global.q = _q && this.eval("(" + _q + ")") ? true : false;
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
        this.disable();
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
        this.disable();
      },
      callback: function (q) {
        // this.putChild()
        this.terminate();
        q = this.global.q;
        if (!q) {
          this.remove();
        }
      },
    },
  ]);

/** print **/
  __core__.createModule([
    {
      keyword: "print",
      _trusted: true,
      callback: function (e, node,eval) {
        e = e.trim();
        try {
          e = e && eval("(" + e + ")");
          node.putChild(e);
        } catch (err) {
          console.error("print:", e, err + "");
          e = "";
        }
      },
      type: METHOD
    }
  ]);

/** parse-json **/
  __core__.createModule([
    {
      keyword: "parse-json",
      _trusted: true,
      callback: function (e, node, eval) {
        e = e.trim();
        try {
          eval("(" + e + ")=JSON.parse(" + e + ")", "");
        } catch (err) {
          console.error("parse-json:", e, err + "");
        }
         node.remove()
      },
      type: METHOD
    }
  ]);

/** use-template **/
  __core__.createModule([
    {
      keyword: "use-template",
      _trusted: true,
      callback: function (e, node) {
        e = e.trim();
        var tmp = document.querySelector("template#" + e);
        if (!tmp) {
          console.error(
            "use-template",
            "'template#" + e + "'no such template element found"
          );
        }

        tmp = tmp.content.cloneNode(true);
        __core__.XJSXCompiler(tmp, node.eval);
        node.putChild(tmp);
      },
      type: METHOD
    }
  ]);
  
  /** eval **/
  __core__.createModule([
    {
      keyword: "eval",
      _trusted: true,
      callback: function (e, node, eval) {
        try {
          eval(e.trim().replace(/^"|"$/g,""))
        } catch (err) {
          console.error("eval:",e,err.toString())
        }
        node.remove()
      },
      type: METHOD
    }
  ]);

  /** fetch **/
  __core__.createModule([
    {
      keyword: "fetch",
      onload: function (url) {
        try {
          url = this.eval(url);
        } catch (e) {
          return console.error("fetch", url, e);
        }
        var http = new XMLHttpRequest();
        http.open("get", url);
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
        //  this.flush();
     //  console.log(doc);
       //return 
        http.onload = function () {
          p = p.trim();
          if (!__core__.isVariable(p)) {
            return console.error(
              "fetch,then",
              "'" + p + "' is not a valid variable name"
            );
          } else {
            self.eval(
              {
                responseURL: http.responseURL,
                status: http.status,
                statusText: http.statusText,
                responseType: http.responseType,
                response: http.response,
                opened: (http.abort(), (http = delete self.global.http)),
              },
              p
            );
          }
          //  ('console.log(data)')
          // console.log(data,p);
          //console.log(doc);
          // self.eval("console.log(data)")
          __core__.XJSXCompiler(doc, self.eval);
         
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
        // this.flush();
        //  console.log(doc);
        // return

//console.log(arguments,eval("p"));
        http.onerror = function () {
          console.error(arguments[0]);
          p = p.trim();
          //console.log(http);
          if (!__core__.isVariable(p)) {
            console.error(
              "fetch,catch",
              "'" + p + "' is not a valid variable name"
            );
          } else {
            self.eval(http, p);
            http = delete self.global.http;
          }
          //  ('console.log(data)')
          // console.log(data,p);
          // self.eval("console.log(data)")
          __core__.XJSXCompiler(doc, self.eval);
          self.putChild(doc);
        };
      },
    },
  ]);

/** for-each **/
  __core__.createModule([
    {
      keyword: "for-each",
      type: FUNCTION,
      onload: function () {
        this.killProcess();
      },
      onprogress: function () {
        this.disable();
      },
      callback: function (p) {
        var self = this;
        p = p.trim().split(";");
        var data;
        try {
          data = p[0].trim() && self.eval("(" + p[0] + ")");
          if (data && "object" !== typeof data) {
            throw "not an Object.";
          }
        } catch (e) {
          console.error("for-each:", p[0], e + "");
          self.remove();
          return;
        }

        if (p[1]) {
          p = p[1].split(",");
        } else {
          p = void 0;
        }
        // console.error(p.join(","),"'"+p[0]+"' is not a valid variable name")
        // console.log(self);
        var doc = document.createDocumentFragment(),
          _doc;
        this.appendAllTo(doc);
          //console.log(doc);
       //   return 
        if (p) {
          if (p[0] && !__core__.isVariable(p[0].trim())) {
            console.error("'" + p[0] + "' is not a valid variable name");
            p = void 0;
          } else if (p[1] && !__core__.isVariable(p[1].trim())) {
            console.error("'" + p[1] + "' is not a valid variable name");
            p = void 0;
          }
        }
        var foo = function (prop) {
          if (p) {
          //  console.log(prop);
            p[0] && self.eval(data[prop], p[0]);
            p[1] && self.eval(prop, p[1]);
          }
          __core__.XJSXCompiler((_doc = doc.cloneNode(true)), self.eval());
          self.addChild(_doc);
         //   console.log(doc);
        };

        if (data instanceof Array) {
          for (var i = 0; i < data.length; i++) {
            foo(i);
          }
        } else {
          for (var prop in data) {
            foo(prop);
          }
        }
      },
    },
  ]);

  /*
  var ev=function() {
    var _ev=_eval;
this.eval=function() {
    _ev=_ev(arguments[0],arguments[1],true)
    return eval("(" + arguments.callee.toString(). 
    replace("var ev=_eval;","")
 //   replace("_ev(","eval(")
    + ")");
  // body...
}
  }
  */
  // _eval=_eval()
  var tm = performance.now();
//console.log(__core__._eval(eval)());
//window.onload=function (argument) {
  // body...
  //__core__.XJSXCompiler(document.body)
//}
//return 
  ({
    __proto__: __core__,
    eval: __core__._eval(exec),
    onboardProcesses: [],
  })._observer(document);
  
  window.XJSX={
    FUNCTION:3,
    METHOD:2,
    KEYWORD:0,
    MKEYWORD:1,
    parseElement:function(node,eval){
      if (node instanceof Node) {
        if (window.eval===eval) {
          eval=void 0;
          console.warn("window.eval is not a valid instance")
        }
        __core__.XJSXCompiler(node,eval)
        return true
      }else{
        console.error("XJSX/parse","invalid argument",node);
      }
    },
    createModule:function(name,type,obj) {
          if (!__core__.moduleType[type]) {
            return console.error("invalid value...")
          }
       var module=[{
        keyword:name,
        type:__core__.moduleType[type],
        onload:obj.onload,
        onprogress:obj.onprogress,
        callback:obj.callback
      }]
      if (type===1||type===2) {
        __core__.createModule(module)
        module=void 0;
      }
      return {
        append:function(name,obj) {
          if (!module) {
            return console.warn("no need to panic...this is not an error","module initialize already.")
          }
          module.push({
             keyword:name,
             onload:obj.onload,
            onprogress:obj.onprogress,
            callback:obj.callback
          })
          return this;
        },
        end:function() {
          if (!module) {
            return console.warn("no need to panic...this is not an error","module initialize already.")
          }
      __core__.createModule(module)
        }
      }
    }
  }
  
})(function () {
//  "use strict";
  
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
