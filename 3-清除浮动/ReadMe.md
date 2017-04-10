> `float` 属性

对 `div` 使用 `float` 属性之后，该 `div` 会脱离文档流，向左或右浮动,直到碰到父元素或者另一个浮动的元素, 父级盒子的高度就会轰塌。

> 清除浮动

* `clear` 清除浮动
```html
<div class="wrapper">
  <div class="box"></div>
  <div class="box"></div>
  <div style="clearfix"></div>
</div>
```
```css
.clearfix {
  clear: both;
}
```
现代浏览器
```css 
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
```
支持IE6/7
```css 
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
clearfix {
  *zoom: 1;
}
```
解决现代浏览器上边距折叠问题
```css 
.clearfix:before
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
clearfix {
  *zoom: 1;
}
```
* `BFC` 清除浮动
```css
.wrapper {
  overflow: hidden;
} 
```
