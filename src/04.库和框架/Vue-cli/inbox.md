#### 常用命令

以 cloud-yxy 为例：

```json
"scripts": {
    "serve": "vue-cli-service serve", 
    "build": "cross-env ENV=test BASE_PATH=/ vue-cli-service build",
    "build:pre": "cross-env ENV=pre BASE_PATH=/ vue-cli-service build",
    "build:production": "cross-env ENV=online BASE_PATH=/ vue-cli-service build",
    "lint": "vue-cli-service lint",
    // 现代模式。 会产生两个应用的版本：一个现代版的包，面向支持 ES modules 的现代浏览器，另一个旧版的包，面向不支持的旧浏览器。
    "build:modern": "vue-cli-service build --modern",
    // 生成 report.html 以帮助分析包内容
    "build:report": "cross-env ENV=online BASE_PATH=/ vue-cli-service build --report",
    "env": "node ./tools/generateEnv.js",
    "lint2": "vue-cli-service lint --fix",
    "start": "vue-cli-service serve",
    "test:unit": "vue-cli-service test:unit",
    // 解析 webpack 配置、包括链式访问规则和插件的提示，输出重定向到文件
    "inspect": "vue-cli-service inspect --mode production > webpack.config.production.js",
    "dll": "webpack --config ./webpack.dll.config.js"
  }
```

#### 缓存和并行处理

> 留心一下这个点

- cache-loader 会默认为 Vue/Babel/TypeScript 编译开启。文件会缓存在 node_modules/.cache 中——如果你遇到了编译方面的问题，记得先删掉缓存目录之后再试试看。
- thread-loader 会在多核 CPU 的机器上为 Babel/TypeScript 转译开启。

#### 处理静态资源

静态资源可以通过两种方式进行处理：

- 在 JavaScript 被导入或在 template/CSS 中通过相对路径被引用。这类引用会被 webpack 处理。

- 放置在 public 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理。