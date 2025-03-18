// import visualization libraries {
  const { Tracer, Array1DTracer, ChartTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');
  // }
  
  // define tracer variables {
  const chart = new ChartTracer('Container Heights');
  const tracer = new Array1DTracer('Height Array');
  const logger = new LogTracer('Console');
  Layout.setRoot(new VerticalLayout([chart, tracer, logger]));
  const height = Randomize.Array1D({ N: 15, value: () => Randomize.Integer({ min: 1, max: 20 }) });
  tracer.set(height);
  tracer.chart(chart);
  Tracer.delay();
  // }
  
  /**
   * @param {number[]} height - 表示容器高度的数组
   * @return {number} - 最大容器面积
   */
  function maxArea(height) {
    // 初始化最大面积、左指针和右指针
    let maxA = 0, left = 0, right = height.length - 1;
    
    // 记录当前最大面积的边界
    let maxLeft = left, maxRight = right;
    
    // logger {
    logger.println('开始寻找最大容器面积...');
    logger.println(`初始指针: 左(${left}), 右(${right})`);
    // }
    
    // 当左指针小于右指针时，继续循环
    while (left < right) {
      // 计算当前指针位置下的面积
      const currentHeight = Math.min(height[left], height[right]);
      const width = right - left;
      const area = currentHeight * width;
      
      // visualize {
      tracer.select(left);
      tracer.select(right);
      logger.println(`检查容器 [${left}, ${right}]`);
      logger.println(`高度: ${height[left]} vs ${height[right]}, 取较小值: ${currentHeight}`);
      logger.println(`宽度: ${width}, 面积: ${currentHeight} × ${width} = ${area}`);
      Tracer.delay();
      // }
      
      // 更新最大面积
      if (area > maxA) {
        maxA = area;
        maxLeft = left;
        maxRight = right;
        
        // visualize {
        logger.println(`找到新的最大面积: ${maxA}`);
        tracer.patch(left, height[left]);
        tracer.patch(right, height[right]);
        Tracer.delay();
        tracer.depatch(left);
        tracer.depatch(right);
        // }
      }
      
      // 移动较短的边
      if (height[left] < height[right]) {
        // visualize {
        logger.println(`左边(${height[left]})较短，左指针右移`);
        tracer.deselect(left);
        // }
        left++;
      } else {
        // visualize {
        logger.println(`右边(${height[right]})较短或相等，右指针左移`);
        tracer.deselect(right);
        // }
        right--;
      }
      
      // visualize {
      Tracer.delay();
      // }
    }
    
    // visualize {
    tracer.select(maxLeft);
    tracer.select(maxRight);
    logger.println(`最终最大面积: ${maxA}`);
    logger.println(`最优容器边界: [${maxLeft}, ${maxRight}]`);
    logger.println(`高度: ${Math.min(height[maxLeft], height[maxRight])}, 宽度: ${maxRight - maxLeft}`);
    // }
    
    return maxA;
  }
  
  // 执行算法并获取结果
  const result = maxArea(height);
  
  // logger {
  logger.println(`算法完成! 最大容器面积: ${result}`);
  // }
