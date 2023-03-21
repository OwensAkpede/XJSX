
# XJSX: Expressed JavaScript XHTML


```xml



  <?if: x > y ?>
    <p>X is greater</p>
  <?else-if: x === y ?>
    <p>X and Y are equal</p>
  <?else?>
    <p>Y is greater</p>
  <?end?>



```

Do you want to create web applications like James Bond, with maximum efficiency and minimal hassle? Look no further than XJSX! This powerful framework lets you write JavaScript directly in your HTML, making it easier to create dynamic web pages and interfaces.

#### Release History

See [HISTORY.md](HISTORY.md) for a list of changes and releases.

## Why Choose XJSX?
XJSX offers a unique approach to web development that allows developers to write code that resembles JavaScript directly within HTML. This approach results in cleaner, more maintainable code and reduces the need for constantly switching between HTML and JavaScript, developers can focus on writing efficient code that is easier to understand, modify, and maintain. 

## XJSX syntax
XJSX is based on two simple syntax patterns. You can use either of these options to incorporate JavaScript functionality into your HTML:

A:

```
<?keyword: parameter?> 
```

B:

```
<!--?keyword: parameter?-->
```

Option B is recommended, as both patterns are treated as comments by HTML rendering engines.

## Installation
To start using XJSX, simply include the source file or URL in your HTML head:
```html
<html>
  <head>
    <script src="XJSX.js"></script>
  </head>
</html>
```

## XJSX Keywords

XJSX includes a range of powerful keywords that enable you to take your web development to the next level. These currently include:

- `if`, `else-if`, `else`, and `end` – create conditional statements like those in JavaScript
- `fetch`, `then`, `catch`, and `end` – access and manipulate data using the Fetch API
- `for-each` and `end` – loop through elements as in JavaScript's forEach() method
- `on` and `end` - Bind event listeners to the XJSX document
- `use-template` – easily import and use HTML templates
- `console-log` - Output messages to the console for debugging and troubleshooting purposes
- `parse-json` – quickly parse JSON data
- `print` – render dynamic content to the page
- `eval` - Evaluate a string of code at runtime and execute it within the current XJSX script
- `data` - Rerender the XJSX document in response to a specified event

Additional keywords coming soon include:

- `animate` – This feature will allow you to incorporate transition animations between rendering points

To use these keywords in your XJSX-enabled HTML, simply incorporate them using the pattern shown below:
```
<!--?keyword: parameter?-->
```
## XJSX in HTML
Ready to see XJSX in action? Here are a few examples of how you can use XJSX to create dynamic, responsive HTML pages:
 
- **Print:** Use the `print` keyword to output dynamic content in your HTML. For example:

```html
<h1>
  Hello <!--?print: "World"?-->
</h1>
```
  This will render as:
```html
<h1>
  Hello World
</h1>
```

- **Parse JSON:** Use the `parse-json` keyword to parse a JSON string into an object that can be accessed in your HTML. For example:
```html
<script>
  var jsonString = '{"name":"XJSX"}'; 
</script>
<!--?parse-json: jsonString?-->
<h1>
  Welcome to <!--?print: jsonString.name?-->
</h1>
```
  This will render as:
```html
<h1>
  Welcome to XJSX
</h1>
```

- **Console Log:** The `console-log` keyword is similar to the `console.log` function in JavaScript. It allows you to log messages to the console. For example:
```html
   <!--?console-log: "hello world!"?-->
```

- **Use Template:** Use the `use-template` keyword to insert a template element into your HTML. For example:
```html
<template id="greeting">
  <h1>Hello World!!</h1>
</template>
<!--?use-template: "greeting"?-->
```
  This will render as:
```html
<h1>Hello World!!</h1>
```

- **If/Else statements:** Use the `if`, `else-if`, `else`, and `end` keywords to conditionally render HTML based on JavaScript expressions. For example:

