/*
 * @lc app=leetcode.cn id=138 lang=javascript
 *
 * [138] 随机链表的复制
 * 
 * 解题思路：
 * 这道题采用三步走的方案来解决复制带随机指针的链表：
 * 1. 第一步：在每个原始节点后面创建一个新节点
 *    比如：原始链表：A->B->C 变成 A->A'->B->B'->C->C'
 * 
 * 2. 第二步：设置新节点的随机指针
 *    利用 原节点.random.next 就是新节点的random指向
 * 
 * 3. 第三步：将两个链表分离
 *    把原始链表和复制的链表分开，恢复原始链表的next指向，同时正确设置复制链表的next指向
 */

// @lc code=start
/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

// 节点的构造函数
function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (head === null) {
        return null;
    }

    // 第一步：复制每个节点，并插入到原节点的后面
    for(var node = head; node !== null; node = node.next.next) {
        var copiedNode = new Node(node.val, node.next, null);
        node.next = copiedNode;
    }

    // 第二步：设置新节点的random指针
    for (let node = head; node !== null; node = node.next.next) {
        const nodeNew = node.next;
        // 如果原节点的random不为空，则复制节点的random指向原节点random的下一个节点
        nodeNew.random = (node.random !== null) ? node.random.next : null;
    }

    // 第三步：分离两个链表
    const headNew = head.next; // 保存新链表的头节点
    for (let node = head; node !== null; node = node.next) {
        const nodeNew = node.next;
        // 恢复原链表的next指向
        node.next = node.next.next;
        // 设置新链表的next指向
        nodeNew.next = (nodeNew.next !== null) ? nodeNew.next.next : null;
    }
    return headNew;
};
// @lc code=end

// 辅助函数：从数组创建链表
function createLinkedList(arr) {
    let nodes = [];
    // 首先创建所有节点
    for (let i = 0; i < arr.length; i++) {
        nodes.push(new Node(arr[i][0], null, null));
    }
    // 设置next指针
    for (let i = 0; i < arr.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    // 设置random指针
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] !== null) {
            nodes[i].random = nodes[arr[i][1]];
        }
    }
    return nodes[0];
}

// 辅助函数：打印链表（用于测试）
function printLinkedList(head) {
    let current = head;
    while (current) {
        console.log(`Val: ${current.val}, Random: ${current.random ? current.random.val : 'null'}`);
        current = current.next;
    }
}

// 测试用例：[[7,null],[13,0],[11,4],[10,2],[1,0]]
const head = createLinkedList([[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]);

// 复制随机链表
const copiedHead = copyRandomList(head);

// 打印原始链表和复制的链表进行比较
console.log("Original List:");
printLinkedList(head);

console.log("\nCopied List:");
printLinkedList(copiedHead);
