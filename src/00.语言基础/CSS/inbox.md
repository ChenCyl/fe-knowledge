### 选择器和表格

- CSS border 画三角形
  - border-top-color: transparent
- CSS 选择器可以这么用：
  - .myClass:hover + [Sibling] 
  - .myClass:hover::after
- 旋转
  - 块级元素
  - transition: transform .3s linear;
  - transform: rotate(180deg);

---

CSS Comb 是优化 CSS（顺序）的工具

---

- `height` 从确定值到 `auto`，或从 `auto` 到确定值如何实现过渡动画？

在实现一个折叠面板时，`height` 需要从 `67px` 变化到 `auto`，为了实现过渡动画，尝试了将 `auto` 设置为子元素的高度，动画是有了，但是当屏幕分辨率改变时，面板高度本应该随内容的高度改变，但无奈高度已经定死。在这种情况下，只能考虑如何给确定值到 `auto` 的变化加动画了。
方法有两种，比较简单的一种是：先将高度设置为确定值，等待过渡动画时间间隔后，再将其设置为 `auto`，但因为 `setTimeout` 并不总是按照给定的时间间隔发生回调，所以可能会出现延迟问题。另一种比较精确的做法是，监听 `animationend` 或 `transitionend` 事件，这个比较复杂还没有尝试。
为了提高性能，还可以使用 `transform: translateZ(0)` 将动画单独跑在一个图层上，避免了大块的重绘重排。另外，`perspective` 属性可以用来定义当前视角的与 `x-y` 平面的垂直距离。

---

- 如何用 css 画出正方形？

```scss
// 方法一
.square {
  width: 10vh;
  height: 10vh;
}

// 方法二
.square {
  width: 10%;
}
.square:after {
  content: "";
  display: block;
  padding-top: 100%;
}
```

---

- 如何去除 `inline-block` 之间的空格？

`nline-block` 被显示为内联元素，元素前后没有换行符。但因为书写的原因会内联块之间会产生空格，消除间隙的方法是在父元素上设置：

```css
.container {
  font-size: 0;
  letter-space: -4px; // 取消字体大小限制。兼容 safari 的写法
}
```

---

- IE 中定位为 `absolute` 或 `relative` 时会位置可能会和 `chrome` 里的不同。

考虑到浏览器的问题，在使用这些定位时，上下和左右都要分别选取一个来赋值。另外，`vertical-align` 可以定义行内元素本身在父元素中的对齐方式，若不是 `span` 而是 `inline-block` 还可以将 `line-height` 调至和父元素的高相同，然后通过 `vertical-align: top` 来居中。

