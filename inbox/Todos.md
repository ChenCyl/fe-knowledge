- [x] 跨域

  - CORS
    - **简单请求（Simple Requests）**和**需预检请求（Preflighted requests）**
    - Access-control-allow-origin 来源
    - Access-control-allow-methods
    - `Access-Control-Allow-Headers` 表示允许的请求头
    - `Access-Control-Allow-Credentials` 表示允许携带认证信息
  - 反向代理
    - 正向代理 客户端的配置 如 VPN
    - 反向代理 服务端
    - （网上很多教程是 CORS 和反向代理混用 我怀疑他们根本没掌握原理）
  - JSONP
    - script 标签不受同源限制

- [x] 输入一个 url 地址的全过程

  - DNS 解析拿到 IP

    - Socket
    - 协议栈（下面详细讲）
    - DNS 服务器（缓存）
    - 根域

  - 建立TCP通道

    - 计算机网络层次结构：
      - 应用层 HTTP（浏览器）
      - Socket
      - 操作系统中的协议栈
        - **传输层 TCP/UDP**
          - TCP 头带有端口号
          - 三次握手，类比叫号的过程
        - **网络层 IP **
          - IP 头
          - ARP 协议查询 MAC 地址并加上 MAC 头部
      - 数据链路和物理层：交换机、路由器
    - 三次握手（类比与叫号）

  - 页面的渲染![截屏2022-04-22 下午9.48.18](Todos.assets/截屏2022-04-22 下午9.48.18.png)

    

- [x] Prometheus 

  ![截屏2022-04-24 下午8.55.26](Todos.assets/截屏2022-04-24 下午8.55.26.png)

  - Server

    - Time Series Database: stores metrics data

    - Data Retrieval Worker: pulls metrics data

    - Web Server: accept promql queries

  - Exporter

    ![截屏2022-04-24 下午8.56.15](Todos.assets/截屏2022-04-24 下午8.56.15.png)

  - Pushgateway

    - short-lived

  - Alert Manager

  - Grafana

- [ ] react

- [x] 正则

  - https://www.bilibili.com/video/BV1QK4y1K72U
  - `+` 1~ 
  - `*` 0~
  - `?` 0 or 1
  - `^` `$`

- [x] filter sort

- [x] debouncing or throttling

  ```js
  // console.log('start')
  function throttle() {
  
  }
  
  function debounce(fn, delay) {
    let timer
    return function() {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => { fn.call(context, ...arguments) }, delay)
    }
  }
  
  function myThrottle(fn, delay) {
    let timer
    return function() {
      const context = this
      if (timer) return
      timer = setTimeout(() => { fn.call(context, ...arguments) }, delay)
    }
  }
  
  function foo(str = '') {
    console.log(str)
    console.log(this)
    console.log('====')
  }
  
  
  
  const debouncedFoo = debounce(foo, 1000)
  const throttledFoo = myThrottle(foo, 1000)
  const obj = {
    foo,
    debouncedFoo,
    throttledFoo
  }
  // obj.foo('hello world')
  // obj.debouncedFoo('hello world')
  // obj.throttledFoo('hello world')
  ```

- [x] 浏览器的渲染过程

  - Tokenize | DOM + CSSOM -> 渲染🌲 | layout（盒子模型）| 绘制（像素）|

- [x] prototype

  - 特别注意非 `new Function` 的实例的 `__proto__` 是 `Foo.prototype` -> `Object.prototype`

  ![img](Todos.assets/jsobj.jpg)

- [x] 二叉树层次 构造 js class member variable

- [x] sessionstorage localstorage cookie

  |                | cookie               | localStorage         | sessionStorage   |
  | -------------- | -------------------- | -------------------- | ---------------- |
  | 大小           | 4KB                  | 5MB                  | 10MB             |
  | 访问           | 同源条件下，任何窗口 | 同源条件下，任何窗口 | 同一窗口（会话） |
  | 有效期         | 手动设置 max-age     | 无                   | 窗口关闭（会话） |
  | 与请求一起发送 | 是                   | 否                   | 否               |
  | 存储位置       | 服务器和浏览器       | 浏览器               | 浏览器           |

  - localstorage 是同步的 太大会影响渲染进度

- [ ] class `this` ? `block` ?[^1]

- [ ] swr + react dnd + monitoring

- [x] JWT cookie session:

  - session 给服务器增加了内存负担 | 分布式
  - Header.Payload.Signature | 私钥

