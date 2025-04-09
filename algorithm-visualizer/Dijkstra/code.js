// import visualization libraries {
const {
  Tracer,
  GraphTracer,
  LogTracer,
  Array1DTracer,
  Layout,
  VerticalLayout,
} = require("algorithm-visualizer");
// }

// Initialize graph (adjacency matrix) - single direction for directed graph
const graph = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [0, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 0, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 0, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 0, 0, 10, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 6],
  [0, 0, 0, 0, 0, 0, 0, 0, 7],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const startNode = 0;

// define tracer variables {
const graphTracer = new GraphTracer("有向图").directed(true).weighted(true);
const distanceTracer = new Array1DTracer("距离数组");
const logger = new LogTracer("日志信息");
Layout.setRoot(new VerticalLayout([graphTracer, distanceTracer, logger]));

graphTracer.set(graph);
distanceTracer.set(new Array(graph.length).fill(Infinity));
distanceTracer.patch(startNode, 0);
logger.println(`初始化：设置起始节点 ${startNode} 的距离为 0`);
logger.println(`Dijkstra算法开始：从源节点到各节点的最短路径`);
logger.println(`---------------------------------------------`);
logger.println(
  `【算法背景】Dijkstra算法由荷兰计算机科学家Edsger W. Dijkstra于1956年提出`
);
logger.println(
  `这是一种求解单源最短路径的贪心算法，适用于所有边权重为非负数的图`
);
logger.println(`---------------------------------------------`);
Tracer.delay();
// }

function dijkstra() {
  const dist = new Array(graph.length).fill(Infinity);
  const visited = new Array(graph.length).fill(false);
  dist[startNode] = 0;

  // visualize {
  logger.println(`算法思路：`);
  logger.println(`1. 初始时，设置起始节点距离为0，其他节点距离为无限大`);
  logger.println(`2. 每次从未访问节点中选择距离最小的节点进行处理`);
  logger.println(`3. 更新该节点的所有相邻节点的距离`);
  logger.println(`4. 重复步骤2-3直到所有节点都被访问或无法继续`);
  logger.println(`---------------------------------------------`);
  logger.println(`数据结构说明：`);
  logger.println(`- dist数组：记录从起点到每个节点的最短距离`);
  logger.println(`- visited数组：记录节点是否已被处理过`);
  logger.println(`---------------------------------------------`);
  Tracer.delay();
  // }

  // Keep track of predecessors for path reconstruction
  const pred = new Array(graph.length).fill(-1);

  // visualize {
  logger.println(
    `我们还使用pred数组记录最短路径中每个节点的前驱节点，用于路径重建`
  );
  Tracer.delay();
  // }

  for (let i = 0; i < graph.length - 1; i++) {
    // Find minimum distance vertex
    let min = Infinity;
    let u = -1;

    // visualize {
    logger.println(`第 ${i + 1} 次迭代：寻找未访问节点中距离最小的节点`);
    Tracer.delay();
    // }

    for (let v = 0; v < graph.length; v++) {
      if (!visited[v] && dist[v] <= min) {
        min = dist[v];
        u = v;
      }
    }

    if (u === -1) {
      // visualize {
      logger.println(`没有更多可访问的节点，算法结束`);
      logger.println(`这表明从起点无法到达图中的所有节点，可能存在孤立的部分`);
      // }
      break;
    }

    visited[u] = true;

    // visualize {
    logger.println(`选中节点 ${u} (距离: ${dist[u]})`);
    logger.println(`将节点 ${u} 标记为已访问`);
    logger.println(`这意味着我们已找到从起点到节点 ${u} 的最短路径`);
    graphTracer.visit(u);
    Tracer.delay();
    // }

    // Update neighbors
    // visualize {
    logger.println(`开始更新节点 ${u} 的所有相邻节点`);
    logger.println(`这一步也被称为"松弛操作"（Relaxation）`);
    Tracer.delay();
    // }

    let updateCount = 0;
    for (let v = 0; v < graph.length; v++) {
      if (
        !visited[v] &&
        graph[u][v] &&
        dist[u] !== Infinity &&
        dist[v] > dist[u] + graph[u][v]
      ) {
        // visualize {
        logger.println(
          `更新节点 ${v} 的距离: ${dist[v]} → ${
            dist[u] + graph[u][v]
          } (通过节点 ${u}, 边权重: ${graph[u][v]})`
        );
        logger.println(
          `解释：从起点到节点 ${u} 的距离(${dist[u]}) + 从节点 ${u} 到节点 ${v} 的距离(${graph[u][v]}) < 当前到节点 ${v} 的距离(${dist[v]})`
        );
        graphTracer.select(u, v);
        Tracer.delay();
        // }

        dist[v] = dist[u] + graph[u][v];
        pred[v] = u; // 记录前驱节点
        updateCount++;

        // visualize {
        distanceTracer.patch(v, dist[v]);
        logger.println(`同时更新节点 ${v} 的前驱节点为 ${u}`);
        Tracer.delay();
        distanceTracer.depatch(v);
        graphTracer.deselect(u, v);
        // }
      } else if (!visited[v] && graph[u][v]) {
        // visualize {
        logger.println(
          `检查边 ${u} → ${v} (权重: ${graph[u][v]}), 但没有更新：${
            dist[u] + graph[u][v]
          } >= ${dist[v]}`
        );
        logger.println(`这说明通过节点 ${u} 到达节点 ${v} 不会产生更短的路径`);
        Tracer.delay();
        // }
      }
    }

    // visualize {
    logger.println(
      `第 ${i + 1} 次迭代结束，共更新了 ${updateCount} 个节点的距离`
    );
    logger.println(`当前距离数组: [${dist.join(", ")}]`);
    logger.println(`当前前驱数组: [${pred.join(", ")}]`);
    logger.println(`---------------------------------------------`);
    Tracer.delay();
    // }
  }

  return { dist, pred };
}

