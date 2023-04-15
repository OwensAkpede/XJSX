XJSX.createModule(
     "use-template",
     XJSX.METHOD,
     {
       callback: function (tmp, node, eval) {
      var e = tmp;
      tmp = eval(tmp);
      // console.log(tmp);
      if (tmp instanceof Node) {
        if (tmp instanceof HTMLTemplateElement) {
          tmp = tmp.content
        }
      } else {
        tmp = document.querySelector("template[id=\"" + tmp+"\"]");
        if (tmp) {
          tmp = tmp.content
        } else {
          // fetch
          console.log("use-template", e);
        }
      }

      if (!tmp) {
        return console.error(
          "use-template",
          "'template#" + e + "' no such template element found"
        );
      }

      tmp = tmp.cloneNode(true);
      XJSX.parseElement(tmp, eval);
      node.putChild(tmp);
    }
    });