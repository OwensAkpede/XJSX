# **for-each** 
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

# **for-each Delay**
```xml
 <?for-each: [1, 2, 3], 500; value, index?>
   <p>Value: <?print: value?>, Index: <?print: index?></p>
<?end?>
```
the above code would be rendered gradually with a `500` milliseconds delay time
. this is really convenient for rendering a large data and would increase page speed


# **for-each and break**
```xml
<?for-each: [1, 2, 3]; value, index?>
   <p>Value: <?print: value?>, Index: <?print: index?></p>
<?break?>
   <h2>Here will be ignored</h2>
<?end?>
```
  This will render as:
```xml
<p>Value: 1, Index: 0</p>
<p>Value: 2, Index: 1</p>
<p>Value: 3, Index: 2</p>
<h2>Here will be ignored</h2>
```
# **for-each, break and continue**
```xml
<?for-each: [1, 2, 3]; value, index?>
   <p>Value: <?print: value?>, Index: <?print: index?></p>
<?break?>
   <h2>Here will be ignored.</h2>
<?continue?>
   <h2>Here will not <?print: value?>.</h2>
<?end?>
```
  This will render as:
```xml
<p>Value: 1, Index: 0</p>
<p>Value: 2, Index: 1</p>
<p>Value: 3, Index: 2</p>
<h2>Here will be ignored</h2>
<h2>Here will not 1.</h2>
<h2>Here will not 2.</h2>
<h2>Here will not 3.</h2>
```
# **for-each, break and continue**
```xml
<div>

  <h2>Odd Numbers:</h2>
  <div>
    <?for-each: [1, 2, 3, 4]; value, index?>
       <?if: value%2 === 1?><?print: value?><?end?> <br/>
    <?break?>
  </div>
 
  <h2>Even Numbers:</h2>
  <div>
    <?continue?>
       <?if: value%2 === 0?><?print: value?><?end?> <br/>
    <?break?>
  </div>
    <?end?>
    
</div>
```
  This will render as:
```xml
<div>
  
  <h2>Odd Numbers:</h2>
  <div>
    1 <br/>
    3 <br/>
  </div>
  
  <h2>Even Numbers:</h2>
  <div>
    2 <br/>
    4 <br/>
  </div>
    
</div>
```