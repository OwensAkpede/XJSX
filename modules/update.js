(function () {
  var __core__ = XJSX.__XJSXCORE__();
  var METHOD = 0xB;
  /** update √ **/
  __core__.createModule([
    {
      keyword: "update",
      callback: function (arg, node, exec) {
        try {
const oldValue = {
  myVariable: exec("["+e+"][0]"),
};
      node.putChild(oldValue.myVariable);

const handler = {
  set(obj, prop, value) {
    if (obj[prop] !== value) {

      console.log(`${prop} changed from ${obj[prop]} to ${value}`);

      node.putChild(value);
          obj[prop] = value;

    } else {
    console.log(`${prop} : ${obj[prop]} == ${value}`);

    }

    return true;
  },
};

function update(){
  

const proxiedObject = new Proxy(oldValue, handler);
proxiedObject.myVariable = exec("[" + e + "][0]");


  return requestAnimationFrame(update);
}

update()
        } catch (err) {
          console.error("Update:", arg, err + "");
        }
      },
      type: METHOD,
    },
  ]);
})()