// Run algorithm
logger.println(`开始执行Dijkstra算法...`);
Tracer.delay();
const { dist: distances, pred: predecessors } = dijkstra();

// visualize {
logger.println(`算法执行完毕!`);
logger.println(`最终最短路径距离:`);
distanceTracer.set(distances);
Tracer.delay();
// }

// logger {
logger.println(
  `从节点 ${startNode} 到所有其他节点的最短距离: [${distances.join(", ")}]`
);

// 输出详细的路径结果
logger.println(`---------------------------------------------`);
logger.println(`算法总结:`);
let reachableNodes = 0;
for (let i = 0; i < distances.length; i++) {
  if (i !== startNode) {
    if (distances[i] === Infinity) {
      logger.println(`节点 ${startNode} 无法到达节点 ${i}`);
    } else {
      logger.println(
        `节点 ${startNode} 到节点 ${i} 的最短距离: ${distances[i]}`
      );

      // 重建并输出最短路径
      let path = [];
      let current = i;
      while (current !== -1) {
        path.unshift(current);
        current = predecessors[current];
      }

      logger.println(`最短路径: ${path.join(" → ")}`);
      reachableNodes++;
    }
  }
}
logger.println(
  `从节点 ${startNode} 可以到达 ${reachableNodes} 个节点（共 ${
    distances.length - 1
  } 个其他节点）`
);
logger.println(`---------------------------------------------`);
logger.println(`Dijkstra算法的特点：`);
logger.println(`1. 贪心策略：每次选择当前最短距离的节点进行处理`);
logger.println(`2. 时间复杂度：当前实现为O(V²)，其中V是节点数量`);
logger.println(`3. 使用优先队列可以优化到O(E + V·logV)，其中E是边数量`);
logger.println(
  `4. 适用于所有边权重为非负数的图（对于负权边，需使用Bellman-Ford算法）`
);
logger.println(`5. 能找到单源最短路径，但不适用于含负权环的图`);
logger.println(`---------------------------------------------`);
logger.println(`Dijkstra算法的应用：`);
logger.println(`1. 路由选择：网络路由算法如OSPF基于Dijkstra算法`);
logger.println(`2. 地图导航：Google Maps等导航软件使用Dijkstra算法的变体`);
logger.println(`3. 机器人路径规划：找到从起点到目标的最短/最优路径`);
// }