```html
<!--?if: x > 0 ?-->
   <h1>X is greater than 0</h1>
<!--?else-if: x === 0 ?-->
   <h1>X is equal to 0</h1>
<!--?else?-->
   <h1>X is less than 0</h1>
<!--?end?-->
```

- **Fetch API:** Use the `fetch`, `then`, `catch`, and `end` keywords to make API requests and handle responses. For example:
```html
<!--?fetch: "https://jsonplaceholder.typicode.com/todos/1" ?-->
   <h1>Loading...</h1>
<!--?then: response?-->
   <h1><!--?print: response.response?--></h1>
<!--?catch?-->
   <h1>Error loading data</h1>
<!--?end?-->
```

- **For Each Loop:** Use the `for-each` and `end` keywords to loop over arrays and output HTML for each element. For example:
```html
<!--?for-each: [1, 2, 3]; value, index?-->
   <p>Value: <!--?print: value?-->, Index: <!--?print: index?--></p>
<!--?? end ??-->
```
  This will render as:
```html
<p>Value: 1, Index: 0</p>
<p>Value: 2, Index: 1</p>
<p>Value: 3, Index: 2</p>
```

- **Event Listener:** The `on` and `end` keyword is used to add event listeners to the document. Here's an example:
```html
<!--?on: "load"?-->
   <p>Page loaded!</p>
<!--?end?-->
```
  In the above example, we're using the `on` keyword to add an event listener for the "load" event of the document. When the page is loaded, the XJSX element containing the "Page loaded!" message will be rendered

- **Data:** The `data` keyword is used to listen for events and update the XJSX element when the event is emitted. Here's an example:
```html
 <script>
   var emit = XJSX.event.emit;
   emit("data/name", "Elon Musk");
 </script>

   <h1> <!--?data: "name"?--> </h1>

```
  This will render as:
```html
   
   <h1> Elon Musk  </h1>

```
  In this example, the XJSX element will rerender every time the "data/name" event is emitted


- **Eval:** The `eval` keyword is used to evaluate JavaScript code in an XJSX document, similar to the `eval()` function in JavaScript. Here's an example:
```html
   <!--?eval: "var x=10;"?-->
```
  In the above example, we're using the `eval` keyword to create a variable x with the value of 10.

## Proper Syntax for XJSX Usage
When using XJSX, it's crucial to ensure that you correctly incorporate it into an HTML tag.

Wrong:
```html
 <!--?if: x > 0 ?-->
   <h1>Hello
 <!--?else?-->
    World</h1>
 <!--?end?-->
```

Right:
```html
 <!--?if: x > 0 ?-->
   <h1>Hello</h1>
 <!--?else?-->
    <h1>World</h1>
 <!--?end?-->
```

## window.XJSX object
The XJSX global object is a JavaScript object that has been added to the XJSX library to provide additional functionality to the developers using it. The object is defined as window.XJSX and it has several properties and methods that can be accessed and used by the developer in their code.
```javascript

  console.log(window.XJSX);

```

Here's an overview of some of the properties and methods available on the XJSX global object:

- **FUNCTION**, **METHOD**, **KEYWORD**, **MKEYWORD**
These are integer values used as identifiers for different types of modules. FUNCTION is used for regular functions, METHOD is used for object methods, KEYWORD is used for standalone keywords, and MKEYWORD is used for keywords that require a method call. You can use these constants with the createModule method to specify the type of module that you want to create.
```javascript
{
KEYWORD: <Integer>,
MKEYWORD: <Integer>,
METHOD: <Integer>,
FUNCTION: <Integer>
}
```
### FUNCTION 
 Used for regular functions (enclosed with the `end` keyword). Examples are `fetch`, `for-each` and `on`
### METHOD
 Used for outputting data (not enclosed with the `end` keyword). Examples are `print`, `parse-jsom`, `console-log`, `eval`, `use-template` and `data`
### KEYWORD
 Used for standalone operations (enclosed with the `end` keyword). Examples are `if`
### MKEYWORD
 Used for micro operations (not enclosed with the `end` keyword). Examples are `end`

