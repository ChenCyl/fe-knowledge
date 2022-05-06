function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
/**
* @param {ListNode} head
* @param {number} n
* @return {ListNode}
*/
var removeNode = function(preNode) {
  const removedNode = preNode.next
  preNode.next = removedNode.next
  delete removeNode
}

var removeNthFromEnd = function(head, n) {
  let p1 = head
  let p2 = head // 被删除节点的上一个节点 todo: 长度为0和1时的特殊情况

  for(let i = n; i > 0; i--) {
    p1 = p1.next
  }

  if (!p1) {
    const temp = head
    head = head.next
    temp.next = null
  } else {
    while(p1.next) {
      p1 = p1.next
      p2 = p2.next
    }
    removeNode(p2)
  }

  return head
};

const node5 = new ListNode(5)
const node4 = new ListNode(4, node5)
const node3 = new ListNode(3, node4)
const node2 = new ListNode(2, node3)
const node1 = new ListNode(1, node2)

console.log(`before: ${node1.val}-${node1.next.val}-${node2.next.val}-${node3.next.val}-${node4.next.val}`)
// removeNthFromEnd(node1, 2)
// console.log(`after: ${node1.val}-${node1.next.val}-${node2.next.val}-${node3.next.val}`)
const head = removeNthFromEnd(node1, 5)
// console.log(`before: ${head.val}-${head.next.val}-${head.next.next.val}-${head.next.next.next.val}-${head.next.next.next.next}`)
console.log()
// console.log(`before: ${node1.val}-${node1.next.val}-${node1.next.next.val}-${node1.next.next.next.val}-${node1.next.next.next.next}`)
