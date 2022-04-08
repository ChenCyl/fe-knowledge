### ESLint

以 cloud-yxy 为例：

```js
module.exports = {
  /* 禁用持续查找（root）*/
  root: true,  // 默认情况下，ESLint 将在根目录下的所有父文件夹中查找配置文件。true: 一旦发现了配置文件就停止对父文件夹的查找 
  /* 环境 */
  env: {
    // 环境定义了预定义的全局变量
    node: true // 比如 node 环境下不会出现 console undefined
  },
  /* 共享配置 */
  'extends': process.env.NODE_ENV === 'production' ? [] : [
    // eslint:all 引入当前版本 eslint 的所有核心规则
    // eslint:recommended 引入 eslint 的核心功能，并且报告一些常见的共同错误
    // 绝对或相对路径 导入路径对应的规则配置
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  /* 规则 */
  rules: {
    // off 或者 0：关闭规则
    // warn 或者 1：打开规则，并且作为一个警告（不影响 exit code）
    // error 或者 2：打开规则，并且作为一个错误（exit code 将会是1）
    'camelcase': 0,
    'space-before-function-paren': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    // 以下参考 eslint-vue 规则说明
    'vue/attribute-hyphenation': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/mustache-interpolation-spacing': 0,
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "never",
        "component": "always"
      },
      "svg": "never",
      "math": "never"
    }],
    "vue/max-attributes-per-line": ['error', {
      "singleline": 3,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    'vue/multiline-html-element-content-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/require-default-prop': 0,
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "LIFECYCLE_HOOKS",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }]
  },
  /* 解析器选项 */
  parserOptions: {
    parser: 'babel-eslint' // 解析器默认情况下是 Espree 解析器
  },
  /* 全局变量 */ 
  globals: { 
    // 包含在这个集合中的属性都会被工具认为是全局变量
    // no-undef 规则就不会发出警告
    '$': true,
    '_': true,
    '__BUILD__': true,
    '__DEV__': true,
    '__TEST__': true,
    '__PRE__': true,
    '__ONLINE__': true,
    '_MEIQIA': true,
    'common': true,
    'Log': true,
    'config': true,
    laydate: true,
    wx: true,
    ZDao: true,
    CCJSAPI: true
  }
}
```

### 