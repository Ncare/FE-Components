> 元素水平居中

比较简单，对于**内联元素**，可以在父级元素上设置 `text-align：center`； 对于一个**块级元素**，可以设置 `margin: 0 auto`。

> 元素垂直居中

> 元素水平垂直居中

对于有固定尺寸的 `div`, 可以使用**绝对定位**的方式，`1em`相当于当前字体尺寸一倍，比如:
```css
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -5em;
  margin-left: -5em;
  width: 10em;
  height: 10em;
}
```
当然，随着CSS3的深入，也可以改为如下:
```css
.main {
  position: absolute;
  top: calc(50% - 5em);
  left: calc(50% - 5em);
  width: 10em;
  height: 10em;
}
```
当该元素的尺寸是由内容来决定，因此有了以下方式:
```css
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} 
```
事实上，**绝对定位**通常不是一个很好的选择，因为它对布局的影响比较大。

[ `margin`， `padding` 的百分比是以父级元素为参照物的 ]

如果不用**绝对定位**, 可以使用基于**视窗**的长度单位 `vr` (viewport-ralative)

* `vw`, `wh` 都是基于视窗的宽度与长度;
* `1vw` 相当于视窗的 1% ;
* `1vmin`, `1vmax` 分别对应视窗的长短边;

因此，上面的CSS的可以改为:
```css
.main {
  width: 10em;
  padding: 1em 1em;
  margin； 50vh auto 0;
  transform: translateY(-50%);
}
```
但是，这个方法比较局限，它只适用于元素在**视窗**中垂直居中。

`Flexbox`出现，解决了上述一些问题。
```css
body {
  display: flex;
  min-height: 100vh;
  margin: 0;
}

.main {
  margin: auto;
}
```
