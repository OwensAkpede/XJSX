
# XJSX: Expressed JavaScript XHTML


```xml



  <?if: x%2 === 0 ?>
    <p>X is an Even number</p>
  <?else-if: x%2 === 1 ?>
    <p>X is an Odd number</p>
  <?else?>
    <p>Neither condition was true</p>
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

```xml
<?keyword: parameter?> 
```

B:

```txt
<!--?keyword: parameter?-->
```

[Option B](advance/README.B.md) is also recommended, as both patterns are treated as comments by HTML rendering engines.

## Installation
To start using XJSX, simply include the [source file or URL](https://owens94819.github.io/XJSX/release/beta/xjsx.0.0.9.js) in your HTML head:
```xml
<html>
  <head>
    <script src="xjsx.js"></script>
  </head>
</html>
```
 ***Download XJSX  [`here`](https://owens94819.github.io/XJSX/release/beta/xjsx.0.0.9.js)***

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

<!--
Additional keywords coming soon include:

 `animate` – This feature will allow you to incorporate transition animations between rendering points
-->
To use these keywords in your XJSX-enabled HTML, simply incorporate them using the pattern shown below:
```xml
<?keyword: parameter?>
```
## XJSX in HTML
Ready to see XJSX in action? Here are a few examples of how you can use XJSX to create dynamic, responsive HTML pages:
 
### **Print:** 
Use the `print` keyword to output dynamic content in your HTML. For example:

```xml
<h1>
  Hello <?print: "World"?>
</h1>
```
  This will render as:
```xml
<h1>
  Hello World
</h1>
```

### **Parse JSON:** 
Use the `parse-json` keyword to parse a JSON string into an object that can be accessed in your HTML. For example:
```xml
<script>
  var jsonString = '{"name":"XJSX"}'; 
</script>
<?parse-json: jsonString?>
<h1>
  Welcome to <?print: jsonString.name?>
</h1>
```
  This will render as:
```xml
<h1>
  Welcome to XJSX
</h1>
```

### **Console Log:** 
The `console-log` keyword is similar to the `console.log` function in JavaScript. It allows you to log messages to the console. For example:
```xml
   <?console-log: "hello world!"?>
```

### **Use Template:** 
Use the `use-template` keyword to insert a template element into your HTML. For example:
```xml
<template id="greeting">
  <h1>Hello World!!</h1>
</template>
<?use-template: "greeting"?>
```
  This will render as:
```xml
<h1>Hello World!!</h1>
```

### **If/Else statements:** 
Use the `if`, `else-if`, `else`, and `end` keywords to conditionally render HTML based on JavaScript expressions. For example:

```xml
<?if: x < 0 ?>
   <h1>X is lesser than 0</h1>
<?else-if: x === 0 ?>
   <h1>X is equal to 0</h1>
<?else?>
   <h1>Neither condition was true</h1>
<?end?>
```

### **Fetch API:** 
Use the `fetch`, `then`, `catch`, and `end` keywords to make API requests and handle responses. For example:
```xml
<?fetch: "https://jsonplaceholder.typicode.com/todos/1" ?>
   <h1>Loading...</h1>
<?then: response?>
   <h1><?print: response?></h1>
<?catch?>
   <h1>Error loading data</h1>
<?end?>
```

### **For Each Loop:** 
Use the `for-each` and `end` keywords to loop over arrays and output HTML for each element. For example:
```xml
<?for-each: [1, 2, 3]; value, index?>
   <p>Value: <?print: value?>, Index: <?print: index?></p>
<?end?>
```
  This will render as:
```xml
<p>Value: 1, Index: 0</p>
<p>Value: 2, Index: 1</p>
<p>Value: 3, Index: 2</p>
``` 
 refer [`here`](advance/FOR-EACH.README.md) for the complete doc.
### **Event Listener:** 
The `on` and `end` keyword is used to add event listeners to the document. Here's an example:
```xml
<?on: "load"?>
   <p>Page loaded!</p>
<?end?>
```
  In the above example, we're using the `on` keyword to add an event listener for the "load" event of the document. When the page is loaded, the XJSX element containing the "Page loaded!" message will be rendered

### **Data:** 
The `data` keyword is used to listen for events and update the XJSX element when the event is emitted. Here's an example:
```xml
 <script>
   var emit = XJSX.event.emit;
   emit("data/name", "Elon Musk");
 </script>

   <h1> <?data: "name"?> </h1>

```
  This will render as:
```xml
   
   <h1> Elon Musk  </h1>

```
  In this example, the XJSX element will rerender every time the "data/name" event is emitted


### **Eval:** 
The `eval` keyword is used to evaluate JavaScript code in an XJSX document, similar to the `eval()` function in JavaScript. Here's an example:
```xml
   <?eval: "var x=10;"?>
```
  In the above example, we're using the `eval` keyword to create a variable x with the value of 10.

## Proper Syntax for XJSX Usage
When using XJSX, it's crucial to ensure that you correctly incorporate it into an HTML tag.

Wrong:
```xml
 <?if: x > 0 ?>
   <h1>Hello
 <?else?>
    World</h1>
 <?end?>
```

Right:
```xml
 <?if: x > 0 ?>
   <h1>Hello</h1>
 <?else?>
    <h1>World</h1>
 <?end?>
```

## window.XJSX object
The XJSX global object is a JavaScript object that has been added to the XJSX library to provide additional functionality to the developers using it. The object is defined as window.XJSX and it has several properties and methods that can be accessed and used by the developer in their code.
```javascript

  console.log(window.XJSX);

``` 
Read more about it [here](module/README.md#windowxjsx)


## XJSX vs. React JSX
Xjsx is a framework that allows you to write JavaScript-like code in your HTML files. It's a reverse version of JSX, which lets you write HTML-like code in your JavaScript files. Xjsx can help simplify your code and make it more readable by keeping all the logic in one place.

## Demo
refer the following repo [https://github.com/Owens94819/XJSX-DEMO](https://github.com/Owens94819/XJSX-DEMO)

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



