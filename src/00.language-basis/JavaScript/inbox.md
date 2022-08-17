- 数组的 push / unshift ...

这些方法直接修改原数组，返回是数组的长度而不是修改后的数组。

----

- 循环语句里的异步请求，如何知道都请求完毕了？

在循环外设置一个标志位，在异步请求 .then 里对标志位进行计算，等到标志位符合要求时请求完毕（一般是等于约定的请求次数）

---

- 循环语句里的异步请求，如何知道都请求完毕了？

“在循环外设置一个标志位，在异步请求 .then 里对标志位进行计算，等到标志位符合要求时请求完毕（一般是等于约定的请求次数）”上周我是这么回答的，现在看起来是有一点emmm蠢，其实把返回的 `Promise` 都 push 到一个数组里，最后用 `Promise.all` 就完事了。

---

`['1', '2', '3'].map(parseInt)` 的结果为什么是 [1, NaN, NaN]

`parseInt` 接收两个参数，第一个是需要被转换的数字/字符串，第二个是该数字/字符串的基（进制，介于 2-36 之间）。总所周知 `map` 回调函数的参数有三个 element, index, array，所以 `['1', '2', '3'].map(parseInt)` 其实是：

parseInt('1', 0) // 1（基数为 0 和不传参情况相同，具体[戳这里](https://muyiy.cn/question/js/2.html)）
parseInt('2', 1) // NaN（没有 1 进制）
parseInt('3', 2) // NaN（2 进制里没有 3）

所以我觉得，MDN 上对于 parseInt 功能的描述：[parseInt(string, radix) 将一个字符串 string 转换为 radix 进制的整数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 是错的，我个人的理解是**parseInt 将任意进制转化为十进制**。

---

### `let` 会使变量提升吗？

网上关于此问题的争论很多，我倾向于**会**变量提升。

先看一个例子
```js
let a = 1
{
  a = 2
  let a
}
```
这段代码在浏览器里执行报错，这证明了 `let` 是变量提升的。报错信息是：`Uncaught ReferenceError: Cannot access 'a' before initialization`，
其实，`var` 和 `let` 的区别之一就是，`var` 将变量提升后会赋予初值 `undefined`，而 `let` 不会赋值。

从 `let` 的作用域的第一行到对 `let` 赋值的那一行的区域叫做**锁区**（Temporal Dead Zone, TDZ），在锁区中不能对 `let` 声明的变量进行操作，否则就会报错。

更多的关于 let 的理解可以看：
- [我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)
- [JavaScript 深入之变量对象](https://github.com/mqyqingfeng/Blog/issues/5)

---

### 如何判断一个元素失去焦点

一般判断一个元素失去焦点需要判断以下几点：

- 点击的目标不是该元素
- 点击的目标不是该元素的子元素
- （如果元素带下拉框）点击的目标不是下拉框

解决这个问题需要注意两点，一是参与的事件有 `mouseup` 和 `mousedown`，二是可以使用 `contains` 来判断元素是否包括某元素。`Element` 中 `v-clickoutside` 指令便实现了这个功能，其中判断元素失焦的条件有：

```js
  if (!vnode ||
      !vnode.context ||
      !mouseup.target || 
      !mousedown.target ||
      el.contains(mouseup.target) || // 点击的目标是该元素子元素
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      (vnode.context.popperElm &&
      (vnode.context.popperElm.contains(mouseup.target) || // 点击的目标是下拉框的子元素
      vnode.context.popperElm.contains(mousedown.target))))
```

## 