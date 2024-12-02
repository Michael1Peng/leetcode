/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 * 
 * 解题思路：
 * 1. 使用最小堆来解决这个问题。维护一个大小为k的最小堆，这样堆顶就是第k大的元素
 * 2. 遍历数组时：
 *    - 如果堆的大小小于k，直接添加元素
 *    - 如果堆的大小等于k，则将当前元素与堆顶元素比较：
 *      - 如果当前元素大于堆顶元素，则移除堆顶元素，添加当前元素
 *      - 否则忽略当前元素
 * 3. 遍历结束后，堆顶元素即为第k大的元素
 * 时间复杂度：O(nlogk)，空间复杂度：O(k)
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    // 创建最小堆类
    class MinHeap {
        constructor() {
            this.heap = []; // 使用数组存储堆
        }
        
        // 返回堆的大小
        size() {
            return this.heap.length;
        }
        
        // 返回堆顶元素
        peek() {
            return this.heap[0];
        }
        
        // 添加元素到堆中
        add(val) {
            this.heap.push(val);
            this.bubbleUp(this.size() - 1); // 向上调整堆
        }
        
        // 移除并返回堆顶元素
        poll() {
            if (this.size() === 0) return null;
            if (this.size() === 1) return this.heap.pop();
            
            const result = this.heap[0];
            this.heap[0] = this.heap.pop(); // 将最后一个元素移到堆顶
            this.bubbleDown(0); // 向下调整堆
            return result;
        }
        
        // 向上调整堆，维护最小堆性质
        bubbleUp(index) {
            while (index > 0) {
                const parentIndex = Math.floor((index - 1) / 2); // 计算父节点索引
                if (this.heap[parentIndex] > this.heap[index]) {
                    // 如果父节点大于当前节点，交换它们
                    [this.heap[parentIndex], this.heap[index]] = 
                    [this.heap[index], this.heap[parentIndex]];
                    index = parentIndex;
                } else {
                    break;
                }
            }
        }
        
        // 向下调整堆，维护最小堆性质
        bubbleDown(index) {
            while (true) {
                let smallest = index;
                const leftChild = 2 * index + 1;  // 左子节点索引
                const rightChild = 2 * index + 2; // 右子节点索引
                
                // 找到当前节点、左子节点和右子节点中的最小值
                if (leftChild < this.size() && this.heap[leftChild] < this.heap[smallest]) {
                    smallest = leftChild;
                }
                if (rightChild < this.size() && this.heap[rightChild] < this.heap[smallest]) {
                    smallest = rightChild;
                }
                
                // 如果最小值不是当前节点，则交换并继续向下调整
                if (smallest !== index) {
                    [this.heap[index], this.heap[smallest]] = 
                    [this.heap[smallest], this.heap[index]];
                    index = smallest;
                } else {
                    break;
                }
            }
        }
    }
    
    // 使用最小堆找第k大元素
    const heap = new MinHeap();
    for (const num of nums) {
        if (heap.size() < k) {
            // 如果堆的大小小于k，直接添加
            heap.add(num);
        } else if (num > heap.peek()) {
            // 如果当前元素大于堆顶元素，移除堆顶并添加当前元素
            heap.poll();
            heap.add(num);
        }
    }
    
    // 返回堆顶元素，即第k大的元素
    return heap.peek();
};
// @lc code=end

