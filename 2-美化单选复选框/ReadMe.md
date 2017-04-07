## 美化选择控件

> radio 控件

采取将原有 `input[type="radio"]` 进行隐藏，然后使用 `span` 及其 `after` 伪类进行 `radio` 的模拟。

`span` 使用 `radio-radius` 构造外圆环，`span:after` 来构造选中之后的状态

* 伪元素：`checked` 对应控件选中时的样式

* `+` 相邻兄弟选择器, 通过下面方式去改变样式
```css
input[type="radio"]:checked + span {} 
```

> checkbox 控件
