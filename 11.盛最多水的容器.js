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

