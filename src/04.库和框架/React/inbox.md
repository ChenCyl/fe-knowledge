X：botId 如果是一个 string，实际上不需要 useMemo。 useMemo 这些记忆型状态多数用于引用类型。

useMemo, useCallback 这两个其实也是创建了一个状态

useState 是创建一个状态并且提供 当前状态值 ➕ 更新状态的方法。其中更新状态的方法，会引起该组件新的 render

useMemo 是创建一个状态，这个状态在每次 rerender 的时候，如果 deps 有变更，会根据里面的函数去计算新的状态值。

也就是说如果 deps diff 后无变更，那么这个状态不会更新，相当于还是同一个值。对于引用类型来说，就是同一个引用。

有些子组件会因为 props 的变更而 rerender，有 useMemo 的话，就可以减少子组件 rerender

然后有些状态或者副作用（其他的 useMemo / useEffect），也会依赖某些状态来更新（deps）。这时候如果依赖引用类型就需要持久化这个状态了

C：什么叫持久化这个状态。。

Chu：可以理解成，每个组件都是随时可能被多次执行的（比如外层组件执行了 setState） 

```js
// 当多次调用 Component 时，每次的 obj 引用都是不一样的，所以 useEffect 会被执行多次 
function Component () {  
  const obj = { a: 1 }   
  useEffect(() => {}, [obj]) 
} 

// 这个调用多次就只会执行一次 useEffect
function Component () {  
  const obj = useMemo(() => ({a: 1}), [])   
  useEffect(() => {}, [obj]) 
} 
```

L：其实我有个愚蠢的问题，当我要抽离某个函数的时候，怎么判断它是钩子还是一般函数？

X：如果你把你的一部分代码，抽出来做成一个函数，然后在原来的位置调用，那么其实你是在抽象 如果你在你的代码里调用一个函数，但是这个函数其实由外界提供，你可以理解为你搞了个钩子的设计

----

## React 学习笔记（1）

> 2020-07-16

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

**注意：** **组件名称必须以大写字母开头。**React 会将以小写字母开头的组件视为原生 DOM 标签

[“纯函数”](https://en.wikipedia.org/wiki/Pure_function)：不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

### 不要直接修改 State，而是应该使用 `setState()`，构造函数是唯一可以给 `this.state` 赋值的地方

setState()是异步的

可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数

### State 的更新会被合并（浅合并）

你必须谨慎对待 JSX 回调函数中的 `this`，在 JavaScript 中，class 的方法默认不会[绑定](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) `this`。如果你忘记绑定 `this.handleClick` 并把它传入了 `onClick`，当你调用这个函数的时候 `this` 的值为 `undefined`。

这并不是 React 特有的行为；这其实与 [JavaScript 函数工作原理](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)有关。通常情况下，如果你没有在方法后面添加 `()`，例如 `onClick={this.handleClick}`，你应该为这个方法绑定 `this`。

 [public class fields 语法](https://babeljs.io/docs/plugins/transform-class-properties/)，你可以使用 class fields 正确的绑定回调函数

```javascript
handleClick() {
  console.log('this is:', this)
}
// 用 class fields 语法来替代以上
handleClick = () => {
	console.log('this is:', this);
}
```

在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。例如，上面这个示例中，`componentDidUpdate` 依然会被调用。

元素的 key 只有放在就近的数组上下文中才有意义。一个好的经验法则是：在 `map()` 方法中的元素需要设置 key 属性。

key 会传递信息给 React ，但不会传递给你的组件。（不在props里）



数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。

在 React 组件中有两种常见副作用操作：需要清除的和不需要清除的。

Hook 使用规则：

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）



## React 学习笔记（2）

请注意 `for` 在 JSX 中应该被写作 `htmlFor`

请不要使用 CSS 移除焦点轮廓，比如设置 `outline: 0`，除非你将使用其他的方法实现焦点轮廓。



## React 学习笔记（3）

“think in effects”，它的心智模型更接近于实现状态同步，而不是响应生命周期事件。（闭包思想）

诚实地告知effect依赖，并且要列出所以依赖：记住这个例子 https://codesandbox.io/s/91n5z8jo7r ，https://codesandbox.io/s/91n5z8jo7r

**React会保证`dispatch`在组件的声明周期内保持不变**



## React-Query

> 2020-08-28

- Query Keys are serialized deterministically!
- isFetching 会包含 background fetch

---

## [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)

> 2020-07-29

- Each render has its own **Props and States**, **Effects**... Everything

- 只要 state 改变，React 重新调用组件。新的 state、props 都是常量。



effect 的 return 执行时间：

1. React renders UI for {id: 20} (the next)
2. Browser paints. We see the UI for {id: 20} on the screen
3. React cleans up the effect for {id: 10}
4. React runs the effect for {id: 20}

我理解为，上一次的 effect return 紧挨下一次的 effect 之前执行。

> 结合之前所说的，尽量不要去修改 state or props（Calling setSth() with a newly created object instead of mutating it），对于 effect return 来说，就会在下一次 render 用到老的 state or props.



```js
function SearchResults() {
  const [query, setQuery] = useState('react')
  
  const getFetchUrl = useCallback(() => {
    return 'http:/....' + query
  }, [query])
  
  useEffect(() => {
    const url = getFetchUrl()
  }, [getFetchUrl])
  
  // ...
}
```

组件内的函数在每一次渲染中都会不一样（正如 React 培训时牛爷爷说，是否改变是通过全等来判断的，两个对象全等永远是 false），但 useEffect 中调用的函数最好可以加在依赖里，这时就需要 useCallback 将函数包装，使函数参与到 Data Flow 中

