// import visualization libraries {
const {
  Tracer,
  Array1DTracer,
  LogTracer,
  Randomize,
  Layout,
  VerticalLayout,
} = require("algorithm-visualizer");
// }

// define tracer variables {
const inputTracer = new Array1DTracer("输入数组");
const heapTracer = new Array1DTracer("最小堆");
const logger = new LogTracer("操作日志");
Layout.setRoot(new VerticalLayout([inputTracer, heapTracer, logger]));

// 随机生成一个大小为10的数组，元素值在0到99之间
const nums = Randomize.Array1D({
  N: 10,
  value: () => Randomize.Integer({ min: 0, max: 99 }),
});
// 生成一个k值，介于1和数组长度之间
const k = Randomize.Integer({ min: 1, max: nums.length });

inputTracer.set(nums);
heapTracer.set([]);
logger.println(`寻找数组中第 ${k} 个最大元素`);
Tracer.delay();
// }

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
    // logger {
    logger.println(`添加元素 ${val} 到堆中`);
    // }

    this.heap.push(val);

    // visualize {
    heapTracer.set(this.heap.slice());
    Tracer.delay();
    // }

    this.bubbleUp(this.size() - 1); // 向上调整堆
  }

  // 移除并返回堆顶元素
  poll() {
    if (this.size() === 0) return null;
    if (this.size() === 1) {
      const result = this.heap.pop();

      // visualize {
      heapTracer.set(this.heap.slice());
      Tracer.delay();
      // }

      return result;
    }

    const result = this.heap[0];

    // logger {
    logger.println(`移除堆顶元素 ${result}`);
    // }

    this.heap[0] = this.heap.pop(); // 将最后一个元素移到堆顶

    // visualize {
    heapTracer.patch(0, this.heap[0]);
    Tracer.delay();
    heapTracer.depatch(0);
    // }

    this.bubbleDown(0); // 向下调整堆

    return result;
  }

  // 向上调整堆，维护最小堆性质
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2); // 计算父节点索引

      // visualize {
      heapTracer.select(index);
      heapTracer.select(parentIndex);
      logger.println(
        `比较 ${this.heap[index]} 和父节点 ${this.heap[parentIndex]}`
      );
      Tracer.delay();
      // }

      if (this.heap[parentIndex] > this.heap[index]) {
        // 如果父节点大于当前节点，交换它们

        // logger {
        logger.println(`交换 ${this.heap[parentIndex]} 和 ${this.heap[index]}`);
        // }

        [this.heap[parentIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIndex],
        ];

        // visualize {
        heapTracer.patch(parentIndex, this.heap[parentIndex]);
        heapTracer.patch(index, this.heap[index]);
        Tracer.delay();
        heapTracer.depatch(parentIndex);
        heapTracer.depatch(index);
        // }

        index = parentIndex;
      } else {
        // visualize {
        heapTracer.deselect(index);
        heapTracer.deselect(parentIndex);
        // }
        break;
      }

      // visualize {
      heapTracer.deselect(index);
      heapTracer.deselect(parentIndex);
      // }
    }
  }

  // 向下调整堆，维护最小堆性质
  bubbleDown(index) {
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1; // 左子节点索引
      const rightChild = 2 * index + 2; // 右子节点索引

      // visualize {
      heapTracer.select(index);
      Tracer.delay();
      // }

      // 找到当前节点、左子节点和右子节点中的最小值
      if (leftChild < this.size()) {
        // visualize {
        heapTracer.select(leftChild);
        logger.println(
          `比较 ${this.heap[smallest]} 和左子节点 ${this.heap[leftChild]}`
        );
        Tracer.delay();
        // }

        if (this.heap[leftChild] < this.heap[smallest]) {
          smallest = leftChild;
        }

        // visualize {
        heapTracer.deselect(leftChild);
        // }
      }

      if (rightChild < this.size()) {
        // visualize {
        heapTracer.select(rightChild);
        logger.println(
          `比较 ${this.heap[smallest]} 和右子节点 ${this.heap[rightChild]}`
        );
        Tracer.delay();
        // }

        if (this.heap[rightChild] < this.heap[smallest]) {
          smallest = rightChild;
        }

        // visualize {
        heapTracer.deselect(rightChild);
        // }
      }

      // 如果最小值不是当前节点，则交换并继续向下调整
      if (smallest !== index) {
        // logger {
        logger.println(`交换 ${this.heap[index]} 和 ${this.heap[smallest]}`);
        // }

        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];

        // visualize {
        heapTracer.patch(index, this.heap[index]);
        heapTracer.patch(smallest, this.heap[smallest]);
        Tracer.delay();
        heapTracer.depatch(index);
        heapTracer.depatch(smallest);
        // }

        index = smallest;
      } else {
        // visualize {
        heapTracer.deselect(index);
        // }
        break;
      }

      // visualize {
      heapTracer.deselect(index);
      // }
    }
  }
}

function findKthLargest(nums, k) {
  // 创建最小堆实例
  const heap = new MinHeap();

  // logger {
  logger.println("开始处理数组元素");
  // }

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    // visualize {
    inputTracer.select(i);
    logger.println(`处理元素: ${num}`);
    Tracer.delay();
    // }

    if (heap.size() < k) {
      // 如果堆的大小小于k，直接添加
      logger.println(`堆大小 < ${k}，直接添加元素 ${num}`);
      heap.add(num);
    } else if (num > heap.peek()) {
      // 如果当前元素大于堆顶元素，移除堆顶并添加当前元素
      logger.println(`${num} > 堆顶元素 ${heap.peek()}，替换堆顶`);
      heap.poll();
      heap.add(num);
    } else {
      // logger {
      logger.println(`${num} <= 堆顶元素 ${heap.peek()}，忽略`);
      // }
    }

    // visualize {
    inputTracer.deselect(i);
    // }
  }

  // logger {
  logger.println(`第 ${k} 个最大元素是: ${heap.peek()}`);
  // }

  // visualize {
  heapTracer.select(0);
  // }

  // 返回堆顶元素，即第k大的元素
  return heap.peek();
}

// 执行算法
findKthLargest(nums, k);
