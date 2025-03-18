/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 *
 * https://leetcode.cn/problems/coin-change/description/
 *
 * algorithms
 * Medium (50.17%)
 * Likes:    3007
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 2M
 * Testcase Example:  '[1,2,5]\n11'
 *
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 * 
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 * 
 * 你可以认为每种硬币的数量是无限的。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3 
 * 解释：11 = 5 + 5 + 1
 * 
 * 示例 2：
 * 
 * 
 * 输入：coins = [2], amount = 3
 * 输出：-1
 * 
 * 示例 3：
 * 
 * 
 * 输入：coins = [1], amount = 0
 * 输出：0
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= coins.length <= 12
 * 1 <= coins[i] <= 2^31 - 1
 * 0 <= amount <= 10^4
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    const valueCoinsDp = new Array(amount + 1).fill(Infinity);

    valueCoinsDp[0] = 0;

    for(let i = 1; i <= amount; i++) {
        for(let j = 0; j < coins.length; j++) {
            if(i - coins[j] === 0) {
                valueCoinsDp[i] = 1;
                // 当处理硬币面额时，它在找到一个面额恰好等于当前金额时会直接break，这导致没有考虑其他可能的更优组合。
            } else if(i > coins[j] && valueCoinsDp[i - coins[j]] !== Infinity) {
                valueCoinsDp[i] = Math.min(valueCoinsDp[i], valueCoinsDp[i - coins[j]] + 1);
            }
        }
    }

    return valueCoinsDp[amount] === Infinity ? -1 : valueCoinsDp[amount];
};
// @lc code=end

// 测试用例
console.log("测试零钱兑换算法");
console.log("=================");

// 测试用例1: 示例1 - 常规情况
const coins1 = [1, 2, 5];
const amount1 = 11;
console.log(`输入: coins = [${coins1}], amount = ${amount1}`);
console.log(`输出: ${coinChange(coins1, amount1)}`);
console.log(`预期: 3 (11 = 5 + 5 + 1)`);
console.log();

// 测试用例2: 示例2 - 无法凑出金额
const coins2 = [2];
const amount2 = 3;
console.log(`输入: coins = [${coins2}], amount = ${amount2}`);
console.log(`输出: ${coinChange(coins2, amount2)}`);
console.log(`预期: -1`);
console.log();

// 测试用例3: 示例3 - 金额为0
const coins3 = [1];
const amount3 = 0;
console.log(`输入: coins = [${coins3}], amount = ${amount3}`);
console.log(`输出: ${coinChange(coins3, amount3)}`);
console.log(`预期: 0`);
console.log();

// 测试用例4: 有多种可能的组合，测试是否找到最优解
const coins4 = [1, 3, 4, 5];
const amount4 = 7;
console.log(`输入: coins = [${coins4}], amount = ${amount4}`);
console.log(`输出: ${coinChange(coins4, amount4)}`);
console.log(`预期: 2 (7 = 3 + 4 或 7 = 1 + 1 + 5，最少需要2个硬币)`);
console.log();

// 测试用例5: 大金额测试
const coins5 = [186, 419, 83, 408];
const amount5 = 6249;
console.log(`输入: coins = [${coins5}], amount = ${amount5}`);
console.log(`输出: ${coinChange(coins5, amount5)}`);
console.log(`预期: 20`);
console.log();

// 特殊边界情况: 面额为1的硬币
const coins6 = [1];
const amount6 = 100;
console.log(`输入: coins = [${coins6}], amount = ${amount6}`);
console.log(`输出: ${coinChange(coins6, amount6)}`);
console.log(`预期: 100 (需要100个面额为1的硬币)`);

