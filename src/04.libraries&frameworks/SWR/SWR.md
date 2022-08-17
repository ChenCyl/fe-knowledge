# SWR 浅析

> 2020-09-28
>

## SWR 介绍

**SWR：React Hooks library for data fetching**

SWR 的名字来源于 `stale-while-revalidate`，一种 HTTP 缓存失效策略，由 [HTTP RFC 5861](https://tools.ietf.org/html/rfc5861) 提出。

>    A response containing: Cache-Control: max-age=600, stale-while-revalidate=30
>
>    The stale-while-revalidate HTTP Cache-Control extension allows a cache to immediately return a stale response while it revalidates it in the background, thereby hiding latency (both in the network and on the server) from clients.

> 演示 http-swr-demo，重点在分钟改变的时候和网速变慢的时候。

SWR 借助了这种思想，即先从缓存（stale）中获取数据，同时发送新的请求更新缓存。

不同的是 SWR 的缓存不是浏览器缓存而是内存，新的数据不是在下一次请求结束后才被渲染到而是在本次请求结束就能被渲染。

## SWR 用法与特性

### Quick Start

Fisrt you need to create a `fetcher` function, which is just a wrapper of the native `fetch`.

```javascript
const fetcher = (...args) => fetch(...args).then(res => res.json())
```

```javascript
import useSWR from 'swr'

function Profile () {
  const { data, error } = useSWR('/api/user/123', fetcher)
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  // render data
  return <div>hello {data.name}!</div>
}
```

In this example, the `useSWR` hook accepts a `key` string and a `fetcher` function. `key` is a unique identifier of the data (normally the API URL) and will be passed to `fetcher`. `fetcher` can be any asynchronous function which returns the data, you can use the native fetch or tools like Axios.

The hook returns 2 values: `data` and `error`, based on the status of the request.

Normally, there're 3 possible states of a request: "loading", "ready", or "error". You can use the value of `data` and `error` to determine the current state of the request, and return the corresponding UI.

### Reusable

```javascript
function useUser (id) {
  const { data, error } = useSWR(`/api/user/${id}`, fetcher)
  
  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}
```

```javascript
function Avatar ({ id }) {
  const { user, isLoading, isError } = useUser(id)
  
  if (isLoading) return <Spinner />
  if (isError) return <Error />
  return <img src={user.avatar} />
}
```

### API Options

https://swr.vercel.app/docs/options

### Features

https://swr.vercel.app/docs/revalidation

- Automatic Revalidation
- Conditional Fetching
- Arguments
- Deduped

>以下特性不做详细介绍：
>
>- Global Configuration（options 都可以全局配置）
>- Error Handling（error retry）
>- Pagination
>- Prefetching 
>- Usage with Next.js
>- Suspense
>- Mutation

## SWR 源码浅析

在分享原理之前我先分享一个我在学习前期产生的一个误解，就是我以为 SWR 是用 key 是否相同来判断是否需要重新请求，但其实不是对吧（可能只有我有这个误解是吧-。-），需要明确的一点是，不管缓存有没有数据，都会发送请求（不包括重复相同请求的情况）。

### v1.0 Basic

只实现这一行代码。

```typescript
 const { data, isValidating } = useSWR('/api/user/123', fetcher)
```

```js
// cache.js
class Cache {
  private __cache
  
  constructor() {
    this.__caceh = new Map()
  }
  
  get(key) {
    return this.__cache.get(key)
  }
  
  set(key, value) {
    thie._cache.set(key, value)
  }
  
}

export const cache = new Cache()
```

```js
// use-swr.js
import { cache } from './cache'

const useSWR = (key, fn) => {
  // 1. 先从 cache 中取数据
  const initialData = cache.get(key)

  const [data, setData] = useState(initialData)
  const [validating, setValidating] = useState(false)

  const revalidate = useCallback(() => {
    setValidating(true)

    const newData = await fn(key)

    // 3. 更新 cache 并重新渲染新的数据
    cache.set(key, newData)
    setData(newData)
    setValidating(false)
  }, [key])

  useEffect(() => {
    // 2. 同时发起请求
    revalidate()
  }, [key, revalidate])
} 
```

增加错误处理：

https://github.com/ChenCyl/weekly-report/commit/7a4277de24a3ebc85acf0219f67c00a6e74c3ca7#

### v2.0 Multiple Arguments & Passing Objects

```js
const userObj = {id: 1}
const userArr = ['admin']

const { data } = useSWR(['/api/user', userObj, userArr], fetcher)
```

为实现以上用法，修改代码为：

https://github.com/ChenCyl/weekly-report/commit/d5525a6133156d3da64616416a40c1b839def9c3

> 演示监控项目，开启 debugger for hash

大家有没有发现，当我们传递 object 或者 function 的时候，SWR 的能力并没有得到体现。

这是因为 useMemo 的依赖改变了，返回值的地址也改变了。

官方提到的写法有两种：

https://github.com/vercel/swr/pull/145#discussion_r350064725

> 演示监控项目，两种写法

### v3.0 Dependent Fetch

```js
function MyProjects () {
  const { data: user } = useSWR('/api/user')
  const { data: projects } = useSWR(() => '/api/projects?uid=' + user.id)
  // When passing a function, SWR will use the return
  // value as `key`. If the function throws or returns
  // falsy, SWR will know that some dependencies are not
  // ready. In this case `user.id` throws when `user`
  // isn't loaded.
  if (!projects) return 'loading...'
  return 'You have ' + projects.length + ' projects'
}
```

为实现以上用法，进一步编码：

https://github.com/ChenCyl/weekly-report/commit/7a05ad01ce222f9e9916f6e0e4260e9573792a9d

### v4.0 Deduped（去除重复请求）

https://swr.vercel.app/getting-started Example 部分，其实是去除了重复的请求。

https://github.com/ChenCyl/weekly-report/commit/34c1ed6b7658f68f29ec7b8d95afb729329da76a

我当时有一个疑惑（不知道你们有没有）：无论是否 shouldDeduping，await 都执行了，为什么请求只发送了一次？有这个疑问的同学和我一样对 `Promise` 了解得还不够。其实，调用 fn 时，请求发送

```js
CONCURRENT_PROMISES[key] = fn(...fnArgs)
```

fn 函数返回一个 `promise`，并且赋值给了 `CONCURRENT_PROMISES`，注意此时 `promise` 的状态为 `pending`，`await ` 只是等待 `Promise` 的状态变为 `fulfilled`

> 演示监控项目，去掉所有断点，查看请求结果（只请求一次）
>
> 关闭断点 debugger for hash，开启断点 debugger for dedupe

### v5.0 Revalidate on Focus

https://github.com/ChenCyl/weekly-report/commit/d2888def94505295d9570ea1c227499774354a13

>将此段代码粘贴到浏览器中演示：
>
>```js
>window.addEventListener(
>    'visibilitychange',
>    () => console.log('visibility change: ', document.visibilityState),
>	false
>)
>```

### v6.0 性能优化

####  Rerender

1. 任务队列里的任务，每次 set 都会导致 rerender
2. 有的返回值没有被用到也会导致 rerender

https://github.com/ChenCyl/weekly-report/commit/9cd94d8a632568d045a2c00a3750ce77e73fdf9e

> 打开断点：debugger for render，isValidating 由于没有访问，所以不引起 render

#### useLayoutEffect & requestIdleCallback

useLayoutEffect 的执行时机比 useEffect 会早一些，他们之间的比较你们可以去了解一下，我这里就不说了，因为我也不知道。

requestIdleCallback 顾名思义，在浏览器空闲的时候才去执行，不会阻塞渲染。

https://github.com/ChenCyl/weekly-report/commit/b9c03d245525a1ee8f31dbb74aaec592f384131c

