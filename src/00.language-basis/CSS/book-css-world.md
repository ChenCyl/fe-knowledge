本周阅读了《CSS 世界》，从中学到了一些平凡又神奇的 CSS 知识。

### 神奇的 CSS 计数器

仅使用 CSS 就可以实现多级目录的效果，例如

```html
<div class="reset">
  <div class="chapter">深入理解 content
    <div class="reset">
      <div class="chapter">content 与替换元素</div>
      <div class="chapter">content 内容生成技术</div>
    </div>
  </div>
  <div class="chapter">温和的 padding 属性
    <div class="reset">
      <div class="chapter">content 与替换元素</div>
      <div class="chapter">content 内容生成技术</div>
    </div>
  </div>
  <div class="chapter">激进的 margin 属性</div>
</div>
```

```css
.reset {
  counter-reset: chapter 0;
  padding-left: 10px;
}
.chapter {
  counter-increment: chapter
}
.chapter:before {
  content: counters(chapter, '-') ' '
}
```

以上代码可以达到如下的效果：

<div class="reset">
  <div class="chapter">深入理解 content
    <div class="reset">
      <div class="chapter">content 与替换元素</div>
      <div class="chapter">content 内容生成技术</div>
    </div>
  </div>
  <div class="chapter">温和的 padding 属性
    <div class="reset">
      <div class="chapter">content 与替换元素</div>
      <div class="chapter">content 内容生成技术</div>
    </div>
  </div>
  <div class="chapter">激进的 margin 属性</div>
</div>
<style>
  .reset {
    counter-reset: chapter 0;
    padding-left: 10px;
  }
  .chapter {
    counter-increment: chapter
  }
  .chapter:before {
    content: counters(chapter, '-') ' '
  }
  .padspan {
    padding: 50px;
    background-color: lightblue;
  }
</style>




<style>
.reset {
  counter-reset: chapter 0;
  padding-left: 10px;
}
.chapter {
  counter-increment: chapter
}
.chapter:before {
  content: counters(chapter, '-') ' '
}
.padspan {
  padding: 50px;
  background-color: lightblue;
}
</style>




CSS 计数器有两个属性 `counter-reset` 和 `counter-increment`，两个方法 `counter()` 和 `counters()`.

- `counter-reset：<name> <init-val>;` ：给计数器命名，给予初始值
- `counter-increment：<name> <incre-val>;` ：递增数值
- `counter(name, style)`：展示计数器（style 的值是 list-style-type 所支持的值）
- `counters(name, strings)`：展示多级计数器（strings 是级与级间的连接符）

### 内联元素的 padding

在我们一贯的认知里，padding 只会影响内联元素的水平方向，不会影响垂直方向。但其实是，它只是不会影响垂直方向可视高度，如果我们给内联元素加个背景色或者边框，自然就可以看到其尺寸空间确实受 padding 影响了。例如

```html
<span class="padspan">我是加了padding的内联元素</span>
```

```css
.padspan {
  padding: 50px;
  background-color: lightblue;
}
```

以上代码可以达到如下的效果：

<span class="padspan">我是加了padding的内联元素</span>

---

