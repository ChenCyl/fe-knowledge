 

### Ts 学习笔记（1）

➜  ~ sudo chown -R $USER /usr/local/lib/node_modules
➜  ~ npm install -g typescript

https://flaviocopes.com/npm-fix-missing-write-access-error/

**TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错。**而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。

`注意，使用构造函数 Boolean 创造的对象不是布尔值 `,  `boolean` 是 JavaScript 中的基本类型，而 `Boolean` 是 JavaScript 中的构造函数。其他基本类型（除了 `null` 和 `undefined`）一样，不再赘述。

声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`

TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

**如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查**

定义的变量比接口少了一些属性是不允许的，多一些属性也是不允许的

**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

**只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**



### Ts 学习笔记（2）

需要注意的是，可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数了**

**TypeScript 会将添加了默认值的参数识别为可选参数**，此时就不受「可选参数必须接在必需参数后面」的限制了

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

但是有的情况下 `ApiError` 和 `HttpError` 不是一个真正的类，而只是一个 TypeScript 的接口（`interface`），接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 `instanceof` 来做运行时判断了

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为 any
- any 可以被断言为任何类型
- 要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可

**除非迫不得已，千万别用双重断言。**

- `animal` 断言为 `Cat`，只需要满足 `Animal` 兼容 `Cat` 或 `Cat` 兼容 `Animal` 即可
- `animal` 赋值给 `tom`，需要满足 `Cat` 兼容 `Animal` 才行

注意，在 `declare namespace` 内部，我们直接使用 `function ajax` 来声明函数，而不是使用 `declare function ajax`。类似的，也可以使用 `const`, `class`, `enum` 等语句

npm install @types/foo --save-dev

**强烈建议**大家将书写好的声明文件（通过给第三方库发 pull request，或者直接提交到 `@types` 里）发布到开源社区中，享受了这么多社区的优秀的资源，就应该在力所能及的时候给出一些回馈。只有所有人都参与进来，才能让 ts 社区更加繁荣。

注意，只有 `function`、`class` 和 `interface` 可以直接默认导出，其他的变量需要先定义出来，再默认导出



### TS 学习笔记（3）

在元组中，当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型



TODO:

- [ ] TS 修饰符



----

> 2020-11-02

extends 可以表示继承和约束

---

## [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

> 2002-11-04

Q&A：

**Q**：项目中没有定义任何 alias，为什么 `import xxxx from 'routes/xxx'` （`routes` 位于 `src/` 下）可以？

**A**：You have `import * as foo from 'foo'`, the following are the places that are checked *in order*

- `./node_modules/foo`
- `../node_modules/foo`
- `../../node_modules/foo`
- Till root of file system

> 好像不是这个问题。。最后一条是 root，为啥直接到 src 里去找了？