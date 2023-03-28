


(function (eval) {
  var core = {
      _observer: window.MutationObserver
        ? function (foo, elm) {
            var obs = new window.MutationObserver(function (e) {
              for (var i = 0; i < e.length; i++) {
                if (e[i].type === "childList") {
                  for (var _i = 0; _i < e[i].addedNodes.length; _i++) {
                    void (e[i].addedNodes[_i].trusted
                      ? 0
                      : foo(e[i].addedNodes[_i]));
                  }
                } else {
                  void (e[i].target.trusted ? 0 : foo(e[i].target));
                }
              }
              return (e = i = void 0);
            });
            obs.observe(elm || document, {
              childList: true, //
              subtree: true,
            });
            addEventListener("load", function () {
              obs.disconnect();
            });
            return (elm = void 0);
          }
        : function (foo, elm) {
            elm.addEventListener("DOMNodeInserted", function (e) {
              void (e.target.trusted ? 0 : foo(e.target));
              e = void 0;
            });
            return (elm = void 0);
          },

      stage: function (e) {
        var mode = core.isOurs(e);
        var currentProcess = core.getOnboardProcess();
        if (mode === core.mode[0]) {
          XJSXHandlers.processKeyword(e, currentProcess);
        } else {
          if (currentProcess) {
            currentProcess = currentProcess.process;
         //   console.log(currentProcess)
            if (currentProcess.module.operations[0]. type==="keyword") {
              currentProcess.nodes.push(e);
            }else{
              currentProcess.documentFragment.appendChild(e)
          }
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
        // console.log(keyword,e);
      },
      mode: ["embedded", "defined"],
      createModule: function (module) {
        if (module instanceof Array && module.length < 1) {
          throw this.error_meassages.IMC;
        }

        if (!core.isKeyWord(module[0].keyword)) {
          throw core.error_meassages.IMC;
        }
        core.modules[module[0].keyword] = {
          operations: module,
          keywords: {},
          name: module[0].keyword,
        };
        for (var i = 1; i < module.length; i++) {
          core.modules[module[0].keyword].keywords[module[i].keyword] = i;
        }
        //var module[0].keyword.length;
        //core.moduleLength=module[0].keyword.length;
      },
      getModule: function (key) {
        return core.modules[key];
      },
      modules: {},
      moduleLength: 0,
      currentonboardProcess: {},
      hasOnboardProcess: function () {
        return core.onboardProcesses.length > 0;
      },
      getOnboardProcess: function () {
        return core.onboardProcesses[core.onboardProcesses.length - 1] || null;
      },
      onboardProcesses: [],
      createElement: function (name, trusted) {
        if ("string" === typeof name) {
          name = document.createElement(name);
        } else if (name === null) {
          name = document.createTextNode("");
        //  name.process={};
          name._remove =name.remove
          name.remove=function() {
            if (this.process) {
              this.process.nodes.forEach(function(a) {
               a.remove()
            })
            }
            this._remove()
          }
        } else {
        }
        if (trusted) {
          name.trusted = true;
        }
        return name;
      },
      execCallback: function (crt,opt,node) {
        crt = crt.process;
        var foo = crt.callback;
        if (!opt) {
          opt="callback"
        }
          foo=foo[opt];
        if ("function"!==typeof foo) {
          return 
        }
        foo.prototype = new core.CALLBACK_PROTOTYPE(crt,opt);
        new foo(crt.params[1],crt.eval,node);
        foo.prototype = new Object();
      },
      CALLBACK_PROTOTYPE: function (process) {
        var type=process.module.operations[0].type
        if (type==="keyword") {
          this.parentParams=process.parentParams
        }
        this.eval = process.eval;
        
        this.terminate=function() {
          if (! process.isterminated) {
             process.isterminated=true;
             core.onboardProcesses.pop()
           }
        }
        this.forEach = function (foo) {
          if ("function"!==typeof foo) {
            throw "parameter should be a function "
          }
          process.nodes.forEach(function(a,b) {
          // if (a.process&&a instanceof Text) { }else{    }
           foo(a,b,null);
          })
        };
        this.global=process.global
      },
      error_meassages: {
        IMC: "invalid module case",
      },
    },
    XJSXHandlers = {
      processKeyword: function (e, currentProcess) {
        var params = core.parseKeyWord(e.data);
        if ("object" !== typeof currentProcess) {
          currentProcess = core.getOnboardProcess();
        }
        
        var newNode = core.createElement(null, true);
        if (e.parentNode) {
          e.parentNode.insertBefore(newNode, e);
          e.remove();
          e = newNode;
        }
        
        var module = core.getModule(params[0]);
        //console.log(module);
        if (currentProcess) {
          
          
        //  if (currentProcess.process.isterminated) {
            //console.log("process terminated already... process should be alive");
           // return;
       //   }
          if (
            currentProcess.process.module.keywords.hasOwnProperty(params[0])
         //   &&
           // currentProcess.process.module.operations[0].keywords !== params[0]
          ) {
            module = currentProcess.process.module;
            //var siblingProcess = module.keywords[params[0]] - 1;
            // var processCallback = module.operations[siblingProcess].callback;
            // console.log(currentProcess.process.callback);
            //({
            //  callback:processCallback
            //  }).callback()
            
            core.execCallback(currentProcess);
           if (currentProcess.process.isterminated) {
            console.log("process terminated already... process should be alive");
            return;
          }
            // console.log(processCallback);
               //console.log(currentProcess.process);

          }
          if
          (!module&&currentProcess.process.module.operations[0].type!=="keyword")
          {
            currentProcess.process.documentFragment.appendChild(e)
          }else if(currentProcess.process.module.operations[0].type==="keyword"){
            currentProcess.process.nodes.push(e)
          }
        }
        if (!module) {
          //   console.error("undefined keyword");
          return;
        }

        
        
        if (module.operations[0].type === "keyword") {
          var _eval = currentProcess ? currentProcess.process.eval: eval;
        }else{
          var _eval = currentProcess ? currentProcess.process.eval(null,true):
          eval(null,true);
        }
        
        if (module.operations[0].type === null) {
          module = module.operations;
          module = module[0].callback;
          //console.log(currentProcess);
          module(currentProcess);
       //   e.remove();
          return;
        }

        // console.log(module,currentProcess);

        // core.currentonboardProcess=
        

        //  console.log(newNode);

        e.process = {
          name: params[0],
          params: params,
          parentParams:currentProcess?currentProcess.process.parentParams:params,
          global:currentProcess?currentProcess.process.global:{},
          nodes: [],
          documentFragment: document.createDocumentFragment(),
          
          eval: eval,
          module: module,
          callback:
          module.operations[module.keywords[params[0]]]||module.operations[0],
        };
        core.execCallback(e,"onload")
        core.onboardProcesses.push(e); //-1;
        // currentonboardProcess=[]
        // return e
      },
    };

 // core.CALLBACK_PROTOTYPE.prototype = {
   // terminate: function () {},
  //};

  // console.log(new core.CALLBACK_PROTOTYPE());

  core.createModule([
    {
      keyword: "if",
      onload: function(e,eval){
        try {
         e=eval(e);
         this.global.value= e?true:false
        } catch (e) {
          throw e
        }
      },
      callback: function (e,eval) {
         console.log(this.global.value);
      if (!this.global.value) {
       this.forEach(function(a,b,c) {
         a.remove()
       })
      }
      },
      type: "keyword",
    },
    {
      keyword: "else",
      callback: function (e) {
        if (this.global.value) {
       this.forEach(function(a,b,c) {
         a.remove()
       });
      }
        this.terminate()
      },
      recallable: true,
    },
  ]);

  core.createModule([
    {
      keyword: "end",
      callback: function (currentProcess) {
      //  var currentProcess = core.getOnboardProcess();
        
        if (currentProcess) {
        //  currentProcess = currentProcess.process;
        //  var module = currentProcess.module
        //  module=module.operations[module.keywords[currentProcess.name]]
          //core.getModule(currentProcess.name);
           //  console.log(currentProcess, module);
           core.execCallback(currentProcess)
           if (!currentProcess.isterminated) {
             currentProcess.isterminated=true;
             core.onboardProcesses.pop()
           }
        }else{
          console.error("no process to end")
        }
      },
      type: null,
    },
  ]);
  // var obj={d:eval('"use strict";')('var a=9')('a+=11')}
  //obj= obj.d;
  // obj('console.log(a,this);')('a',true)

  core._observer(core.stage, document);
})(function () {
  if ("string"===typeof arguments[0]) {
  if (arguments[1]) {
  void eval(arguments[0]);
  return eval("(" + arguments.callee.toString() + ")");
  }
    return eval(arguments[0]);
  }else{
    return eval("(" + arguments.callee.toString() + ")");
  }
});
