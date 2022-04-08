Event Loop



### Event Loop 的六个阶段（Phase）

<---- job

------ next iteration of the event loop ------

- **timers**: setTimeout

<---- job

- **pending callbacks**

<---- job

- **idle, prepare**

<---- job

- **poll**: IO

<---- job

- **check**: setImmediate

<---- job

- **close callbacks**

<---- job



### Event Loop 的每一个 Phase 会干嘛？

1. perform specific operations
2. execute callbacks in a FIFO queue

until queue ==exhaust== or reach the ==maxinum== number of callbacks.



### 当 poll 执行完后，既有 setTimeout 的回调，又有 setImmediate 的回调的时候，应该怎么办？

取决于 setTimeout 和 setImmediate 的上下文，如果是在 IO 回调函数中，如

```js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

则是 setImmediate() 的回调函数先执行。

其他上下文时，结果不确定。



### semver 是什么？

**semantic versioner**

npm package 的版本号由三个数字组成：

x.0.0：a **major** release can have breaking changes.

0.x.0：a release that introduces backward-compatible changes is a **minor** release

0.0.x：a release that only fixes bugs is a **patch** release



### Difference between `~version` and `^version`?

- `~version` **“Approximately equivalent to version”**, will update you to all future patch versions, without incrementing the minor version. `~1.2.3` will use releases from 1.2.3 to <1.3.0.
- `^version` **“Compatible with version”**, will update you to all future minor/patch versions, without incrementing the major version. `^2.3.4` will use releases from 2.3.4 to <3.0.0.

但是这里的解释有点问题，比如 ^0.13.0 就不会更新到 1.0.0，具体解释见下。

- `^`: It will only do updates that do not change the leftmost ==non-zero== number. If you write `^0.13.0`, when running `npm update`, it can update to `0.13.1`, `0.13.2`, and so on, but not to `0.14.0` or above. If you write `^1.13.0`, when running `npm update`, it can update to `1.13.1`, `1.14.0` and so on, but will not update to `2.0.0` or above.
- `~`: if you write `~0.13.0`, when running `npm update` it can update to patch releases: `0.13.1` is ok, but `0.14.0` is not.



### `fs.open` 的第二个参数有哪些？

> https://stackoverflow.com/questions/1466000/difference-between-modes-a-a-w-w-and-r-in-built-in-open-function

```py
                  | r   r+   w   w+   a   a+
------------------|--------------------------
read              | +   +        +        +
write             |     +    +   +    +   +
write after seek  |     +    +   +
create            |          +   +    +   +
truncate          |          +   +
position at start | +   +    +   +
position at end   |                   +   +
```



### Node 常用的包及其方法？

- fs

  - fs.resolve()
  - fs.normalize()

- fs-extra

  - fs.remove()

- path

  - path.sep
  - path.delimiter
  - path.resolve()
  - path.normalize()
  - path.parse()
  - path.relative()

- os

  - os.arch()
  - os.cpus()

- events

  - EventEmitter

- http

- stream



### 如何在 Node 里使用 Buffer？

当做数组来使用

---

