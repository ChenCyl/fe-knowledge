

## Tree

### Inorder traversal

Time complexity: $$O(n)$$

- The time complexity is $$O(n)$$ because the recursive function is $$T(n) = 2 \cdot T(n/2)+1$$
- 直观理解：只有"访问"这个操作是花时间的，每个节点访问一次。

Space complexity: $$O(n)$$

- The worst case space required is $$O(n)$$, and in the average case it's $$O(\log n)$$ where $$n$$ is number of nodes.

- [ ] 用脑子过一遍所有的算法 不用都写 可以选择性地写一两个

---


<ul><li data-pid="GohwL6PH">数组，队列，栈</li><li data-pid="tO7oh3tX">链表</li><li data-pid="_ZlPwFyc">树与递归</li><li data-pid="g2hKSytd">哈希表</li><li data-pid="NVXL1Vnb">双指针</li></ul>

<ul><li data-pid="b7OTw6t5">二分</li><li data-pid="vTbvcp3n">滑动窗口</li><li data-pid="_cp7uKEG">搜索（BFS，DFS，回溯）</li><li data-pid="ZyW-20eq">动态规划</li></ul>

<ul><li data-pid="oXT6fbon">贪心</li><li data-pid="gdNuVZ1h">分治</li><li data-pid="8j3JroMl">位运算</li><li data-pid="oJEPEE5A">KMP &amp; RK</li><li data-pid="tANH4CdV">并查集</li><li data-pid="tEK8JtUj">前缀树</li><li data-pid="GnJ6254d">线段树</li><li data-pid="RcSxhKf2">堆</li></ul>

---

二叉树遍历的三种方法：递归，循环，[Morris traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/solution/)

---

二叉树

- BST
  - morris 和 中序遍历
  - 递归 (start, end)
- 高度平衡
  - 高度平衡且 BST，根节点一定是中序遍历的中间节点（或之一）
  - 二叉树的高度 === 递归次数
- 广度优先搜索
  - 借助一个数组保存一层的节点
- 深度优先
  - 先序遍历
  - 中序遍历
  - 后序遍历



