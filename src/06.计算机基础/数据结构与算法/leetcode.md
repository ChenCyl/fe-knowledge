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

## 