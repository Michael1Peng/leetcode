/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存
 */

// @lc code=start
var ValueNode = function(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.currentSize = 0;
    this.cache = new Map();
    this.head = new ValueNode();
    this.tail = new ValueNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(!this.cache.has(key)) {
        return -1;
    }
    const node = this.cache.get(key);
    this.moveToHead(node);
    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.cache.has(key)) {
        const node = this.cache.get(key);
        node.value = value;
        this.moveToHead(node);
    } else {
        if(this.cache.size >= this.capacity) {
            this.cache.delete(this.tail.key);
            this.removeTail();
        }
        const newNode = new ValueNode(key, value);
        this.cache.set(key, newNode);
        this.moveToHead(newNode);
    }
};

LRUCache.prototype.moveToHead = function(node) {
    const originalPrev = node.prev;
    const originalNext = node.next;

    originalPrev.next = originalNext;
    originalNext.prev = originalPrev;

    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
}

LRUCache.prototype.removeTail = function() {
    const lastTwoNode = this.tail.prev;
    lastTwoNode.next = null;
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

