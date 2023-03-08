# XJSX: Expressed JavaScript XHTML

Do you want to create web applications like James Bond, with maximum efficiency and minimal hassle? Look no further than XJSX! This powerful framework lets you write JavaScript directly in your HTML, making it easier to create dynamic web pages and interfaces.

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


- **print**

```html
<h1>
  Hello <!--?? print:"App" ??-->
</h1>
```

- **parse-json**

```html
<script>
  var jsonString = '{"name":"XJSX"}';
</script>
 <!--?? parse-json:jsonString ??-->
<h1>
  <!--?? print:jsonString.name ??-->
</h1>
```

- **use-template**

```html
<template id="app">
  <h1>Hello App!!</h1>
</template>

<!--?? use-template:app ??-->
```

- **if**

```html
<!--?? if:true ??-->
   <h1>Hurray!!.</h1>
<!--?? end ??-->
```

- **if**,**else**

```html
<!--?? if:false ??-->
   <h1>If!!.</h1>
<!--?? else ??-->
   <h1>Else!!.</h1>
<!--?? end ??-->
```

- **if**,**else-if**

```html
<!--?? if:false ??-->
   <h1>If!!.</h1>
<!--?? else-if:true ??-->
   <h1>Else If (1)!!.</h1>
<!--?? else-if:false ??-->
   <h1>Else If (2)!!.</h1>
<!--?? end ??-->
```

- **if**,**else-if**,**else**

```html
<!--?? if:false ??-->
   <h1>If!!.</h1>
<!--?? else-if:false ??-->
   <h1>Else If (1)!!.</h1>
<!--?? else-if:false ??-->
   <h1>Else If (2)!!.</h1>
<!--?? else??-->
   <h1>Else!!.</h1>
<!--?? end ??-->
```

- **fetch**,**then**

```html
<!--?? fetch:"data.txt" ??-->
   <h1>Fetching...</h1>
<!--?? then:response ??-->
   Hello <!--?? print:response.response ??-->
<!--?? end ??-->
```

- **fetch**,**then**,**catch**

```html
<!--?? fetch:"data.txt" ??-->
   <h1>Fetching...</h1>
<!--?? then:response ??-->
   Hello <!--?? print:response.response ??-->
<!--?? catch:response ??-->
   <h1>Error.</h1>
<!--?? end ??-->
```

- **for-Each**

```html
<!--?? for-each:[1,2,3,4]; value, prop ??-->
   Hello <!--?? print:value ??-->
<!--?? end ??-->
```
