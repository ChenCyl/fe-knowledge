// - [ ] setTimeout 是宏任务 但 Promise 是微任务
//       为何可以用 setTimeout 实现 Promise
// - [ ] then 的链式很复杂

class MyPromise {
  constructor(executor) {
    this.status = 'pending'
    this.result = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error) 
    }
  }
  resolve(value) {
    setTimeout(() => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.result = value
        this.resolvedCallbacks.forEach(cb => cb(value))
      }
    });
  }
  reject(reason) {
    setTimeout(() => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.result = reason
        this.rejectedCallbacks.forEach(cb => cb(reason))
      }
    });
  }
  then(onfulfilled, onrejected) {
    if (typeof onfulfilled !== 'function') return new MyPromise()
    if (typeof onrejected !== 'function') return new MyPromise()

    if (this.status === 'pending') {
      this.resolvedCallbacks.push(onfulfilled)
      this.rejectedCallbacks.push(onrejected)
    }
    if (this.status === 'fulfilled') {
      setTimeout(() => {
        onfulfilled(this.result)
      })
    }
    if (this.status === 'rejected') {
      setTimeout(() => {
        typeof onrejected === 'function' && onrejected(this.result)
      })
    }
  }
}

// console.log('1')

const p = new Promise((resolve, reject) => {
  // throw new Error('error')
  // console.log('2')
  setTimeout(() => {
    resolve('hello world')
    // console.log('4')
  });
  // reject('error')
})
const mp = new MyPromise((resolve, reject) => {
  // throw new Error('error.')
  // console.log('2.')
  setTimeout(() => {
    resolve('hello world.')
    // console.log('4.')
  });
  // reject('error.')
})

// p.then((value) => console.log(value), (reason) => console.log(reason))
// mp.then((value) => console.log(value), (reason) => console.log(reason))
p.then(value => value).then(value => console.log(value))
mp.then(value => value).then(value => console.log(value))
// p.then(2, (reason) => console.log(reason))
// mp.then(2, (reason) => console.log(reason))

// console.log('3')
