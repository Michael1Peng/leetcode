/*
 * @lc app=leetcode.cn id=210 lang=javascript
 *
 * [210] 课程表 II
 * 
 * 解题思路：
 * 1. 这是一道典型的拓扑排序问题，使用BFS（广度优先搜索）实现
 * 2. 首先建立邻接表表示图，并统计每个节点的入度
 * 3. 将所有入度为0的节点加入队列，这些是可以直接学习的课程
 * 4. 每次从队列中取出一个节点，将其加入结果数组，并将其所有相邻节点的入度减1
 * 5. 如果某个节点入度变为0，则将其加入队列
 * 6. 最后检查是否所有节点都被访问过，如果有节点未被访问说明存在环
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    // 创建邻接表存储图
    const map = new Map();
    // 记录每个节点的入度
    const inDegree = new Array(numCourses).fill(0);
    // 存储入度为0的节点的队列
    const queue = [];
    // 存储最终的课程学习顺序
    const result = [];
    
    // 初始化邻接表
    for (let i = 0; i < numCourses; i++) {
        map.set(i, []);
    }
    
    // 如果只有一门课程，直接返回[0]
    if (numCourses < 2) {
        return [0];
    }
    
    // 构建图并统计入度
    // [course, prereq] 表示学习course之前需要先学习prereq
    for (const [course, prereq] of prerequisites) {
        map.get(prereq).push(course);
        inDegree[course]++;
    }
    
    // 将所有入度为0的节点加入队列
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    // BFS处理队列
    while (queue.length > 0) {
        // 取出一个入度为0的节点
        const next = queue.shift();
        // 将该节点加入结果数组
        result.push(next);
        // 获取该节点的所有后继节点
        const list = map.get(next);
        // 从图中删除该节点
        map.delete(next);

        for (const i of list) {
            // 将后继节点的入度减1
            inDegree[i]--;
            // 如果入度变为0，加入队列
            if (inDegree[i] === 0) {
                queue.push(i);
            }
        }
    }
    
    // 如果图中还有节点未被访问（存在环），返回空数组
    // 否则返回结果数组
    return map.size === 0 ? result : [];
};
// @lc code=end

