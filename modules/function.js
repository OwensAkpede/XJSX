(function () {
    var __core__ = XJSX.__XJSXCORE__();
    var METHOD = 0xB;
    /** function √ **/
    __core__.createModule([
        {
            keyword: "function",
            callback: function (e, node, exec) {
                var param = __core__.parseParameter(e).parameter[0];
                try {
                    var arg = "";
                    for (var i = 0; i < param.length; i++) {
                        if (param[i]===",") {
                            break
                        }
                        arg += param[i]
                    }

                    param = param.substring(i+1)
                    arg=exec(arg)
                    
                    param = exec("["+param+"]")
                    var foo = window[arg]

                    arg=""

                    if (typeof foo === "function") {
                        for (var i = 0; i < param.length; i++) {
                            arg+="param["+i+"]";
                            !(i+1===param.length)&&(arg+=", ")
                        }
                        arg = eval("foo(exec, "+arg+")")
                    }
                    if (arg) {
                        node.putChild(arg)
                    }

                    arg=void 0;

                } catch (err) {
                    console.error("function:", e, err + "");
                }
                e = void 0;
                param = void 0;
            },
            type: METHOD,
        },
    ]);
})()