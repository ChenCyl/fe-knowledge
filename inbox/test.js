
// // mdn allSettled polyfill

// function allSettled(promises) {
//   if (Array.isArray(promises) && !promises.length) return Promise.resolve([])

//   let results = []
//   let count = promises.length

//   return new Promise((resolve, reject) => {
//     for (let i = 0; i < promises.length; i++) {
//       const p = Promise.resolve(promises[i])

//       p.then(value => {
//         results[i] = ({ status: 'fulfilled', value })
//       }).catch((reason) => {
//         results[i] = ({ status: 'rejected', reason })
//       }).finally(() => {
//         count--
//         !count && resolve(results)
//       })
//     }
//   })
// }



// const p1 = Promise.resolve('p1')
// const p2 = Promise.resolve('p2')
// const p3 = Promise.resolve('p3')
// const p4 = Promise.reject('p4')
// const p5 = Promise.reject('p5')
// const p6 = Promise.reject('p6')

// const ps = [p1, p2, p3, p4, p5, p6, 1, 'hello', {}, [], () => {}]
// // const ps = []
// // allSettled(ps).then(values => values.forEach(value => console.log(value)))
// // Promise.allSettled(ps).then(values => values.forEach(value => console.log(value)))

// Promise.allSettled(ps).then(res => console.log(res))
// allSettled(ps).then(res => console.log(res))



// var promise = new Promise(resolve=>{
//   console.log(1); // 1
//   resolve()
// })

// requestAnimationFrame(() => {console.log(2)}) // mi

// setTimeout(()=>{
//   console.log(3); // ma
// })

// promise.then(()=>{ // mi
//   console.log(4);
//   requestAnimationFrame(() => {console.log(5)}) //
// })

// var promise2 = getPromise();

// async function getPromise(){
//   console.log(6); // 6
//   await promise; // fullfilled/rejected value/reason
//   console.log(7); // 7
// }
// console.log(8); // 8

// 1 6 7 8 2 4 3 5

// function findParent(node, sourceArr) {
//   // console.log(node, current)
//   if (node.pid === current.id) {
//     return current
//   } else if (current.children) {
//     current.children.forEach(child => {
//       findParent(node, child)
//     })
//   }
// }

// function arrayToTree(sourceArr) {
//   if (sourceArr.length === 0) return []

//   let tree = []
//   const root = sourceArr[0]
//   sourceArr.forEach(node => {
//     const parent = findParent(node, sourceArr)
//     if (parent) {
//       if (parent.children) {
//         parent.children.push(node)
//       } else {
//         parent.children = [ node ]
//       }
//     } else {
//       tree.push[parent]
//     }
//   })
//   return tree
// }  

// const source = [{
//   id: 1,
//   pid: 0,
//   name: 'body'
// }, {
//   id: 2,
//   pid: 1,
//   name: 'title'
// }, {
//   id: 3,
//   pid: 2,
//   name: 'div'
// }]

// console.log(arrayToTree(source))
// 转换为: [{
//           id: 1,
//           pid: 0,
//           name: 'body',
//           children: [{
//                   id: 2,
//                   pid: 1,
//                   name: 'title',
//                   children: [{
//                       id: 3,
//                       pid: 2,
//                       name: 'div'
//                   }]
//               }
//           }]


// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和（字符串）。

// 注意：

// num1 和num2 的长度都小于 5100.

// num1 和num2 都只包含数字 0-9.

// num1 和num2 都不包含任何前导零。

// 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式。


// 算法一 用一个数保存进位
// loop
// pop

// function innerSum(x, y, temp) {
//   let a = 0, b = 0
//   if (x) {
//     a = parseInt(x)
//   }
//   if (y) {
//     b = parseInt(y)
//   }
//   return a + b + temp
// }

// function sum(num1, num2) {
//   let results = []
//   let temp = 0
//   for (let i = num1.length - 1, j = num2.length - 1; i >=0 || j >= 0; i--, j--) {
//     const sum = innerSum(num1[i], num2[j], temp)
//     const res = sum % 10
//     temp = Math.floor(sum / 10)
//     results.unshift(res)
//   }
//   temp && results.unshift(temp)
//   return results.join('')
// }

// console.log(sum('9999', '101'))



function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
/**
* @param {TreeNode} root
* @return {number}
*/

const minDepth = root => {
  if (!root) return 0

  let min = Infinity

  const dfs = (node, depth) => {
    if (!node.left && !node.right) {
      min = depth < min ? depth : min
      return
    }
    node.left && dfs(node.left, depth + 1)
    node.right && dfs(node.right, depth + 1)
  }

  dfs(root, 1)
  return min
};

const root1 = null

const node7 = new TreeNode(7)
const node15 = new TreeNode(15)
const node20 = new TreeNode(20, node15, node7)
// const node9 = new TreeNode(9)
const root = new TreeNode(3, node20)

// console.log(minDepth(root1))
console.log(minDepth(root))
