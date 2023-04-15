var animation={};
XJSX.createAnimation=function (n, f) {
      "function" === typeof f && (animation[n] = f);
    };

   /** animate √ **/
   XJSX.__createModule__([
         {
           keyword: "animate",
           callback: function(arg, node) {
             try {
               arg = this.eval("[" + arg + "]");
               var param = arg[0];
               if (node) {
                 var put = node.putChild;
                 var doc;
                 node.putChild = function(n) {
                   doc = document.createElement("x-fragment");
                   if (n instanceof NodeList) {
                     while (n[0]) {
                       doc.appendChild(n[0]);
                     }
                   } else {
                     doc.appendChild(n);
                   }
                   var r = node.x_addChild(doc);
                   animation[param] &&
                     animation[param](doc, r, arg);
                 };
               } else {
                 throw "Unexpected token 'animate'";
               }
             } catch (err) {
               console.error("animate:", this.micro_parameter, err + "");
             }
           },
           type:  "micro",
     },
   ]);
   