- **parseXJSXParameter** This is a method that parses an XJSX parameter string (e.g. "arg1;arg2,arg3") and returns an object with the arguments and parameter values. This method is used internally by XJSX to parse parameters, but you can also use it if you need to parse a parameter string manually.
```html

  <!--?keyword: arg1; arg2, arg3?-->

```
```javascript
var param = window.XJSX.parseXJSXParameter("arg1; arg2, arg3");

console.log(param.arguments); // ["arg2", "arg3"]
console.log(param.parameter); // ["arg1"]
```

- **event** This is an object that contains methods for working with XJSX events. You can use the **emit** method to trigger an event, and the **on** method to register a callback function to be called when the event is triggered.
```javascript
// Register a callback function for the "myEvent" event
window.XJSX.event.on("myEvent", function() {
  console.log("myEvent callback called");
});

// Trigger the "myEvent" event
window.XJSX.event.emit("myEvent");
```

- **parseElement** this is a method that takes a DOM node and an optional eval function as arguments, and compiles any XJSX expressions inside the node. The method returns true if any expressions were compiled, and false otherwise.
```html
<div id="node">
<h1><!--?print: "Hello World"?--></h1>
</div>
```
```javascript
XJSX.parseElement(node);
console.log(node.innerText); //Hello World
```

- **createModule** This function is used to create new XJSX modules (keyword), and takes three arguments: `name`, `type`, and `object`. `name` is a string that defines the name of the module, `type` is an integer that specifies the module type (using the **FUNCTION**, **METHOD**, **KEYWORD**, or **MKEYWORD** constants), and `object` is an object that contains the module's `onload`, `onprogress`, and `callback` functions. The createModule function returns an object with two functions, `append` and `end`. `append` is used to add additional modules to the current one, and `end` is used to finalize the module and create it.
```javascript
// Create a new function module
var myFuncModule = window.XJSX.createModule("myFuncModule", window.XJSX.FUNCTION, {
  onload: function() {
    console.log(this);
    console.log("myFuncModule loaded");
  },
  onprogress: function() {
  
    console.log(this);


  }
  callback: function() {
    console.log(this);
    console.log("myFuncModule callback called");
  }
});

// Create a new keyword module
var myKeywordModule = window.XJSX.createModule("myKeywordModule", window.XJSX.KEYWORD, {
  onload: function() {
    console.log("myKeywordModule loaded");
  },
  callback: function() {
    console.log("myKeywordModule callback called");
  }
});

// Create a new method module
var myMethodModule = window.XJSX.createModule("myMethodModule", window.XJSX.METHOD, {
  onload: function() {
    console.log("myMethodModule loaded");
  },
  callback: function() {
    console.log("myMethodModule callback called");
  }
});

```

## XJSX vs. React JSX
Xjsx is a framework that allows you to write JavaScript-like code in your HTML files. It's a reverse version of JSX, which lets you write HTML-like code in your JavaScript files. Xjsx can help simplify your code and make it more readable by keeping all the logic in one place.

## Conclusion
XJSX is a lightweight JavaScript framework that enables developers to write HTML templates using JavaScript syntax. It provides a set of keywords that allow developers to write conditional statements, loops, and interact with the DOM API. XJSX helps to simplify HTML code and makes it more expressive, especially when dealing with dynamic data.

The framework is easy to install and use. With a simple HTML script tag, you can include XJSX in your project and start writing XJSX templates right away. Additionally, XJSX supports many of the JavaScript features that developers are already familiar with, such as template literals and JSON parsing.

Overall, XJSX is a powerful tool that can help you write cleaner, more expressive, and efficient code for your web applications.

## Some XJSX jokes 
- Why did the developer use XJSX for their project?
Because they wanted to write JavaScript without all the drama!
- Why did the developer switch to XJSX? 
Because they were tired of constantly switching between HTML and JavaScript!

## License

This project is licensed under the [ GPL-3.0 License](LICENSE).



