# Flex 辅助类与方法

## Flex 辅助类

> 详情见 `_common.scss`

### 作用于父容器

- `.flex`: 生成一个 flex 容器
- `.flex_col`: 生成一个主轴向下的 flex 容器
- `.inline_flex`: 生成一个行内 flex 容器
- `.inline_flex_col`: 生成一个主轴向下的行内 flex 容器
- `.just_center`: 等同于 `justify-content: center`
- `.just_fe`: 等同于 `justify-content: flex-end`
- `.just_sb`: 等同于 `justify-content: space-between`
- `.just_sa`: 等同于 `justify-content: space-around`
- `.align_center`: 等同于 `align-item: center`
- `.align-fs`: 等同于 `align-items: flex-start`
- `.align-fe`: 等同于 `align-items: flex-end`
- `.align_bl`: 等同于 `align-items: baseline`

### 作用于子元素

- `.flex_1`: 等同于 `flex: 1`
- `.flex_2`: 等同于 `flex: 2`
- `.flex_3`: 等同于 `flex: 3`
- `.flex_4`: 等同于 `flex: 4`
- `.flex_5`: 等同于 `flex: 5`
- `.align_self_fs`: 等同于 `align-self: flex-start`
- `.align_self_fe`: 等同于 `align-self: flex-end`
- `.align_self_center`: 等同于 `align-self: center`
- `.align_self_bl`: 等同于 `align-self: baseline`

### 用法

```html
<div class="flex align_center">
  <div class="flex_1"></div>
  <div class="flex_2 align_self_bl"></div>
  <div class="flex_3"></div>
</div>
```

## Flex 辅助方法

> 当常用类不能满足使用需要或者使用起来不美观时，可以考虑使用以下方法。（详情见 `_minxin.scss`）

### 父容器

- `flex_wrap($value: nowrap)`：等同于 `flex-wrap` 属性
- `display_flex`：等同于 `display: flex`
- `display_inline_flex`：等同于 `display: inline-flex`
- `justify_content($value: flex-start)`：等同于 `justify-content` 属性
- `align_items($value: stretch)`：等同于 `align-items` 属性

### 子元素

- `order($int: 0)`：等同于 `order` 属性
- `flex($fg: 1, $fs: null, $fb: null)`：等同于 `flex` 属性
- `align_self($value: auto)`：等同于 `align-self` 属性

### 用法

```scss
.container {
  @include display_flex;
  .item {
    @include flex(1);
  }
}
```