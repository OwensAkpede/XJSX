# XJSX (Expressed JavaScript XHTML)

**Motto:** `bringing James Bond to HTML`😎.

**note**
`by default this framework uses the DOM MutationObserver api to parse through elements🤫`

## syntax

A:

```html
<?? keyword:parameter ??>
```

B:

```html
<!--?? keyword:parameter ??-->
```

Due to the HTML standards we recommend example B,
since both examples
are rendered as comments in the HTML runtime.

## install

get the XJSX source file/url

```html
<html>
  <head>
    <script src="XJSX.js"></script>
  </head>
</html>
```

## XJSX Keywords

here are the list of keywords or methods currently available:

- `if` - `else-if` - `else` - `end` just like the JavaScript if statement
- `fetch` - `then` - `catch` - `end` just like the JavaScript fetch api
- `for-each` - `end` just like the JavaScript forEach method
- `use-template` ...
- `parse-json` just like the JavaScript JSON.parse method
- `print` just like the JavaScript document.writeln method, but better

keywords coming soon:

- `event-listener` just like the addEventListener

```html
<!--?? event-listener:load ??-->
    <h1>triggered if called</h1>
<!--?? end ??-->
```

- `console-log` just like console.log

```html
<!--?? console-log:"hello app" ??-->
```

**note** in the future the above keywords may change `"in the future!!"`.

## XJSX In HTML

**reminder** XJSX stands for Expressed JavaScript XHTML.

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
