### webpack

以 yxy 中 webpack.dll.config.js 为例：

```js
/**
 * Created by chao_wang on 2019/6/26.
 */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue/dist/vue.runtime.esm.js', 'vuex', 'lodash', 'axios', 'vue-router', 'element-ui']
  },
  output: {
    filename: '[name]_[hash].dll.js',
    path: path.resolve(__dirname, 'dll'),
    library: 'dll_[name]' // 兼容不同的环境(libraryTarget)，例如 CommonJS，AMD，Node.js 或者作为一个全局变量
    // output.library 与 DLLPlugin 相结合可以暴露出 (也叫做放入全局域) dll 函数
  },
  resolve: {
    extensions: ['.js', '.vu2e', '.json'], // 自动解析确定的扩展 引入模块时不带扩展
    alias: { // 比如 Vue 中路径 @ 等于 src
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DllPlugin({
      // 这个插件是在一个额外的独立的 webpack 设置中
      // 创建一个只有 dll 的 bundle(dll-only-bundle)。 
      // 这个插件会生成一个名为 manifest.json 的文件，
      // 这个文件是用来让 DLLReferencePlugin （vue.config.js 里）映射到相关的依赖上去的。
      name: 'dll_[name]',
      path: path.join(__dirname, 'dll', '[name]_[hash].manifest.json'),
      context: __dirname
    })
  ]
}
```

---

# Webpack

需要进一步学习的地方：

- [ ] [manifest](https://webpack.docschina.org/concepts/manifest) 

- [ ] 依赖图

- [ ] > [模块热替换(hot module replacement)](https://webpack.docschina.org/guides/hot-module-replacement)！

- [ ] [webpack 4: import() and CommonJs](https://medium.com/webpack/webpack-4-import-and-commonjs-d619d626b655) 

- [ ] 预获取/预加载模块(prefetch/preload module) —— 按需加载或并行加载：这应该是 Suspense 和 Lazy 的关键？

  > code splitting 这是分割包，按需加载还需要其他方法来实现




确保 webpack 编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件：

1. 通过 contenthash 使文件内容变化后能够请求到新的文件

```json
filename: '[name].[contenthash].js'
```

无论是否修改代码，重新运行构建都会生成新的 hash，因为 webpack 在入口 chunk 中包含了某些 boilerplate（特别是 runtime 和 manifest）。

2. extracting boilerplate

```json
 optimization: {
   runtimeChunk: 'single', // 提取 runtime
   splitChunks: {
     cacheGroups: {
       vendor: {
         test: /[\\/]node_modules[\\/]/, // 提取第三方 library
           name: 'vendors',
           chunks: 'all',
         }
       }
     }
 	 }
}
```

## Webpack

### Webpack 的作用到底是什么？

webpack 构建的核心任务是完成**内容转化**和**资源合并**。[^1]

*"Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a* `require()`*/*`import` *statement,* **use** *the* `raw-loader` *to transform it before you add it to the bundle."*[^2]



[^1]: https://febook.hzfe.org/awesome-interview/book1/engineer-webpack-workflow
[^2]: https://webpack.js.org/concepts/


