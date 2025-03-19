/*
 * @lc app=leetcode.cn id=324 lang=javascript
 *
 * [324] 摆动排序 II
 *
 * https://leetcode.cn/problems/wiggle-sort-ii/description/
 *
 * algorithms
 * Medium (41.19%)
 * Likes:    612
 * Dislikes: 0
 * Total Accepted:    73K
 * Total Submissions: 177.2K
 * Testcase Example:  '[1,5,1,1,6,4]'
 *
 * 给你一个整数数组 nums，将它重新排列成 nums[0] < nums[1] > nums[2] < nums[3]... 的顺序。
 * 
 * 你可以假设所有输入数组都可以得到满足题目要求的结果。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [1,5,1,1,6,4]
 * 输出：[1,6,1,5,1,4]
 * 解释：[1,4,1,5,1,6] 同样是符合题目要求的结果，可以被判题程序接受。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [1,3,2,2,3,1]
 * 输出：[2,3,1,3,1,2]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 0 
 * 题目数据保证，对于给定的输入 nums ，总能产生满足题目要求的结果
 * 
 * 
 * 
 * 
 * 进阶：你能用 O(n) 时间复杂度和 / 或原地 O(1) 额外空间来实现吗？
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function(nums) {
    nums.sort((a, b) => a - b);

    const n = nums.length;
    const ans = new Array(n).fill(0);

    let left = Math.floor((n + 1) / 2) - 1;
    let right = n - 1;

    for(let i = 0; i < n; i++) {
        if(i % 2 === 0) {
            ans[i] = nums[left--];
        } else {
            ans[i] = nums[right--];
        }
    }

    for(let i = 0; i < n; i++) {
        nums[i] = ans[i];
    }


};
// @lc code=end

