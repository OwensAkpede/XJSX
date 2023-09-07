(function(){
   var __core__=XJSX.__XJSXCORE__();
  var MICRO = 0xA;  
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
})()