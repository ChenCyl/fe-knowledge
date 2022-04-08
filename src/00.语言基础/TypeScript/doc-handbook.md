# The TypeScript Handbook

> https://www.typescriptlang.org/docs/handbook/intro.html



:thinking: What is the difference between null and undefined in JavaScript?[^1]

In JavaScript, `undefined` means a variable has been declared but has not yet been assigned a value, such as:

```js
var testVar;
alert(testVar); //shows undefined
alert(typeof testVar); //shows undefined
```

`null` is an assignment value. It can be assigned to a variable as a representation of no value:

```js
var testVar = null;
alert(testVar); //shows null
alert(typeof testVar); //shows object
```

From the preceding examples, it is clear that `undefined` and `null` are two distinct types: `undefined` is a type itself (undefined) while `null` is an object.

```js
null === undefined // false
null == undefined // true
null === null // true
```

and

```js
null = 'value' // ReferenceError
undefined = 'value' // 'value'
```

[^1]: https://stackoverflow.com/a/5076962

