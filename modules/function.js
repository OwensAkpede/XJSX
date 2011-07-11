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

                    var name = "";
                    for (var i = 0; i < param.length; i++) {
                        if (param[i]===",") {
                            break
                        }
                        name += param[i]
                    }

                    param = param.substring(i+1)
                    name=exec(name)
                    param = exec("["+param+"]")
                    var foo = window[name]

                    name=""
                    if (typeof foo === "function") {
                        for (var i = 0; i < param.length; i++) {
                            name+="param["+i+"]";
                            !(i+1===param.length)&&(name+=", ")
                        }
                        name = eval("foo(exec, "+name+")")
                    }
                    if (name) {
                        node.putChild(name)
                    }
                    name=void 0;
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