`style scoped` 会给元素生成 data-xxx 属性

---

watch 监听一个数组时发现 newValue 和 oldValue 相同

在修改（不是替换）对象或数组时，旧值将与新值相同，因为它们索引同一个对象/数组。Vue 不会保留修改之前值的副本。
解决方法是在修改数组前用使用一次 array = [...array]。

---

- 子组件如何调用父组件的方法

1. `$emit`，它无法适用所有场景，比如当父组件的方法是一个 async 函数，此时可以使用下面一种方式。
2. `$parent.method`，直接调用父组件的方法，但是需要知道方法名，方法名可以通过 props 获得，也可以使用下面一种方式。
3. `provide / inject`

```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```

---

-  scoped css 如何作用在子组件上？

为了不让 css 污染其他组件，我们往往会加上 `scoped`，但这也阻止了在父组件里更改子组件的样式。解决方法是在 css 选择器前加上 `>>>`，在 vue 项目中也可以使用 `/deep/` 替代，但是会出现 vue 不编译的问题，导致不兼容某些浏览器， 所以还是用 `>>>` 吧。