- [x] 深拷贝和浅拷贝

  - 深拷贝：JSON.stringify() JSON.parse()
  - 浅拷贝：
    - 数组：concat() slice() Array.from() 展开运算 - 对于 primitive 来说都是深拷贝
    - 对象：Object.assign() 展开运算

- [x] 图片懒加载

  - window.innerHeight + getBoundingClientRec.top
  - IntersectionObserver isIntersecting

- [ ] 改变原数组的方法

  
  
- [x] 箭头函数 vs. 普通函数

  > 箭头函数还是解决了一些问题的。直观来讲 scope 是 compile 时确定的，为什么 this 就要执行时确定，箭头函数很好地解决了这个问题。

  |           | 箭头函数          | 普通函数           |
  | --------- | ----------------- | ------------------ |
  | arguments | 无                | 有                 |
  | this      | lexical (compile) | call-site (excute) |

- [x] var vs. let

  |                         | var        | let            |
  | ----------------------- | ---------- | -------------- |
  | 作用域                  | 全局、函数 | 全局、函数、块 |
  | 向全局对象中添加属性    | 是         | 否             |
  | 自动注册/声明           | 是         | 是             |
  | 自动初始化              | 是         | 否             |
  | TDZ(Temporal Dead Zone) | 无         | 有             |
  | 重复声明                | 可以       | 不可以         |

- [x] Fisher-Yates Shuffle

- [x] typeof vs. instanceof

  - typeof：用于检测除 null 的**基础数据类型**和**函数类型**，返回小写字符串
  - instanceof：用于检测所有**实例**（注意`1` 和 `new Number(1)` 的区别，返回布尔值

- [x] 交换两个变量

  - 临时变量
  - 加减法（适用于数字）
  - 按位异或
  - 解构数组
  - 数组
  - 对象

- [ ] == *待深入学习

  - 相等运算符可以做类型转换，全等运算符是在相等运算之上再加上类型的对比。
    1.数字字符串可转换为数字，布尔值也可以转为数字，例如：`'1'==true`是true
    2.Null和Undefined不能进行转换，`Null==Undefined`是true，它们和0比较都是false 
    3.NaN表示一个不确切的数值，所以无论NaN和NaN怎么比较都是false
    4.比较对象的时候，要考虑引用对象的地址。

- [ ] CSS 响应式

- [x] CSS 优先级

  - 行内

  - ID selector

  - class, property, 伪类(:hover)

  - type, 伪元素(::before)

- [ ] virtual dom

- [x] React 声明周期

  - componentDidMount
  - componentDidUpdate
  - componentWillUnmount

- [x] React 父子组件和同级组件的沟通

- [x] Event Loop

  - 宏任务（加入宏任务队列）：
    - `<script>` 正常代码
    - 事件的回调函数
    - setTimeout setInterval
  - 微任务（加入微任务队列）：
    - Promise.then() catch() finaly()
    - MutationObserver
    - Object.observer

  ```js
  console.log('start')
  
  setTimeout(() => {
    console.log(1)
  }, 0);
  
  
  Promise.resolve().then(() => console.log(2)).then(() => console.log(3))
  console.log('end')
  // output: start end 2 3 1
  ```

- [x] BFC (block formatting context)

  - 形成独立的渲染区域，内部元素不会影响外界
  
  - 例子：
    - 让浮动内容和周围的内容等高
      - [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 计算值(Computed)不为 `visible` 的块元素
      - [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
    - 外边距塌陷

- [x] Margin 的负值和合并
  
- [ ] CI (continuous integration) CD (continuous deployment)
  
  - Testing：
    - Unit Testing
    - Validating Testing
    - Format Testing：branch name, git message format
  - Tool: 
    - Jenkins：Deployment
    - Gitlab：Format Testing
  
- [x] HTTP 缓存
  
  - 强缓存
  
    ```js
    cache-control: max-age=11111 // 秒
    ```
  
  - 协商缓存
  
    ```js
    cache-control: max-age=0
    //or
    cache-control: no-cache
    
    last-modified: xxx
    if-modified-since: xxx
    //or
    etag: xxx
    if-none-match: xxx
    ```
  
- [x] await/async

  ```javascript
  async function async1(){
    await async2()
    console.log('async1 end')
  }
  ```

  等价于

  ```javascript
  async function async1() {
    return new Promise(resolve => {
      resolve(async2())
    }).then(() => {
      console.log('async1 end')
    })
  }
  ```

- [ ] normalizr?

- [ ] `useEffect` `useState` 的渲染问题

- [ ] arrow function 的 `this` 是永远不变吗

  

[^1]: https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/apA.md