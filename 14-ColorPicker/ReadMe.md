## svg 颜色渐变

<defs> 元素 用于预定义一个元素使其能够在SVG图像中重复使用

任何图形元素，g, symbol都可以放入其中

<linearGradient> 定义SVG中的现行渐变， `必须要嵌套在<defs>的内部`;

``` html
<svg  xmlns="http://www.w3.org/2000/svg" width="300px" height="300px" version="1.1">
      <defs>
            <linearGradient id="gradient-black" x1="0%" y1="100%" x2="0%" y2="0%">
                 <stop offset="0%" stop-color="#000000" stop-opacity="1"></stop>
                 <stop offset="100%" stop-color="#ffffff" stop-opacity="0"></stop>
            </linearGradient>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient-black)"></rect>
</svg>      
```

* id 为该渐变定义一个唯一标示;
* 标签x1, x2, y1, y2 属性课定义渐变开始和结束的位置；
* fill 填充渐变；



## indicator　无鼠标事件响应

`css: pointer-event: none`; 使得当拖拽indicator的时候，target目标为上一层级标签， 从而得到`offsetX` 与 `offsetY`。 indicator 就可以流畅滑动.

