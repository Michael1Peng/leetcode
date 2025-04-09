// import visualization libraries {
const {
  Tracer,
  Array1DTracer,
  ChartTracer,
  LogTracer,
  Randomize,
  Layout,
  VerticalLayout,
} = require("algorithm-visualizer");
// }

// define tracer variables {
const chart = new ChartTracer();
const tracer = new Array1DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([chart, tracer, logger]));
const D = Randomize.Array1D({ N: 15 });
tracer.set(D);
tracer.chart(chart);
Tracer.delay();
// }

// logger {
logger.println(`原始数组 = [${D.join(", ")}]`);
logger.println(`---------------------------------------------`);
logger.println(`【快速排序算法】`);
logger.println(`快速排序是一种高效的分治排序算法，由Tony Hoare于1960年提出`);
logger.println(`平均时间复杂度为O(n log n)，最坏情况为O(n²)`);
logger.println(`基本思想：选择一个基准值(pivot)，将数组分为两部分：`);
logger.println(`  - 左侧：所有元素小于或等于基准值`);
logger.println(`  - 右侧：所有元素大于基准值`);
logger.println(`然后递归地对这两部分进行排序`);
logger.println(`---------------------------------------------`);
// }

function partition(D, low, high) {
  let i;
  let j;
  let s;

  // logger {
  logger.println(
    `开始处理子数组 [${low}..${high}]：[${D.slice(low, high + 1).join(", ")}]`
  );
  // }

  while (high > low) {
    i = low;
    j = high;
    s = D[low];

    // logger {
    logger.println(`选择基准值(pivot): ${s} (位置: ${low})`);
    logger.println(`初始化左指针i=${i}，右指针j=${j}`);
    // }

    while (i < j) {
      // visualize {
      tracer.select(high);
      tracer.select(low);
      Tracer.delay();
      // }

      // logger {
      logger.println(`开始从右向左查找第一个小于等于基准值的元素`);
      // }

      while (D[j] > s) {
        // visualize {
        tracer.select(j);
        Tracer.delay();
        tracer.deselect(j);
        // }

        // logger {
        logger.println(`  检查位置 ${j}: ${D[j]} > ${s}，向左移动j`);
        // }

        j--;
      }

      // logger {
      logger.println(`  找到元素 ${D[j]} 在位置 ${j} (小于等于基准值${s})`);
      logger.println(`  将位置 ${j} 的元素 ${D[j]} 移动到位置 ${i}`);
      // }

      D[i] = D[j];
      // visualize {
      tracer.patch(i, D[j]);
      Tracer.delay();
      tracer.depatch(i);
      // }

      // logger {
      logger.println(`开始从左向右查找第一个大于基准值的元素`);
      // }

      while (s >= D[i] && i < j) {
        // visualize {
        tracer.select(i);
        Tracer.delay();
        tracer.deselect(i);
        // }

        // logger {
        logger.println(`  检查位置 ${i}: ${D[i]} <= ${s}，向右移动i`);
        // }

        i++;
      }

      // logger {
      if (i < j) {
        logger.println(`  找到元素 ${D[i]} 在位置 ${i} (大于基准值${s})`);
        logger.println(`  将位置 ${i} 的元素 ${D[i]} 移动到位置 ${j}`);
      } else {
        logger.println(`  左指针i与右指针j相遇在位置 ${i}`);
      }
      // }

      D[j] = D[i];
      // visualize {
      tracer.patch(j, D[i]);
      Tracer.delay();
      tracer.depatch(j);
      tracer.deselect(high);
      tracer.deselect(low);
      // }
    }

    D[i] = s;

    // logger {
    logger.println(`左右指针相遇在位置 ${i}，将基准值 ${s} 放入该位置`);
    logger.println(`完成一次划分，基准值 ${s} 处于正确位置 ${i}`);
    logger.println(`数组当前状态: [${D.join(", ")}]`);
    logger.println(
      `继续处理左侧子数组 [${low}..${i - 1}] 和右侧子数组 [${i + 1}..${high}]`
    );
    // }

    // visualize {
    tracer.patch(i, s);
    Tracer.delay();
    tracer.depatch(i);
    // }

    // logger {
    logger.println(`递归处理左侧子数组 [${low}..${i - 1}]`);
    // }

    partition(D, low, i - 1);

    // logger {
    logger.println(`递归处理右侧子数组 [${i + 1}..${high}]`);
    // }

    low = i + 1;
  }

  // logger {
  if (high <= low) {
    logger.println(`子数组 [${low}..${high}] 长度小于等于1，无需排序`);
  }
  // }
}

function quicksort(D) {
  // logger {
  logger.println(`开始对整个数组进行快速排序`);
  logger.println(`调用partition(D, 0, ${D.length - 1})`);
  // }

  partition(D, 0, D.length - 1);

  // logger {
  logger.println(`快速排序完成`);
  logger.println(`---------------------------------------------`);
  logger.println(`【算法总结】`);
  logger.println(`1. 快速排序是原地排序(in-place)算法，不需要额外空间`);
  logger.println(`2. 不稳定排序：相同元素的相对位置可能改变`);
  logger.println(`3. 在实际应用中通常比其他O(n log n)算法更快`);
  logger.println(
    `4. 最坏情况（已排序数组）性能降至O(n²)，可通过随机选择基准值改进`
  );
  logger.println(`---------------------------------------------`);
  // }
}

quicksort(D);
// logger {
logger.println(`排序后数组 = [${D.join(", ")}]`);
// }
