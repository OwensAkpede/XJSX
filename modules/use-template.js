(function() {
var __core__=XJSX.__XJSXCORE__();
var METHOD = 0xB;

  /** use-template √ **/
  __core__.createModule([
    {
      keyword: "use-template",
      callback: function (tmp, node, exec) {
        var e = tmp;
        var snapshot;

        try {
          (tmp = exec("[" + e + "]")), (snapshot = tmp[1]), (tmp = tmp[0]);
          if (("string" === typeof tmp) && (tmp in __core__.customTemplates)) {
            console.warn("alpha implementation ");
            tmp = __core__.customTemplates[tmp];
            tmp instanceof HTMLTemplateElement && (tmp = tmp.content || tmp) ||
              !(tmp instanceof Node) && (tmp = document.createTextNode(tmp + ""));
          } else if (tmp instanceof Node) {
            tmp instanceof HTMLTemplateElement && (tmp = tmp.content || tmp);
          } else {
            tmp = document.querySelector('template[id="' + tmp + '"]');
            if (tmp) {
              tmp = tmp.content || tmp;
            }
          }

          if (!tmp) {
            throw "could not render such template";
          }

          if (snapshot || snapshot === 0) {
            console.warn(
              "use-template:...; " + snapshot,
              " alpha implementation"
            );
            /** disabling this for now **/
            if (tmp.fragment) {
              /*  
              console.log(tmp);
             delete tmp.disabled
             delete tmp.fromXJSXCore
             console.log(tmp.fragment.parentNode);
           tmp.fragment.remove()
             */
              snapshot === 0 && tmp.fragment.remove();

              /*__core__.XJSXCompiler(tmp.fragment, eval)*/
              tmp.fragment = tmp.fragment.cloneNode(true);
            } else {
              tmp.fragment = document.createElement("x-fragment");
              tmp.fragment.appendChild(tmp.cloneNode(true));
              __core__.XJSXCompiler(tmp.fragment, exec);
            }
            node.putChild(tmp.fragment);
          } else {
            node.putChild(__core__.XJSXCompiler(tmp.cloneNode(true), exec));
          }
        } catch (err) {

          console.error("use-template:", e, err + "");
        }
      },
      type: METHOD,
    },
  ]);
})()