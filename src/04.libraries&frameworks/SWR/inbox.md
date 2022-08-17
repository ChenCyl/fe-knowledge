学习了 SWR 的使用方法。在使用过程中发现了两个问题（也可能只是我的问题）：

1. SWR 的 [Query Key Change Detection 使用的是 Referential Equality (===)](https://react-query.tanstack.com/docs/comparison)，这导致对象不能作为 key，当请求参数较多时写法很奇怪，官方给的例子最多也只有两个参数。
2. 在官方给的[这个例子](https://swr.vercel.app/getting-started)里，呈现了一种非常优雅的用法，但在实际使用中还要考虑请求参数的问题。

