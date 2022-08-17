> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
>
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
>
> https://promisesaplus.com/
>
> https://github.com/promises-aplus/promises-tests

:bulb: A `.catch()` is really just a `.then()` without a slot for a callback function for the case when the promise is resolved.

:thinking: `new Promise()` 时是否传入的参数（函数）已经执行？是。

```js
// 执行完这三行就会输出 execute
const p = new Promise((resolve) => {
  console.log('execute')
})
```

:bulb: `then` must return a promise.

:bulb: The Promise Resolution Procedure 是在处理 `then` 返回的 `promise` 与 `then` 的参数（函数）返回值之间的关系。



