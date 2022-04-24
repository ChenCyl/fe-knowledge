function curry(func) {
  return function inner(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return inner.bind(this, ...args)
    }
  }
}

// test 3 args
function add(num1, num2, num3) {
  return num1 + num2 + num3
}

let curriedAdd = curry(add);
console.log(curriedAdd(2)(3)(4))
console.log(curriedAdd(2,3)(4))
console.log(curriedAdd(2,3,4))

// test 1 arg
function identify(value) {
  return value;
}

let curriedIdentify = curry(identify);
console.log(curriedIdentify(4))