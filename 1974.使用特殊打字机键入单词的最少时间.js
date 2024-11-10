/*
 * @lc app=leetcode.cn id=1974 lang=javascript
 *
 * [1974] 使用特殊打字机键入单词的最少时间
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

function _Node(val, next, random) {
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
   * @param {_Node} head
   * @return {_Node}
   */
  var copyRandomList = function (head) {
    var copiedHead = new _Node(head.val, head);
    head.copiedNode = copiedHead;
    var currentPos = head.next;
    var currentCopiedPos = copiedHead;
  
    while (currentPos) {
      var nextCopiedNode = new CopiedNode(currentPos.val, currentCopiedPos)
      currentPos.copiedNode = nextCopiedNode;
      currentCopiedPos.next = nextCopiedNode;
  
      currentPos = currentPos.next;
    }
  
    return copiedHead;
  };
  
// @lc code=end

