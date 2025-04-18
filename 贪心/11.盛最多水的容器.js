/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
// [[贪心算法]]
// 解题思路： 
// 1. 使用双指针法，初始化左指针left和右指针right分别指向数组的起始和结束位置，这样能获得最大宽度。
// 2. 计算当前左右指针所形成的容器的面积，并记录最大面积。
// 3. 移动指针的策略是：每次移动高度较小的那个指针，因为移动高度较大的指针不会增加面积。
// 4. 重复步骤2和3，直到左右指针相遇。
// 5. 返回记录的最大面积。
/**
 * @param {number[]} height
 * @return {number}
 */
// 定义一个函数 maxArea，用于计算给定高度数组中可以容纳最多水的容器面积
var maxArea = function (height) {
  // 初始化最大面积 maxA 为 0，左指针 l 为 0，右指针 r 为数组最后一个元素的索引
  let maxA = 0, l = 0, r = height.length - 1;
  
  // 当左指针小于右指针时，继续循环
  while (l < r) {
    // 计算当前容器的面积，并更新最大面积 maxA
    maxA = Math.max(maxA, Math.min(height[l], height[r]) * (r - l));
    
    // 如果左指针的高度大于右指针的高度，右指针向左移动一位
    if (height[l] > height[r])
      r--;
    // 否则，左指针向右移动一位
    else
      l++;
  }
  
  // 返回计算得到的最大面积
  return maxA;
};
// @lc code=end

/* 
<think>
嗯，用户问为什么这个问题可以用贪心算法。我需要先回忆一下题目和解决方案。题目是盛最多水的容器，用双指针的方法，每次移动较矮的一边。贪心算法通常是通过局部最优选择来达到全局最优。那这里的关键是，为什么每次移动较矮的指针是正确的选择，不会错过更大的面积？

首先，容器的面积由两个因素决定：宽度和高度。双指针初始时宽度最大，之后每次移动指针，宽度都会减少。所以为了保持可能的更大面积，必须让高度尽可能高。

当左右指针的高度不同时，移动较高的那个指针，因为即使那个指针的下一个更高，由于宽度在减少，新的高度可能受限于原来的较矮指针，所以面积不会更大。而移动较矮的指针，虽然宽度减少，但有可能找到更高的高度，从而弥补宽度的损失。

比如，假设左边高度是3，右边是5，此时面积是3*(r-l)。如果移动右边到4的位置，那么高度还是3，宽度更小，面积肯定更小。但如果移动左边，可能找到更高的比如4，那么面积是4*(r-l-1)，可能更大。

所以每次选择移动较矮的一边，是局部最优的，因为这样保留了可能增加高度的机会，而放弃了不可能的情况。这样一步步做下去，最终能得到全局最优解。

另外，贪心选择在这里的正确性需要数学证明。假设存在一个最优解，其中某个步骤没有移动较矮的指针，那么通过反证法可以证明这种情况不可能存在，因为移动较高的指针无法得到更大的面积。因此，贪心策略是正确的。
</think>

这个问题适用贪心算法是因为存在以下两个关键性质：

1. **贪心选择性质**：
每次移动较矮的指针是局部最优选择。假设当前左右指针高度为 h[l] 和 h[r]：
- 若 h[l] < h[r]，移动右指针会导致宽度减少且高度不会超过 h[l]
- 移动左指针虽然宽度减少，但可能找到更高的 h[l']
- 因此移动较矮指针保留了找到更大面积的可能性

2. **最优子结构**：
每个步骤的选择都会影响后续步骤，但通过保持"可能获得更大面积"的指针，可以保证全局最优解存在于这些局部选择中

数学证明（反证法）：
假设存在最优解 O 的指针位置为 (i,j)，当算法运行到某个中间状态 (l,r) 时：
- 若 h[l] < h[r]，根据算法我们会移动左指针
- 如果最优解 O 的左指针 > l，则说明我们移动左指针的决策没有错过最优解
- 因为当 h[l] < h[r] 时，所有 (l, r-k) 的组合面积都小于 (l, r) 的面积

这种每次决策只关注当前最优，且能保证全局最优的特性，正是贪心算法适用的典型场景。
*/
