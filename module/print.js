XJSX.createModule(
     "print",
     XJSX.METHOD,
     {
    callback: function (e, node, eval) {
      // e = e.trim();
      if (e != 0) {
        try {
         // console.log(node);
          node.putChild(eval("(" + e + ")"));
        } catch (err) {
          console.error("print:", e, err + "");
          e = "";
        }
      }
     }
   });
