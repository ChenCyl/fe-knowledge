checkbox id 结合 label for 使得选中文字也可以勾选 checkbox

---

- 如何在点击 `radio` 的 `label` 时也能触发选中？

```html
<label ...>
  <input type='radio' .../>
</label>
```

这里的 `label` 放在最外层的作用是扩大鼠标点击范围，无论是点击在文字还是 `input` 上都能够触发响应，当然如下通过 `for` 属性绑定 `input` 的 `id` 属性也可以实现

```html
<input id='t' type='radio'>
<label for='t'>点此</label>
```

前者被称为隐式链接，后者是显示链接，很明显前者不需要 `id`，肯定前者好

