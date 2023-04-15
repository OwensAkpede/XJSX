

  /** use-template √ **/
  XJSX.__createModule__([
    {
      keyword: "use-template",
      _trusted: true,
      callback: function (tmp, node, exec) {
        var e = tmp;
        var snapshot;

        try {
          (tmp = exec("[" + e + "]")), (snapshot = tmp[1]), (tmp = tmp[0]);

          if (tmp instanceof Node) {
            tmp instanceof HTMLTemplateElement && (tmp = tmp.content);
          } else {
            tmp = document.querySelector('template[id="' + tmp + '"]') || tmp;
            if (tmp instanceof Node) {
              tmp = tmp.content;
            } else {
              console.warn("alpha implementation ");
              tmp = XJSX.customTemplates[tmp];
              /*** promise **/
              tmp instanceof HTMLTemplateElement && (tmp = tmp.content);
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

          if (snapshot || snapshot === 0) {
            console.warn(
              "use-template:...; " + snapshot,
              " alpha implementation"
            );
            /** disabling this for now **/
            if (tmp.fragment) {
              /*  
              console.log(tmp);
             delete tmp._removed
             delete tmp.fromXJSXCore
             console.log(tmp.fragment.parentNode);
           tmp.fragment.remove()
             */
              snapshot === 0 && tmp.fragment.remove();
              //   console.log(snapshot);
              /*XJSX.parseElement(tmp.fragment, eval)*/
              tmp.fragment = tmp.fragment.cloneNode(true);
            } else {
              tmp.fragment = document.createElement("x-fragment");
              tmp.fragment.appendChild(tmp.cloneNode(true));
              XJSX.parseElement(tmp.fragment, exec);
            }
            node.putChild(tmp.fragment);
          } else {
            node.putChild(XJSX.parseElement(tmp.cloneNode(true), exec));
          }
        } catch (err) {
          // console.log(err);
          console.error("use-template:", e, err + "");
        }
      },
      type:  "method",
    },
  ]);
