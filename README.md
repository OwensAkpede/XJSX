# XJSX: Expressed JavaScript XHTML

Do you want to create web applications like James Bond, with maximum efficiency and minimal hassle? Look no further than XJSX! This powerful framework lets you write JavaScript directly in your HTML, making it easier to create dynamic web pages and interfaces.

## Why Choose XJSX?
XJSX offers a unique approach to web development that allows developers to write code that resembles JavaScript directly within HTML. This approach results in cleaner, more maintainable code and reduces the need for constantly switching between HTML and JavaScript, developers can focus on writing efficient code that is easier to understand, modify, and maintain. 

## XJSX syntax
XJSX is based on two simple syntax patterns. You can use either of these options to incorporate JavaScript functionality into your HTML:

A:

```
<?? keyword:parameter ??> 
```

B:

```
<!--?? keyword:parameter ??-->
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
- `use-template` – easily import and use HTML templates
- `parse-json` – quickly parse JSON data
- `print` – render dynamic content to the page

Additional keywords coming soon include:

- `event-listener` – create event listeners similar to addEventListener()
- `console-log` – log messages to the console

To use these keywords in your XJSX-enabled HTML, simply incorporate them using the pattern shown below:
```
<!--?? keyword:parameter ??-->
```
## XJSX in HTML
Ready to see XJSX in action? Here are a few examples of how you can use XJSX to create dynamic, responsive HTML pages:
 
__Notice about XJSX's Mutable Observer API Usage:__
`At present, XJSX relies on the mutable observer API to observe and parse HTML elements before they are rendered on the UI. However, in the future, XJSX will make the use of this API optional. Instead, a new method will be introduced, such as XJSX.parseElement(document.body), to allow for greater flexibility in how developers choose to work with XJSX.`


- **Print:** Use the `print` keyword to output dynamic content in your HTML. For example:

```html
<h1>
  Hello <!--?? print:"World" ??-->
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
<!--?? parse-json:jsonString ??-->
<h1>
  Welcome to <!--?? print:jsonString.name ??-->
</h1>
```
This will render as:
```html
<h1>
  Welcome to XJSX
</h1>
```

- **Use Template:** Use the `use-template` keyword to insert a template element into your HTML. For example:
```html
<template id="greeting">
  <h1>Hello World!!</h1>
</template>
<!--?? use-template:greeting ??-->
```
This will render as:
```html
<h1>Hello World!!</h1>
```

- **If/Else statements:** Use the `if`, `else-if`, `else`, and `end` keywords to conditionally render HTML based on JavaScript expressions. For example:

```html
<!--?? if: x > 0 ??-->
   <h1>X is greater than 0</h1>
<!--?? else-if: x === 0 ??-->
   <h1>X is equal to 0</h1>
<!--?? else ??-->
   <h1>X is less than 0</h1>
<!--?? end ??-->
```

- **Fetch API:** Use the `fetch`, `then`, `catch`, and `end` keywords to make API requests and handle responses. For example:
```html
<!--?? fetch:"https://jsonplaceholder.typicode.com/todos/1" ??-->
   <h1>Loading...</h1>
<!--?? then:response ??-->
   <h1><!--?? print:response.response ??--></h1>
<!--?? catch:response ??-->
   <h1>Error loading data</h1>
<!--?? end ??-->
```

- **For Each Loop:** Use the `for-each` and `end` keywords to loop over arrays and output HTML for each element. For example:
```html
<!--?? for-each:[1, 2, 3] ; value, index ??-->
   <p>Value: <!--?? print:value ??-->, Index: <!--?? print:index ??--></p>
<!--?? end ??-->
```
This will render as:
```html
<p>Value: 1, Index: 0</p>
<p>Value: 2, Index: 1</p>
<p>Value: 3, Index: 2</p>
```

## Proper Syntax for XJSX Usage
When using XJSX, it's crucial to ensure that you correctly incorporate it into an HTML tag.

Bad usage example 
```html
 <!--?? if: x > 0 ??-->
   <h1>Hello
 <!--?? else ??-->
    World</h1>
 <!--?? end ??-->
```

Good usage example 
```html
 <!--?? if: x > 0 ??-->
   <h1>Hello</h1>
 <!--?? else ??-->
    <h1>World</h1>
 <!--?? end ??-->
```

## Conclusion
XJSX is a lightweight JavaScript framework that enables developers to write HTML templates using JavaScript syntax. It provides a set of keywords that allow developers to write conditional statements, loops, and interact with the DOM API. XJSX helps to simplify HTML code and makes it more expressive, especially when dealing with dynamic data.

The framework is easy to install and use. With a simple HTML script tag, you can include XJSX in your project and start writing XJSX templates right away. Additionally, XJSX supports many of the JavaScript features that developers are already familiar with, such as template literals and JSON parsing.

Overall, XJSX is a powerful tool that can help you write cleaner, more expressive, and efficient code for your web applications.

