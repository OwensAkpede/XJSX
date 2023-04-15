# window.XJSX
The XJSX global object is a JavaScript object that has been added to the XJSX library to provide additional functionality to the developers using it. The object is defined as window.XJSX and it has several properties and methods that can be accessed and used by the developer in their code.
```javascript

  console.log(window.XJSX);

```

Here's an overview of some of the properties and methods available on the XJSX global object:

## **FUNCTION**, **METHOD**, **KEYWORD**, **MKEYWORD**
These are integer values used as identifiers for different types of modules. FUNCTION is used for regular functions, METHOD is used for object methods, KEYWORD is used for standalone keywords, and MKEYWORD is used for keywords that require a method call. You can use these constants with the createModule method to specify the type of module that you want to create.
```javascript
{
KEYWORD: <number>,
MKEYWORD: <number>,
METHOD: <number>,
FUNCTION: <number>
}
```

### **FUNCTION**
 Used for regular functions (enclosed with the `end` keyword). Examples are `fetch`, `for-each` and `on`

### **METHOD**
 Used for outputting data (not enclosed with the `end` keyword). Examples are `print`, `parse-jsom`, `console-log`, `eval`, `use-template` and `data`

### **KEYWORD**
 Used for standalone operations (enclosed with the `end` keyword). Examples are `if`

### **MKEYWORD**
 Used for micro operations (not enclosed with the `end` keyword). Examples are `end`

## **parseXJSXParameter** 
This is a method that parses an XJSX parameter string (e.g. "arg1;arg2,arg3") and returns an object with the arguments and parameter values. This method is used internally by XJSX to parse parameters, but you can also use it if you need to parse a parameter string manually.
```xml

  <?keyword: arg1; arg2, arg3?>

```
```javascript
var param = window.XJSX.parseXJSXParameter("arg1; arg2, arg3");

console.log(param.arguments); // ["arg2", "arg3"]
console.log(param.parameter); // ["arg1"]
```

## **event** 
This is an object that contains methods for working with XJSX events. You can use the **emit** method to trigger an event, and the **on** method to register a callback function to be called when the event is triggered.
```javascript
// Register a callback function for the "myEvent" event
window.XJSX.event.on("myEvent", function() {
  console.log("myEvent callback called");
});

// Trigger the "myEvent" event
window.XJSX.event.emit("myEvent");
```

## **parseElement** 
This is a method that takes a DOM node and an optional eval function as arguments, and compiles any XJSX expressions inside the node. The method returns true if any expressions were compiled, and false otherwise.
```xml
<div id="node">
<h1><?print: "Hello World"?></h1>
</div>
```
```javascript
XJSX.parseElement(node);
console.log(node.innerText); //Hello World
```

## **createModule** 
This function is used to create new XJSX modules (keyword), and takes three arguments: `name`, `type`, and `object`. `name` is a string that defines the name of the module, `type` is an integer that specifies the module type (using the **XJSX.FUNCTION**, **XJSX.METHOD**, **XJSX.KEYWORD**, or **XJSX.MKEYWORD** constants), and `object` is an object that contains the module's `onload`, `onprogress`, and `callback` functions. The createModule function returns an object with two functions, `append` and `end`. `append` is used to add additional modules to the current one, and `end` is used to finalize the module and create it.

[see more examples here](../module)

```javascript

// Create a new function module
var myFuncModule = window.XJSX.createModule("myFuncModule", window.XJSX.FUNCTION, {
  onload: function(parameter) {
    console.log(this);
    console.log("myFuncModule loaded");
  },
  onprogress: function(parameter) {
    console.log(this);
  },
  callback: function(parameter) {
    console.log(this);
    console.log("myFuncModule callback called");
  }
}).end();


// Create a new keyword module
var myKeywordModule = window.XJSX.createModule("myKeywordModule", window.XJSX.KEYWORD, {
  onload: function(parameter) {
    console.log(this);
    console.log("myKeywordModule loaded");
  },
  onprogress: function(parameter) {
    console.log(this);
  },
  callback: function(parameter) {
    console.log(this)
    console.log("myKeywordModule callback called");
  }
}).end();


// Create a new method module
var myMethodModule = window.XJSX.createModule("myMethodModule", window.XJSX.METHOD, {
  callback: function(parameter, node, eval) {
    console.log("myMethodModule callback called");
  }
});
//not necessarily to call the end method here

```

you can then use in your html:
```xml

<?myFunctionModule: "something"?>
  <b>Hello function</b>
<?end?>

<?myKeywordModule: "something"?>
  <b>Hello keyword</b>
<?end?>

<?myMethodModule: "something"?>

```