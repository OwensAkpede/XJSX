`here is the complete guard to understanding the XJSX pattern`

# XJSX Modules
To use the available keywords in your XJSX-enabled HTML, simply incorporate them using the pattern shown below:
```xml
<?keyword: parameter?>
```

## XJSX Modules / Keyword
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
### **Update:** 

Use the `update` keyword to update the variable value anything variable is changed by any event.
```xml
<script>
  let variable = "Hello World";
  let button = document.querySelector("button");
  button.onclick = function (){
  if(variable == "Hello World"){
  
  variable = "Changed";
  }else{
  variable = "Hello World";
  
  }
  }
</script>

<?update: variable ?>

<button>click me to change variable value</button>

```
or 

```xml
<script>
  let variable = "Hello World";
  function Function(e) {
      let input =  e;    

    variable = input.value;

  }
</script>

<input onkeyup="Function(this)" value="Hello World"/>
<?update: variable ?>
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
<?if: x % 1 === 1 ?>
   <h1>X is probably an Odd number</h1>
<?else-if: x % 1 === 0 ?>
   <h1>X is probably an Even number</h1>
<?else?>
   <h1>Neither condition was true</h1>
<?end?>
```

### **Fetch API:** 
Use the `fetch`, `then`, `catch`, and `end` keywords to make API requests and handle responses. For example:
```xml
<script>
  const url = "https://jsonplaceholder.typicode.com/todos/1";
</script>

<?fetch: url ?>
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
 refer [`here`](../advance/FOR-EACH.README.md) for the complete doc.

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
  
### **Use Effect:** 
```xml
<?use-effect: name ?> 
```
  documentation still in progress...

### **Print Html:** 
```xml
<?print-html: value ?> 
```
due to the DOM structure the below example is advise:
```xml
 <!--?print-html: value ?-->
```

The `print-html` keyword on like the `print` keyword, convert the provided value
to an html case . Here's an example:
```xml
 <!--?print-html: "<h1>hello world</h1>" ?-->
```

This will render as:
```xml
    <h1>hello world</h1>
```
***note:*** the value will be rendered as plain html and not xjsx format thus,
making it stricter and secure

### **Include:** 
```xml
<?include: file_path?> 
 <!--pending-->
<?catch?> 
 <!--err-->
<?end?>
```

The `include` keyword is used to import external template into the project. Here's an example:
```xml
 <?include: "./header.html" ?>
  <h1> Loading header </h1>
 <?catch?>
  <h1> An error occurred while loading header.html </h1>
 <?end?>
```

in this example, after the request is ready and everything is correct, the
`header.html` will be rendered in,
else the catch scope will be rendered

### **Html Element:** 
```xml
<?html-element: element_name, options; argument ?> <?end?>
```

The `html-element` keyword is used to create an html element. Here's an example:
```xml
 <?html-element: "div", {class: "head"} ?>
  <h1> hello world! </h1>
 <?end?>
 
 <?html-element: "input", {name: "ipt", value: "hello"} ; node ?>
  <?eval: node.value += " world" ?>
 <?end?>
```

  This will render as:
```xml
   <div class="head">
     <h1> hello world! </h1>
   </div>
   
   <input name="ipt" value="hello world" />
```
  
### **Function:** 
```xml
<?function: function_name, ...parameters ?>
```

The `Function` keyword is used to fire a javascript function which could return
a value. Here's an example:
```xml
 <script>
   function foo(eval, arg){
    alert("hello");
    return "hello world " + eval(arg);
   }
   function foo2(eval, arg){
    alert("hello2");
    const elem = document.createElement("button");
    elem.innerHTML = arg;
    return elem;
   }
   function foo3(eval, arg1, arg2, arg3){
    alert("hello3");
    return arg1 +"-"+ arg2 +"-"+ arg3;
   }
 </script>
  <h1> <?function: "foo", "1+1"?> </h1>
  <div> <?function: "foo2", "some param"?> </div>
  <h1> <?function: "foo3", "10", "20", "30"?> </h1>
```

  This will render as:
```xml
   <h1> hello world 2 </h1>
   <div> <button>some param</button> </div>
   <h1> 10-20-30 </h1>
```
  In this example, the function specified was called and the value returned
  where outputted
  
### **Var:** 
```xml
 <?var: variable_name = value ?>
```
The `var` keyword is used to create a JavaScript variable within it scope. Here's an example:
```xml
   <?var: x = "hello"?>
   <h1> <?print: x + " world" ?> </h1>
```
This will render as:
```xml
   <h1> hello world </h1>
```
  In the above example, we're using the `var` keyword to create a variable x
  with the value of "hello".
  
### **Update:** 
```xml
<?update: variable_name ?> 
```
  documentation still in progress...
