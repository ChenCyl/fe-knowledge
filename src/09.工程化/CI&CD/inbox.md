开发完成后发布流程：`.ci.yaml` => CI 服务器 => `git tag` => `git push` => 送测 => jenkins

- 原生事件绑定无效

将原生事件绑定到自定义的组件时，可能无效，此时可以试试加上 .native 修饰符。

- filters 里获取不到 this

想在 filters 里通过 this 调用 vue 实例的方法 / 变量都是不可行的。具体原因还待学习。