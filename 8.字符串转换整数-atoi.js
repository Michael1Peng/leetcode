/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
    let matchRegex = /^[-+]?\d+/;
    const trimedStr = str.trim();
    let matchRegexResult = trimedStr.match(matchRegex);
    let resultStr = matchRegexResult?.[0]

    if (!resultStr) {
        return 0;
    }
    let result = parseInt(resultStr);

    if (result > Math.pow(2, 31) - 1) {
        return Math.pow(2, 31) - 1;
    }

    if (result < Math.pow(-2, 31)) {
        return Math.pow(-2, 31);
    }

    return result;
};
// @lc code=end

myAtoi('words and 987')
