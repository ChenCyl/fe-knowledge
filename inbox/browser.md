# Browser

## Same-origin policy

:thinking: 为什么浏览器有同源策略？如果没有会怎样？

可以限制非同源的内容与当前页面进行交互，从而减少页面被攻击的可能性。[^1]

:thinking: CORS 的基本做法

The Cross-Origin Resource Sharing standard works by adding new HTTP headers that let **servers** describe which origins are permitted to read that information from a web browser.[^2]

:thinking: CORS 中的简单请求是如何划分的？（难道是跨域也不具有威胁的请求？

主要是从是否对服务器造成【side-effects】来分的。

Additionally, for HTTP request methods that can cause **side-effects** on server data (in particular, HTTP methods **other than GET, or POST with certain MIME types**)....[^2]



[^1]: https://febook.hzfe.org/awesome-interview/book1/browser-cross-origin
[^2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS





