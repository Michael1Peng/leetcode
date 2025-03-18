/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s 输入字符串
 * @return {number} 返回最长无重复字符子串的长度
 */
var lengthOfLongestSubstring = function (s) {
    // 定义滑动窗口的头指针
    var headIndex = 0;
    // 定义滑动窗口的尾指针
    var tailIndex = 0;
    // 使用对象作为哈希表，记录字符是否出现过
    var showMap = {};
    // 记录最长无重复字符子串的长度
    var maxLength = 0;

    // 当尾指针未到达字符串末尾时继续循环
    while (tailIndex < s.length) {
        // 获取尾指针指向的字符
        var tailChar = s.charAt(tailIndex);
        // 获取头指针指向的字符
        var headChar = s.charAt(headIndex);

        // 如果尾指针指向的字符已经在当前窗口中出现过
        if (showMap[tailChar]) {
            // 更新最大长度（当前窗口的长度）
            maxLength = Math.max(maxLength, tailIndex - headIndex);
            // 将头指针指向的字符标记为未使用
            showMap[headChar] = false;
            // 头指针向前移动一位，缩小窗口
            headIndex++;
        } else {
            // 如果字符未出现过，将其标记为已使用
            showMap[tailChar] = true;
            // 尾指针向前移动，扩大窗口
            tailIndex++;
        }

        // 特殊情况：当头尾指针重合时
        if (headIndex === tailIndex) {
            // 将当前字符标记为已使用
            showMap[tailChar] = true;
            // 移动尾指针
            tailIndex++;
        }
    }

    // 循环结束后，再次计算最大长度
    // 处理最后一个窗口的情况
    maxLength = Math.max(maxLength, tailIndex - headIndex);
    return maxLength;
};
// @lc code=end



    // Return the maximum length of substring without repeating characters.
