/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 *
 * https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/
 *
 * algorithms
 * Medium (72.95%)
 * Likes:    2925
 * Dislikes: 0
 * Total Accepted:    897.9K
 * Total Submissions: 1.2M
 * Testcase Example:  '[3,5,1,6,2,0,8,null,null,7,4]\n5\n1'
 *
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 
 * 百度百科中最近公共祖先的定义为："对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x
 * 的深度尽可能大（一个节点也可以是它自己的祖先）。"
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出：3
 * 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * 输出：5
 * 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：root = [1,2], p = 1, q = 2
 * 输出：1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数目在范围 [2, 10^5] 内。
 * -10^9 
 * 所有 Node.val 互不相同 。
 * p != q
 * p 和 q 均存在于给定的二叉树中。
 * 
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // 移除全局变量 answer，避免多次调用函数时互相影响
    // 直接返回 dfs 的结果，不再需要中间变量
    return deepFirstSearch(root, p, q);
};

/**
 * 使用后序遍历（自底向上）查找最近公共祖先
 * @param {TreeNode} root 当前节点
 * @param {TreeNode} p 目标节点1
 * @param {TreeNode} q 目标节点2
 * @return {TreeNode} 找到的最近公共祖先节点
 */
var deepFirstSearch = function(root, p, q) {
    // 基础情况：如果当前节点为空或者是p或q中的一个，则返回当前节点
    if(root === null || root === p || root === q) {
        return root;
    }

    // 递归搜索左右子树
    const left = deepFirstSearch(root.left, p, q);
    const right = deepFirstSearch(root.right, p, q);

    // 情况1：如果左右子树分别找到了p和q，则当前节点就是LCA
    if(left !== null && right !== null) {
        return root;
    }
    
    // 情况2：如果只在一侧找到了p或q，返回该侧的结果
    // 情况3：如果两侧都没找到，返回null
    return left !== null ? left : right;
}
// @lc code=end

// 测试用例代码
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// 创建测试树1：示例1的树 [3,5,1,6,2,0,8,null,null,7,4]
function createTestTree1() {
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    root.right.left = new TreeNode(0);
    root.right.right = new TreeNode(8);
    root.left.right.left = new TreeNode(7);
    root.left.right.right = new TreeNode(4);
    return root;
}

// 创建测试树2：简单树 [1,2,3]
function createTestTree2() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    return root;
}

// 创建测试树3：单边树 [1,2,null,3,null,4]
function createTestTree3() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.left.left = new TreeNode(4);
    return root;
}

// 运行测试用例
console.log("测试二叉树的最近公共祖先算法");
console.log("==================");

// 测试用例1：示例1中的例子
const tree1 = createTestTree1();
const result1 = lowestCommonAncestor(tree1, tree1.left, tree1.right); // p=5, q=1
console.log("测试1: p=5, q=1 的LCA应该是3, 实际结果=" + (result1 ? result1.val : "null"));

// 测试用例2：示例2中的例子
const tree1_2 = createTestTree1();
const result2 = lowestCommonAncestor(tree1_2, tree1_2.left, tree1_2.left.right.right); // p=5, q=4
console.log("测试2: p=5, q=4 的LCA应该是5, 实际结果=" + (result2 ? result2.val : "null"));

// 测试用例3：简单树
const tree2 = createTestTree2();
const result3 = lowestCommonAncestor(tree2, tree2.left, tree2.right); // p=2, q=3
console.log("测试3: p=2, q=3 的LCA应该是1, 实际结果=" + (result3 ? result3.val : "null"));

// 测试用例4：单边树，测试节点在同一条路径上的情况
const tree3 = createTestTree3();
const result4 = lowestCommonAncestor(tree3, tree3.left, tree3.left.left.left); // p=2, q=4
console.log("测试4: p=2, q=4 的LCA应该是2, 实际结果=" + (result4 ? result4.val : "null"));

console.log("\n测试完成!");

