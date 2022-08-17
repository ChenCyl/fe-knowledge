本周做了几道 leetcode 的题目，在此分享。

### 顺序数组去重

> 题目地址：https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

因为这道题要求O(n)的时间复杂度， O(1)的空间复杂度，所以这道题的思路一般是采用**双指针**。

1. 思路：

使用快慢指针来记录遍历的坐标。

- 开始时这两个指针都指向第一个数字

- 如果两个指针指的数字相同，则快指针向前走一步

- 如果不同，慢指针先向前走一步，将快指针指向的值赋给慢指针，接着快指针向前走一步

- 当快指针走完整个数组后，慢指针当前的坐标加 1 就是数组中不同数字的个数

2. 解题

```javascript
function(arr) {
    const size = arr.length;
    let slowP = 0;
    for (let fastP = 0; fastP < size; fastP++) {
        if (arr[fastP] !== arr[slowP]) {
            slowP++;
            arr[slowP] = arr[fastP]
        }
    }
    return slowP + 1;
};
```

---

# 刷题记录与复盘

## Tree

| Index | Title                                                        | Solutions                      |
| ----- | ------------------------------------------------------------ | ------------------------------ |
|       |                                                              |                                |
| 95    | [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/description/) | 递归、循环、Morris             |
|       |                                                              |                                |
| 96    | [Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/description/) | 动态规划、卡塔兰数             |
| 98    | [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/description/) | 递归、中序遍历                 |
| 99    | [Recover Binary Search Tree](https://leetcode.com/problems/recover-binary-search-tree/description/) | 中序遍历（显式、隐式、Morris） |
| 100   | [Same Tree](https://leetcode.com/problems/same-tree/description/) | BFS、DFS                       |
| 101   | [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/description/) |                                |
| 102   | [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/description/) |                                |
| 103   | [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/) |                                |
| 104   | [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/) |                                |
| 105   | [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/) | 递归、迭代？                   |
| 106   | [Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/) |                                |
| 107   | [Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/) |                                |
| 108   | [Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/) | 中序遍历                       |
| 110   | [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/description/) | 递归（自底向上、自上而下）     |
| 111   | [Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/description/) |                                |
| 112   | [Path Sum](https://leetcode.com/problems/path-sum/description/) |                                |
| 113   | [Path Sum II](https://leetcode.com/problems/path-sum-ii/description/) |                                |
|       |                                                              |                                |
|       |                                                              |                                |

