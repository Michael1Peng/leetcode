/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第 K 小的元素
 * 
 * 解题思路：
 * 1. 利用二叉搜索树的特性：中序遍历会按照升序访问所有节点
 * 2. 使用计数器记录已经访问的节点数量
 * 3. 当访问到第 k 个节点时，即为所求的结果
 * 4. 使用递归方式实现中序遍历：左子树 -> 根节点 -> 右子树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root - 二叉搜索树的根节点
 * @param {number} k - 要找的第 k 小的元素
 * @return {number} - 返回第 k 小的元素值
 */
var kthSmallest = function(root, k) {
    // 用于记录已经访问的节点数量
    let count = 0;
    
    // 中序遍历函数
    function inorder(node) {
        // 如果节点为空，返回 null
        if (!node) return null;
        
        // 先遍历左子树
        let temp = inorder(node.left);
        if (temp !== null) return temp;
        
        // 处理当前节点
        count++;
        // 如果是第 k 个节点，返回其值
        if (count === k) return node.val;
        
        // 最后遍历右子树
        return inorder(node.right);
    }
    
    return inorder(root);
};
// @lc code=end

