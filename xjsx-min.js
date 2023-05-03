/*! XJSX v 1.5.0 - 03-05-2023 */
!function(e){var t="keyword",o="micro",n="micro-keyword",r="function",a="function-keyword",s="method",i=function(e,t,o,n){var r=this,a=0;this.nm=function(s){n.isVisible&&a<e&&(0!==a&&s?setTimeout(r.nm,o):(t(a),a++,r.nm(!0)))},this.arr=function(s){n.isVisible&&a<e.length&&(0!==a&&s?setTimeout(r.arr,o):(t(e[a],a),a++,r.arr(!0)))},this.obj=function(){var r,s=function(e){var t=[];for(var o in e)t.push(o);return t}(e),i=function(c){n.isVisible()&&a<s.length&&(r=s[a],0!==a&&c?setTimeout(i,o):(t(e[r],r),a++,i(!0)))};i()}},c={_observer:window.MutationObserver&&function(){var e,t,o,n,r=this,a=new window.MutationObserver((function(s){for("complete"===document.readyState&&(a.disconnect(),r.XJSXLastProcessCallback()),t&&(n=t)||(n=document.body)&&(t=n)||(n=document.head||document.documentElement);n.lastChild;)n=n.lastChild;if(!e||e!==n){e=n;for(var i=0;i<s.length;i++)for(var c=s[i],l=0;l<c.addedNodes.length;l++)!(o=c.addedNodes[l]).parentNode||o.fromXJSXCore||o.parentNode.removed||o.parentNode._removed||o.parentNode.fromXJSXCore&&(o.fromXJSXCore=!0)||r.stage(o)}}));a.observe(document,{childList:!0,subtree:!0}),addEventListener("load",(function(){!r.resolved&&(a.disconnect(),r.XJSXLastProcessCallback())}))}||function(){var e=this.document;addEventListener("load",(function(){c.XJSXCompiler(e)}))},animation:{},createAnimation:function(e,t){"function"==typeof t&&(c.animation[e]=t)},events:{},addEventListener:function(e,t){c.events[e]&&t(c.events[e]),window.addEventListener(e,t)},dispatchEvent:function(e,t){var o=c.events[e];!o&&(c.events[e]=o=document.createEvent("CustomEvent")),o.initCustomEvent(e,!1,!1,t),window.dispatchEvent(o)},dispatcher:function(e,t){!c.dispatcher_init&&(c.dispatcher_init=document.createEvent("Event")),c.dispatcher_init.initEvent(t),e.dispatchEvent(c.dispatcher_init)},stage:function(e){var t=this.getOnboardProcess();e instanceof Comment&&0===e.data.search(/^\?[^\?][^]+[^\?]\?$/)&&!this.XJSXProcessor(e,t)||t&&t.nodes.append(e)},_XJSXSyntax:function(e){return 0===e.search(/^\?[^\?][^]+[^\?]\?$/)&&this.mode[1]},XJSXSyntax:function(e){return e instanceof Comment&&0===e.data.search(/^\?[^\?][^]+[^\?]\?$/)&&this.mode[1]},isKeyWord:function(e){return"string"==typeof e&&e.match(/^[a-z0-9]+([^]+[a-z0-9])?$/)},parseKeyWord:function(e){for(e=e.trim();"?"===e[0];)e=e.substring(1);for(;"?"===e[e.length-1];)e=e.substring(0,e.length-1);for(var t="";":"!==e[0]&&e.length>0;)t+=e[0],e=e.substring(1);return":"===e[0]&&(e=e.substring(1)),[t.trim(),e]},parseParameter:function(e,t){return 2>(e=e.split(";")).length&&e.push([])||(e[e.length-1]=e[e.length-1].split(",")),{arguments:e.pop(),parameter:t&&t("["+e+"]")||e}},domParser:function(){var e=c.domParser_node||document.createElement("span");return e.innerHTML=arguments[0],e},mode:["embedded","defined"],createModule:function(e){if(!(e instanceof Array&&1>e.length)&&this.isKeyWord(e[0].keyword)&&!this.modules[e[0].keyword]&&!this.signedKeywords[e[0].keyword]){this.modules[e[0].keyword]={operations:e,keywords:{},name:e[0].keyword};for(var t=1;t<e.length;t++)this.modules[e[0].keyword].keywords[e[t].keyword]=t,this.signedKeywords[e[t].keyword]=e[0].keyword,!this.isKeyWord(e[t].keyword)&&delete this.modules[e[0].keyword],this.modules[e[t].keyword]}},_eval:function(e){return function(){var t=e(arguments[0],arguments[1]);return e=t[1],0===arguments.length&&c._eval(e)||1===arguments.length&&"string"==typeof arguments[0]&&t[0]}},modules:{},moduleType:[t,s,r],signedKeywords:{},moduleLength:0,hasOnboardProcess:function(){return this.onboardProcesses.length>0},getOnboardProcess:function(){return this.onboardProcesses[this.onboardProcesses.length-1]||null},terminateCurrentProcess:function(){var e=this.onboardProcesses[this.onboardProcesses.length-1];e&&(e.isterminated=!0,this.onboardProcesses.pop())},onboardProcesses:[],getPNextNode:function(e){return e&&(e.nextSibling||e.parentNode&&this.getPNextNode(e.parentNode))},getNextNode:function(e){return e&&(e.firstChild||e.nextSibling||e.parentNode&&this.getPNextNode(e.parentNode))},createElement:function(e,t){return"string"==typeof e&&(e=document.createElement(e))||(t=e,(e=document.createTextNode("")).process={},e.process.nodes=this.XJSXNodeList(e),e._remove=e.remove,e.remove=function(){e.process.nodes.remove(),e._remove()}),e.fromXJSXCore=t,e},execCallback:function(e,t,o){if(!e.isDeadProcess||"onprogress"===t){!t&&(t="callback");var n=e.callback[t];if("function"==typeof n){e={__proto__:e};var r=this.CALLBACK_PROTOTYPE(e,"onend"===t?"callback":t,o);r.__callback__=n,r.__callback__(e.params[1],"callback"===t&&e.micro_callback&&e.micro_callback(e.micro_parameter,r)),e.closed=!0}}},CALLBACK_PROTOTYPE:function(e,t,o){e.module.operations[0].type;var n=this,r={parentParams:e.parentParams,isVisible:e.nodes.isVisible,eval:function(){return 0===arguments.length&&e.eval()||arguments[1]&&!e.eval(arguments[0],arguments[1])||e.eval(arguments[0])},forEach:function(o){e.closed||"function"==typeof o&&"callback"===t&&e.nodes.forEach((function(t){o(n.toXJSXElement(t,e))}))},global:e.global};return"onprogress"===t&&(r.appendTo=function(e){e.appendChild(o.cloneNode(!0))},r.disable=function(){!e.closed&&(o.remove(),o._removed=!0)},r.delete=function(){!e.closed&&(o.remove(),o.removed=!0)})||"onload"===t&&(r.killProcess=function(){e.__proto__.isDeadProcess=!0})||"callback"===t&&(r.appendAllTo=function(t,o){o&&!e.nodes.forEach((function(e){t.appendChild(e.cloneNode(!0))}))||e.nodes.forEach((function(e){t.appendChild(e)}))||e.nodes.flush()},r.remove=e.remove,r.removeAllNode=e.nodes.remove,r._removeAllNode=function(t){e.nodes.forEach((function(e){e.remove(),"function"==typeof t&&t(e)})),e.nodes.flush()},r.flush=function(){e.nodes.flush()},r.addChild=function(t,o){var n=e;if(!o)for(;n.parentProcess;)n=n.parentProcess;if(n=n.nodes,t instanceof NodeList)for(var r=n.me();t.length;)t[0].fromXJSXCore=!0,n.push(t[0]),r.parentNode.insertBefore(t[0],r);else{if(t instanceof DocumentFragment)for(var a=0;a<t.childNodes.length;a++)t.childNodes[a].fromXJSXCore=!0,n.push(t.childNodes[a]);else t instanceof Node?n.push(t):n.push(t=document.createTextNode(t));n=n.me(),t.fromXJSXCore=!0,n.parentNode.insertBefore(t,n)}},r.putChild=function(t,o){var n=e;if(!o)for(;n.parentProcess;)n=n.parentProcess;if((n=n.nodes).remove(),n.flush(),t instanceof NodeList)for(var r=n.me();t.length;)t[0].fromXJSXCore=!0,n.push(t[0]),r.parentNode.insertBefore(t[0],r);else{if(t instanceof DocumentFragment)for(var a=0;a<t.childNodes.length;a++)t.childNodes[a].fromXJSXCore=!0,n.push(t.childNodes[a]);else t instanceof Node?n.push(t):n.push(t=document.createTextNode(t));n=n.me(),t.fromXJSXCore=!0,n.parentNode.insertBefore(t,n)}},r.terminate=function(){!e.closed&&e.isterminated||(n.onboardProcesses.pop(),e.__proto__.isterminated=!0)})&&e.micro_callback&&(r.x_addChild=function(t){for(var o=e;o.parentProcess;)o=o.parentProcess;var n=(o=o.nodes).cut();if(!(t instanceof NodeList)){if(t instanceof DocumentFragment)for(var r=0;r<t.childNodes.length;r++)t.childNodes[r].fromXJSXCore=!0,o.push(t.childNodes[r]);else t instanceof Node?o.push(t):o.push(t=document.createTextNode(t));return o=o.me(),t.fromXJSXCore=!0,o.parentNode.insertBefore(t,o),n}for(var a=o.me();t.length;)t[0].fromXJSXCore=!0,o.push(t[0]),a.parentNode.insertBefore(t[0],a)}),r},toXJSXElement:function(e,t){return{appendTo:function(t,o){o?t.appendChild(e.cloneNode(!0)):t.appendChild(e)},remove:function(){t.closed||e.remove()},getAllTextContent:function(){var t=e.textContent;return e.process&&e.process.nodes.forEach((function(e){t+=e.textContent})),t}}},XJSXNodeList:function(e){var t,o,n=e.process,r=[],a=this,s=function(e){if(e instanceof Array)e.forEach(s);else if(e instanceof NodeList)for(var t=e.length,n=0;n<t;n++)t!==e.length&&(n=0,t=e.length),o(e[n]);else o(e),e.process&&e.process.nodes.forEach&&e.process.nodes.forEach(s)},i={isVisible:function(){return a.document.contains&&a.document.contains(e.parentElement||e)},me:function(){return e},flush:function(e){r=[]},cut:function(){var e=r;return r=[],function(){for(var t=0;t<e.length;t++){var o=e[t];if(o instanceof Array){for(var n=0;n<o.length;n++)o[n].remove();return}if(o instanceof NodeList){for(;o.length>0;)o[o.length-1].remove();return}o.remove()}e=[]}},push:function(e){r.push(e)},append:function(e){t&&t.contains&&t.contains(e)||(t=e,!n._isDeadProcess&&a.execCallback(n,"onprogress",e),e.removed||i.removed&&!e.remove()||r.push(e))},forEach:function(e){if(o=e,!n.closed&&"function"==typeof o)for(var t=0;t<r.length;t++)s(r[t])},remove:function(){if(!n.closed){n.removed=i.removed=!0;for(var e=0;e<r.length;e++){var t=r[e];if(t instanceof Array){for(var o=0;o<t.length;o++)t[o].remove();return}if(t instanceof NodeList){for(;t.length>0;)t[t.length-1].remove();return}t.remove()}r=[]}},pop:function(){r.pop()}};return i},XJSXMethodKeyword:function(e){var t=e.process.nodes;return{remove:e.remove,isVisible:t.isVisible,putChild:function(o){if(t.remove(),o instanceof NodeList)for(;o.length;)o[0].fromXJSXCore=!0,t.push(o[0]),e.parentNode.insertBefore(o[0],e);else{if(o instanceof DocumentFragment)for(var n=0;n<o.childNodes.length;n++)o.childNodes[n].fromXJSXCore=!0,t.push(o.childNodes[n]);else o instanceof Node?t.push(o):t.push(o=document.createTextNode(o));!o.fromXJSXCore&&(o.fromXJSXCore=!0),e.parentNode.insertBefore(o,e)}}}},XJSXLastProcessCallback:function(){this.resolved=!0,this.onboardProcesses.length&&this.modules.end.operations[0].callback(void 0,this.onboardProcesses[this.onboardProcesses.length-1],this),this.timeStamp},XJSXProcessor:function(e,i){var c,l,d,u,f=this.parseKeyWord(e.data);if(i&&i.module.keywords[f[0]]&&!(u=!1)||(u=this.modules[f[0]]),u&&(c=!((l=u.operations[0].type)===n||l===o)),l===o){if(!i||i._isDeadProcess||"function"!==i.type)return;return e.remove(),i.micro_parameter=f[1],void(i.micro_callback=u.operations[0].callback)}!c&&i&&(i.isDeadProcess=i._isDeadProcess);var p=(i?!i.isDeadProcess&&1:1)||0;if(!1===u){if(!p)return void i.nodes.append(e);var h,m;d=!0,u=i.module,l=i.type,i.name===u.name&&!(h=0)||(h=u.keywords[i.name]),m=u.keywords[f[0]];f[0],h>=1&&i.parentParams.join(":"),i.params.join(":"),f.join(":");if(l===t&&h>m||l===r&&h+1!==m)return;if(this.execCallback(i),i.isterminated)return void this.terminateCurrentProcess();this.terminateCurrentProcess()}if(p){var v=this.createElement(!0);e.parentNode.insertBefore(v,e),e.remove(),e=v}else e.process={},e.process.nodes={},e.process.nodes.append=i.nodes.append;i&&(!p||!d)&&(!p||l!==n)&&i.nodes.append(e),u&&(l!==n?l!==s?(e.process.eval=l===t&&(i&&i.eval||this.eval)||a===l&&d&&i&&i.eval||i&&i.eval()||this.eval(),e.process.__proto__={name:f[0],params:f,remove:e.remove,isterminated:void 0,isDeadProcess:i&&i.isDeadProcess||void 0,_isDeadProcess:i&&i.isDeadProcess||void 0,parentProcess:!c&&i||void 0,parentParams:c&&f||i.parentParams,global:c&&{}||i.global,module:u,type:u.operations[0].type,callback:u.operations[u.keywords[f[0]]]||u.operations[0]},p&&this.execCallback(e.process,"onload"),this.onboardProcesses.push(e.process)):p&&u.operations[0].callback&&u.operations[0].callback(f[1],this.XJSXMethodKeyword(e),i&&i.eval||this.eval):u.operations[0].callback&&u.operations[0].callback(f[1],i,this))},XJSXCompiler:function(t,o){for(var n={document:t,onboardProcesses:[],eval:"function"==typeof o&&o||c._eval(e),__proto__:c},r=document.createTreeWalker(t,NodeFilter.SHOW_COMMENT,(function(e){return c._XJSXSyntax(e.data)&&!0})).nextNode(),a=document.createTreeWalker(t,NodeFilter.SHOW_COMMENT,(function(e){return c._XJSXSyntax(e.data)&&!0})).lastChild(),s=r&&(r.nextSibling||r.parentNode);r;){if(r===a){n.stage(r);break}n.stage(r),r.parentNode?(r=n.getNextNode(r),s=n.getNextNode(r)):s=(r=s).nextSibling}return n.document=document,n.XJSXLastProcessCallback(),t}};c.createModule([{keyword:"end",callback:function(e,t,o){t&&(!t.isDeadProcess&&!o.execCallback(t)&&t.module.operations[0].onend&&(t.callback=t.module.operations[0])&&o.execCallback(t,"onend"),t.isterminated||o.terminateCurrentProcess())},type:n}]),c.createModule([{keyword:"animate",callback:function(e,t){try{var o=(e=this.eval("["+e+"]"))[0];if(!t)throw"Unexpected token 'animate'";var n;t.putChild;t.putChild=function(r){if(n=document.createElement("x-fragment"),r instanceof NodeList)for(;r[0];)n.appendChild(r[0]);else n.appendChild(r);var a=t.x_addChild(n);c.animation[o]&&c.animation[o](n,a,e)}}catch(e){}},type:o}]),c.createModule([{keyword:"html-element",type:t,onload:function(e){var t,o=c.parseParameter(e,this.eval),n=o.parameter,r=[this.global.elm=t=document.createElement(n[0])];if("object"==typeof n[1])for(var a in n[1]){var s=n[1][a];s instanceof Object?t[a]=s:t.setAttribute(a,s)}for(var i=0;i<o.arguments.length;i++)this.eval(r[i],o.arguments[i])},onprogress:function(){},callback:function(){this.appendAllTo(this.global.elm),this.putChild(this.global.elm)}}]),c.createModule([{keyword:"if",type:t,onload:function(e){try{!(this.global.q=!!this.eval("("+e+")"))&&this.killProcess()}catch(e){return}},onprogress:function(){!this.global.q&&this.delete()},callback:function(){this.global.q&&(this.global.done=!0)}},{keyword:"else-if",onload:function(e){if(this.global.q||this.global.done)return this.global.q=!1,void this.killProcess();try{!(this.global.q=!!this.eval("("+e+")"))&&this.killProcess()}catch(e){return}},onprogress:function(){!this.global.q&&this.delete()},callback:function(){this.global.q&&(this.global.done=!0)}},{keyword:"else",onload:function(){this.global.done?(this.global.q=!1,this.killProcess()):this.global.q=!0},onprogress:function(){!this.global.q&&this.delete()},callback:function(){this.terminate()}}]),c.createModule([{keyword:"print",_trusted:!0,callback:function(e,t,o){try{t.putChild(o("["+e+"][0]"))}catch(t){e=""}},type:s}]),c.createModule([{keyword:"print-html",_trusted:!0,callback:function(e,t,o){if(0!=e)try{var n=c.tmp||(c.tmp=document.createElement("span"));n.innerHTML=o(e),t.putChild(n.childNodes)}catch(e){}},type:s}]),c.createModule([{keyword:"parse-json",_trusted:!0,callback:function(e,t,o){if(0!=e)try{o("("+e+")=JSON.parse("+e+")","")}catch(e){}t.remove()},type:s}]),c.createModule([{keyword:"use-template",_trusted:!0,callback:function(e,t,o){var n,r=e;try{if(n=(e=o("["+r+"]"))[1],(e=e[0])instanceof Node?e instanceof HTMLTemplateElement&&(e=e.content):((e=document.querySelector('template[id="'+e+'"]')||e)instanceof Node||(e=XJSX.customTemplates[e])instanceof HTMLTemplateElement)&&(e=e.content),!e)throw"could not render such template";n||0===n?(e.fragment?(0===n&&e.fragment.remove(),e.fragment=e.fragment.cloneNode(!0)):(e.fragment=document.createElement("x-fragment"),e.fragment.appendChild(e.cloneNode(!0)),c.XJSXCompiler(e.fragment,o)),t.putChild(e.fragment)):t.putChild(c.XJSXCompiler(e.cloneNode(!0),o))}catch(e){}},type:s}]),c.createModule([{keyword:"eval",_trusted:!0,callback:function(e,t,o){try{o(e.trim().replace(/^"([^]+)"$/g,"$1"))}catch(e){}t.remove()},type:s}]),c.createModule([{keyword:"console-log",_trusted:!0,callback:function(e,t,o){if(e=e.trim()){try{o("console.log("+e+")")}catch(e){}t.remove()}},type:s}]),c.createModule([{keyword:"data",_trusted:!0,callback:function(e,t,o){try{e=o("["+e+"][0]"),c.addEventListener("data/"+e,(function(o){t.isVisible()&&!t.putChild(o.detail)||removeEventListener("data/"+e,arguments.callee)}))}catch(e){}},type:s}]),c.createModule([{keyword:"fetch",onload:function(e){var t,o,n=new XMLHttpRequest;this.global.http=n;try{o=(e=this.eval("["+e+"]"))[0],"object"==typeof e[1]&&(t=e[1])}catch(e){return}if(n.open(t&&t.method||"get",o),t&&(t.type&&(n.responseType=t.type),t.withCredentials&&(n.withCredentials=t.withCredentials)),t&&t.headers)for(var r in t.headers)n.setRequestHeader(r,t.headers[r]);try{n.send(t&&t.body)}catch(e){setTimeout((function(){c.dispatcher(n,"error")}),0)}},type:r},{keyword:"then",onload:function(){this.killProcess()},onprogress:function(){this.disable()},callback:function(e){var t=this,o=this.global.http,n=document.createDocumentFragment();this.appendAllTo(n),o.addEventListener("load",(function(){var r;e=e.split(",");try{r=[{responseURL:o.responseURL,status:o.status,statusText:o.statusText,response:o.response||"",responseType:o.responseType,toString:function(){return this.response+""}}]}catch(e){r=[o.response||""]}o.abort(),o=delete t.global.http;try{for(var a=0;a<e.length;a++)t.eval(r[a],e[a])}catch(e){}t.putChild(c.XJSXCompiler(n,t.eval))}))}},{keyword:"catch",onload:function(){this.killProcess()},onprogress:function(){this.disable()},callback:function(e){var t=this,o=this.global.http,n=document.createDocumentFragment();this.appendAllTo(n),o.addEventListener("error",(function(){e=e.split(",");try{for(var r=0;r<e.length;r++)t.eval(void 0,e[r])}catch(e){}o=delete t.global.http,t.putChild(c.XJSXCompiler(n,t.eval))})),!o.readyState&&c.dispatcher(o,"error")}}]),c.createModule([{keyword:"include",callback:function(e){try{if(!(e=this.eval("["+e+"][0]")))throw"'"+e+"' is not a valid argument";var t=this,o=new XMLHttpRequest;t.global.http=o,o.addEventListener("load",(function(){t.putChild(c.XJSXCompiler(c.domParser(o.response,o.abort()),t.eval).childNodes)})),o.open("get",e),o.send()}catch(e){}},type:r},{keyword:"catch",onload:function(){this.killProcess()},onprogress:function(){this.disable()},callback:function(){var e=this,t=document.createDocumentFragment();this.appendAllTo(t),e.global.http?e.global.http.addEventListener("error",(function(){e.putChild(c.XJSXCompiler(t,e.eval)),this.abort(),delete e.global.http})):e.putChild(c.XJSXCompiler(t,e.eval))}}]),c.createModule([{keyword:"for-each",type:a,onload:function(e){this.global.callback=[],this.global.p=c.parseParameter(e,this.eval),this.killProcess()},onprogress:function(){this.disable()},onend:function(){try{var e=this,t=this.eval(),o=this.global.p,n=o.parameter[0],r=o.parameter[1],a=function(){for(var n=0;n<o.arguments.length;n++)t(arguments[n],o.arguments[n]);for(n=0;n<e.global.callback.length;n++)e.global.callback[n].addChild(c.XJSXCompiler(e.global.callback[n].d.cloneNode(!0),t),!0)};if(!e.isVisible())return;if(r){var s=new i(n,a,r,e);if("number"==typeof n)s.nm();else if(n instanceof Array)s.arr();else{if(!(n instanceof Object))throw"not an Object.";s.obj()}}else if("number"==typeof n)for(var l=0;l<n;l++)a(l);else if(n instanceof Array)for(l=0;l<n.length;l++)a(n[l],l);else{if(!(n instanceof Object))throw"not an Object.";for(var d in n)a(n[d],d)}}catch(t){e.remove()}},callback:function(){var e=this;this.appendAllTo(e.d=document.createDocumentFragment()),e.global.callback.push(e)}},{keyword:"break"},{keyword:"continue",onload:function(e){this.killProcess()},onprogress:function(){this.disable()},callback:function(){var e=this;this.appendAllTo(e.d=document.createDocumentFragment()),e.global.callback.push(e)}}]),c.createModule([{keyword:"on",type:r,onload:function(){this.killProcess()},onprogress:function(){this.disable()},callback:function(e){try{var t=c.parseParameter(e,this.eval),o=t.parameter[0];if(t.parameter=void 0,!o)throw"empty parameter";var n=this,r=document.createDocumentFragment();n.appendAllTo(r),c.addEventListener(o,(function(){if(n.isVisible()){for(var e=0;e<t.arguments.length;e++)n.eval(arguments[e],t.arguments[e]);n.putChild(c.XJSXCompiler(r.cloneNode(!0),n.eval))}else removeEventListener(o,arguments.callee)}))}catch(e){}}}]),!document.documentElement.attributes.xjsx&&{eval:c._eval(e),onboardProcesses:[],document:document,__proto__:c}._observer(),window.XJSX={FUNCTION:2,METHOD:1,KEYWORD:0,createAnimation:c.createAnimation,parseXJSXParameter:c.parseParameter,customTemplates:{},eval:c._eval(e),event:{emit:c.dispatchEvent,on:c.addEventListener},parseElement:function(e,t){e instanceof Node&&c.XJSXCompiler(e,window.eval===t&&!(t=void 0)||t)},createModule:function(e,t,o){if(c.moduleType[t]){var n=[{keyword:e,type:c.moduleType[t],onload:o.onload,onprogress:o.onprogress,callback:o.callback}];return 1===t&&(c.createModule(n),n=void 0),{append:function(e,t){if(n)return n.push({keyword:e,onload:t.onload,onprogress:t.onprogress,callback:t.callback}),this},end:function(){n&&c.createModule(n)}}}},__createModule__:function(){c.createModule(arguments[0])}},!Node.prototype.remove&&(Node.prototype.remove=function(){this.parentNode.removeChild(this)}),!Document.prototype.contains&&(Node.prototype.contains=function(e){for(var t=0;t<this.childNodes.length;t++)if(this.childNodes[t].contains&&this.childNodes[t].contains(e))return!0;return!1}),!XMLHttpRequest.prototype.hasOwnProperty("response")&&Object.defineProperty(XMLHttpRequest.prototype,"response",{get:function(){return this.responseText||this.responseXML||""}})}((function(){return!arguments[1]&&"string"==typeof arguments[0]&&[eval(arguments[0],arguments[0]=arguments[1]=void 0),eval("("+arguments.callee+")")]||"string"==typeof arguments[1]&&[eval("var "+arguments[1]+"=arguments[0]"),eval("("+arguments.callee+")"),arguments[0]=arguments[1]=void 0]||[eval(arguments[0],arguments[0]=arguments[1]=void 0),eval("("+arguments.callee+")")]}));