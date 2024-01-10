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
            routeritem.push({routes:this.global.router.split("'").join('').trim(),dom: this.dom()})
            var oldhash = location.hash === ''? '/': '/'+location.hash;
            let self = this;
          
              
          let oldrouter =   routeritem.filter((e)=>{
      
                if(e.routes === oldhash ){
                  return e;
                
              }
            
              })
          let errorrouter =   routeritem.filter((e)=>{
      
                if(e.routes === '' || e.routes === '*'){
                  return e;
                
              }
            
              })
              if(oldrouter.length === 0 && errorrouter.length === 0){
                this.putChild('')
              }else if(oldrouter.length === 0 && errorrouter.length > 0){
                errorrouter.map((e)=>{
                  self.putChild(e.dom[0])
                })
              }
              else{

                oldrouter.map((e)=>{
                  self.putChild(e.dom[0])
                })
              }
              
            
          window.onhashchange = function(s){
            let newRout = '/'+s.newURL.split('').splice(s.newURL.split('').indexOf('#'),s.newURL.split('').length -1).join('')
                    let newRouter = routeritem.filter((e)=>{
                      if(e.routes === newRout){
                      
                        return e;
                      }else{
                      }
                    })

                    if(newRouter.length === 0 && errorrouter.length === 0){
                      self.putChild('')
                    }else if(newRouter.length === 0 && errorrouter.length > 0){
                      errorrouter.map((e)=>{
                        self.putChild(e.dom[0])
                      })
                    }
                    else{
      
                      newRouter.map((e)=>{
                        self.putChild(e.dom[0])
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
