/*
 * @lc app=leetcode.cn id=208 lang=javascript
 *
 * [208] 实现 Trie (前缀树)
 * 
 * 解题思路：
 * 1. Trie（前缀树）是一种树形数据结构，用于高效地存储和检索字符串。
 * 2. 每个节点包含：
 *    - 当前字符值
 *    - 子节点映射（使用 Map 存储）
 *    - 是否为单词结尾的标记
 * 3. 主要实现三个操作：
 *    - insert: 插入单词，遍历字符串，为每个字符创建或更新节点
 *    - search: 查找完整单词，需要检查最后一个节点是否为单词结尾
 *    - startsWith: 查找前缀，只需要确认路径存在即可
 */

// 定义 Trie 树的节点结构
class TrieNode {
    constructor(v) {
        this.value = v;              // 节点存储的字符值
        this.children = new Map();    // 子节点映射表
        this.isLeaf = false;         // 标记是否为单词的结尾
    }
}

class Trie {
    /**
     * 初始化前缀树数据结构
     */
    constructor() {
        this.root = new TrieNode('/');  // 创建根节点，使用 '/' 作为哨兵
    }

    /**
     * 向前缀树中插入一个单词
     * @param {string} word 要插入的单词
     * @return {void}
     */
    insert(word) {
        let node = this.root;
        // 遍历单词的每个字符
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if(!node.children.has(char)) {
                // 如果字符不存在，创建新节点
                const newNode = new TrieNode(char);
                node.children.set(char, newNode);
            }
            // 移动到子节点
            node = node.children.get(char);
        }
        // 标记单词结尾
        node.isLeaf = true;
    }

    /**
     * 查找前缀树中是否存在完整单词
     * @param {string} word 要查找的单词
     * @return {boolean}
     */
    search(word) {
        let node = this.root;
        // 遍历要查找的单词的每个字符
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            // 如果字符不存在，说明单词不存在
            if (!node.children.has(char)) {
                return false;
            }
            // 移动到子节点
            node = node.children.get(char);
        }
        // 需要检查最后一个节点是否为单词结尾
        return node.isLeaf;
    }

    /**
     * 查找前缀树中是否存在指定的前缀
     * @param {string} prefix 要查找的前缀
     * @return {boolean}
     */
    startsWith(prefix) {
        let node = this.root;
        // 遍历前缀的每个字符
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            // 如果字符不存在，说明前缀不存在
            if (!node.children.has(char)) {
                return false;
            }
            // 移动到子节点
            node = node.children.get(char);
        }
        // 只要能遍历完所有字符，说明前缀存在
        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end

// const trie = new Trie();
// trie.insert("apple");
// console.log(trie.search("apple"));   // 返回 True
// console.log(trie.search("app"));     // 返回 False
// console.log(trie.startsWith("app")); // 返回 True
// trie.insert("app");
// console.log(trie.search("app"));     // 返回 True
