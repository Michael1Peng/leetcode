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
    // 移除了未使用的currentSize属性，因为可以直接使用cache.size获取当前缓存大小
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
            // 修复：先获取尾部节点的key再删除，而不是直接使用this.tail.key
            // 因为tail是哨兵节点，不包含有效的key值
            const tailNode = this.tail.prev;
            this.cache.delete(tailNode.key);
            this.removeTail();
        }
        const newNode = new ValueNode(key, value);
        this.cache.set(key, newNode);
        // 使用新增的addToHead方法替代直接调用moveToHead
        // 因为对于新节点，不需要先从链表中移除
        this.addToHead(newNode);
    }
};

// 新增方法：专门用于将节点添加到头部
// 这样可以避免代码重复，使结构更清晰
LRUCache.prototype.addToHead = function(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
}

LRUCache.prototype.moveToHead = function(node) {
    // 添加检查：确保节点在链表中才执行移除操作
    // 这样可以避免对不在链表中的节点进行操作导致错误
    if(node.prev !== null && node.next !== null) {
        const originalPrev = node.prev;
        const originalNext = node.next;
        originalPrev.next = originalNext;
        originalNext.prev = originalPrev;
    }
    
    // 使用抽取出来的addToHead方法，减少代码重复
    this.addToHead(node);
}

LRUCache.prototype.removeTail = function() {
    // 获取真正的尾部节点(tail前一个节点)
    const tailNode = this.tail.prev;
    
    // 完全重写方法：正确处理尾节点的移除
    // 原方法只是设置lastTwoNode.next = null，会导致链表断裂
    // 正确做法是将倒数第二个节点直接与尾部哨兵相连
    tailNode.prev.next = this.tail;
    this.tail.prev = tailNode.prev;
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

// 测试代码
console.log("测试LRU缓存实现");
console.log("==================");

// 创建容量为2的缓存
const lru = new LRUCache(2);

// 测试1: 基本操作
console.log("测试1: 基本操作");
lru.put(1, 1); // 缓存是 {1=1}
lru.put(2, 2); // 缓存是 {1=1, 2=2}
console.log("get(1) 期望值=1, 实际值=" + lru.get(1)); // 返回 1
lru.put(3, 3); // 移除 key 2, 缓存是 {1=1, 3=3}
console.log("get(2) 期望值=-1, 实际值=" + lru.get(2)); // 返回 -1 (未找到)
lru.put(4, 4); // 移除 key 1, 缓存是 {4=4, 3=3}
console.log("get(1) 期望值=-1, 实际值=" + lru.get(1)); // 返回 -1 (未找到)
console.log("get(3) 期望值=3, 实际值=" + lru.get(3)); // 返回 3
console.log("get(4) 期望值=4, 实际值=" + lru.get(4)); // 返回 4

// 测试2: 更新现有值
console.log("\n测试2: 更新现有值");
const lru2 = new LRUCache(2);
lru2.put(1, 1);
lru2.put(2, 2);
console.log("get(1) 期望值=1, 实际值=" + lru2.get(1)); // 返回 1
lru2.put(1, 10); // 更新key 1
console.log("get(1) 期望值=10, 实际值=" + lru2.get(1)); // 返回 10
lru2.put(3, 3); // 应该移除key 2
console.log("get(2) 期望值=-1, 实际值=" + lru2.get(2)); // 返回 -1
console.log("get(3) 期望值=3, 实际值=" + lru2.get(3)); // 返回 3

console.log("\n测试完成!");
