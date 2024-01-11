(function() {
  var __core__ = XJSX.__XJSXCORE__();
  var FUNCTION = 0xC;
  let routeritem = [];
    /** print √ **/
    __core__.createModule([
      {
        keyword: "xjsx-router",
        onload:function(arg,node){
          let router;
        [this.global.router = router = arg]
        
        },
        onprogress:function(arg,node){
          
        },
        callback: function(e, node, exec) {

          try {
            routeritem.push({routes:this.global.router.split("'").join('').split('"').join("").split("`").join("").trim(),dom: this.dom()})
            var oldhash = location.hash === ''? '/': '/'+location.hash;
            let self = this;
              
          let oldrouter =   routeritem.filter((e)=>{
      
                if(e.routes=== oldhash ){
                  return e;
              }

              })
          let errorrouter = function (rout){ 
         return routeritem.filter((e)=>{
      
                if(rout !== "" && e.routes === '' || e.routes === '*'){
                  return e;
                
              }
            
              })
          }
              if(oldrouter.length === 0 && errorrouter(oldhash).length === 0){
                this.putChild('')
              }else if(oldrouter.length === 0 && errorrouter(oldhash).length > 0){
                errorrouter(oldhash).map((e)=>{
                       var doc = document.createDocumentFragment();
           
                  e.dom.map(d => {
                      doc.append(d)  

        
                              })                          
                  self.putChild(doc)
  
                })
              }
              else{
                oldrouter.map((e)=>{
                var doc = document.createDocumentFragment();

                      e.dom.map(d => {
                  doc.append(d)  
         
                      
                                              })     
                  self.putChild(doc)

                })
              }
              
            
          window.onhashchange = function(s){
            let newRout = s.newURL.split('').indexOf("#") === -1?'/': '/'+s.newURL.split('').splice(s.newURL.split('').indexOf('#'),s.newURL.split('').length  - 2).join('');
                    let newRouter = routeritem.filter((e)=>{
                      if(e.routes === newRout){
                      
                        return e;
                      }else{
                      }
                    })

                    if(newRouter.length === 0 && errorrouter(newRout).length === 0){
                      self.putChild('')
                    }else if(newRouter.length === 0 && errorrouter(newRout).length > 0){
                      errorrouter(newRout).map((e)=>{
                          var doc = document.createDocumentFragment();
             
                        e.dom.map(d=>{
                                      doc.append(d)  

                        })
                                       self.putChild(doc)
         
                      })
                    }
                    else{
      
                      newRouter.map((e)=>{
                                           var doc = document.createDocumentFragment();

                                         e.dom.map(d => {
                                        doc.append(d)  
                                                })
                                                   self.putChild(doc)
                                    
                      })
                    }

          }
          
          } catch (err) {
            console.error("router:", e, err + "");
            e = "";
          }
        },
        type: FUNCTION,
      },
    ]);
  })()  
