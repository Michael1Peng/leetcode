/*
 * @lc app=leetcode.cn id=138 lang=javascript
 *
 * [138] 随机链表的复制
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

function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};

function CopiedNode(val, origin, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
    this.origin = origin;
};

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (head === null) {
        return null;
    }

    for(var node = head; node !== null; node = node.next.next) {
        var copiedNode = new Node(node.val, node.next, null);
        node.next = copiedNode;
    }
    for (let node = head; node !== null; node = node.next.next) {
        const nodeNew = node.next;
        nodeNew.random = (node.random !== null) ? node.random.next : null;
    }
    const headNew = head.next;
    for (let node = head; node !== null; node = node.next) {
        const nodeNew = node.next;
        node.next = node.next.next;
        nodeNew.next = (nodeNew.next !== null) ? nodeNew.next.next : null;
    }
    return headNew;
};

// @lc code=end


// Helper function to create a linked list from an array representation
function createLinkedList(arr) {
    let nodes = [];
    for (let i = 0; i < arr.length; i++) {
        nodes.push(new Node(arr[i][0], null, null));
    }
    for (let i = 0; i < arr.length - 1; i++) {
        nodes[i].next = nodes[i + 1];
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] !== null) {
            nodes[i].random = nodes[arr[i][1]];
        }
    }
    return nodes[0];
}

// Helper function to print a linked list (for testing purposes)
function printLinkedList(head) {
    let current = head;
    while (current) {
        console.log(`Val: ${current.val}, Random: ${current.random ? current.random.val : 'null'}`);
        current = current.next;
    }
}

// Test input: [[7,null],[13,0],[11,4],[10,2],[1,0]]
const head = createLinkedList([[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]);

// Copy the random linked list
const copiedHead = copyRandomList(head);

// Print the original list and the copied list for comparison
console.log("Original List:");
printLinkedList(head);

console.log("\nCopied List:");
printLinkedList(copiedHead);
