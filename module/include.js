
var domParser_node;
var domParser= function() {
   var d = domParser_node || (domParser_node=document.createElement("span"));
   d.innerHTML = arguments[0];
   return d;
 }
 

  /** include**/
  XJSX.__createModule__([
    {
      keyword: "include",
      callback: function(url) {
        var url;
        try {
          if (!(url = this.eval("[" + url + "][0]"))) {
            throw "'" + url + "'" + " is not a valid argument";
          }

          var self = this;
          /*XRequest(url,function() {
          
          self.putChild(XJSX.parseElement(domParser(arguments[0]),self.eval).childNodes)
        },true)*/

          var http = new XMLHttpRequest();
          self.global.http = http;
          http.addEventListener("load", function() {
            /*if (!http.response) {
            dispatcher(http,"error")
            console.error(url+"\npath could not be included"+"\nmake sure the provided url is a valid html file")
            return 
          }
          */

            self.putChild(
              XJSX.parseElement(
                domParser(http.response, http.abort()),
                self.eval
              ).childNodes
            );
          });
          //http.responseType="text"
          http.open("get", url);
          http.send();
        } catch (e) {
          console.error("include:", url, e);
        }
      },
      type: "function",
    },
    {
      keyword: "catch",
      onload: function() {
        this.killProcess();
      },
      onprogress: function() {
        this.disable();
      },
      callback: function() {
        var self = this;
        var doc = document.createDocumentFragment();
        this.appendAllTo(doc);

        if (!self.global.http) {
          self.putChild(XJSX.parseElement(doc, self.eval));
          console.error(self.parentParams.join(":"), "uncaught error");
          return;
        }
        self.global.http.addEventListener("error", function() {
          //    console.error(arguments[0]);
          self.putChild(XJSX.parseElement(doc, self.eval));
          this.abort();
          delete self.global.http;
        });
      },
    },
  ]);