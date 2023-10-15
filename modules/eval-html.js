(function() {
var __core__=XJSX.__XJSXCORE__();
  var KEYWORD = 0xC;
  
  /** eval-html **/
  __core__.createModule([
    {
      keyword: "eval-html",
      type: KEYWORD,
      onprogress: function () {
        this.disable();
      },
      callback: function () {
        try {
        var str = "";
        var self = this;
        this.forEach(function(e){
          str+=e.getAllTextContent();
        });
      var doc = document.createElement("span")
      console.log(str);
      str = eval("`"+str.replaceAll("`","\\`")+"`")
      doc.innerHTML=str
      str = void 0;
      this.putChild(doc.childNodes);
      doc = void 0;
        } catch (e) {
          console.log("eval-html:",e);
        }
      }
    }
  ])
})()