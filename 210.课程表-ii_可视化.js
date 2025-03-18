// import visualization libraries {
const {
  Tracer,
  GraphTracer,
  Array1DTracer,
  LogTracer,
  Layout,
  VerticalLayout,
} = require("algorithm-visualizer");
// }

// define sample data
const numCourses = 6;
// prerequisites array where [a, b] means course a requires course b
const prerequisites = [
  [1, 0],
  [2, 0],
  [3, 1],
  [3, 2],
  [4, 3],
  [5, 4],
];

// Create adjacency matrix representation for the graph
const G = Array(numCourses)
  .fill()
  .map(() => Array(numCourses).fill(0));
const inDegree = Array(numCourses).fill(0);
const result = [];

// Build the graph from prerequisites
for (const [course, prereq] of prerequisites) {
  G[prereq][course] = 1; // prereq -> course
  inDegree[course]++;
}

// define tracer variables {
const graphTracer = new GraphTracer("Course Dependencies");
const inDegreeTracer = new Array1DTracer("In-degrees");
const resultTracer = new Array1DTracer("Course Order");
const logger = new LogTracer("Steps");
Layout.setRoot(
  new VerticalLayout([graphTracer, inDegreeTracer, resultTracer, logger])
);
graphTracer.set(G);
inDegreeTracer.set(inDegree);
resultTracer.set(result);
Tracer.delay();
// }

// logger {
logger.println("Starting topological sort using BFS");
logger.println("Courses with in-degree 0 can be taken immediately");
// }

function findOrder(numCourses, prerequisites) {
  // Create adjacency list for the graph
  const map = new Map();
  // Store in-degree values locally for the algorithm
  const inDegree = new Array(numCourses).fill(0);
  // Queue for BFS processing
  const queue = [];
  // Final result array
  const result = [];

  // Initialize the adjacency list
  for (let i = 0; i < numCourses; i++) {
    map.set(i, []);
  }

  // Build the graph
  for (const [course, prereq] of prerequisites) {
    map.get(prereq).push(course);
    inDegree[course]++;

    // visualize {
    logger.println(`Course ${course} requires course ${prereq}`);
    inDegreeTracer.patch(course, inDegree[course]);
    Tracer.delay();
    inDegreeTracer.depatch(course);
    // }
  }

  // Find all courses with in-degree 0
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);

      // visualize {
      logger.println(`Course ${i} has in-degree 0, can take immediately`);
      inDegreeTracer.select(i);
      graphTracer.visit(i);
      Tracer.delay();
      // }
    }
  }

  // Process the queue (BFS)
  while (queue.length > 0) {
    const course = queue.shift();
    result.push(course);

    // visualize {
    logger.println(`Taking course ${course}`);
    resultTracer.set(result);
    graphTracer.leave(course); // Mark as processed
    Tracer.delay();
    // }

    // For each dependent course
    const dependents = map.get(course);
    for (const nextCourse of dependents) {
      // visualize {
      logger.println(`Decrementing in-degree of course ${nextCourse}`);
      graphTracer.visit(nextCourse, course);
      Tracer.delay();
      // }

      // Decrease in-degree
      inDegree[nextCourse]--;

      // visualize {
      inDegreeTracer.patch(nextCourse, inDegree[nextCourse]);
      Tracer.delay();
      inDegreeTracer.depatch(nextCourse);
      // }

      // If in-degree becomes 0, add to queue
      if (inDegree[nextCourse] === 0) {
        queue.push(nextCourse);

        // visualize {
        logger.println(`Course ${nextCourse} can now be taken`);
        inDegreeTracer.select(nextCourse);
        Tracer.delay();
        // }
      }
    }
  }

  // Check if all courses can be taken
  if (result.length === numCourses) {
    // visualize {
    logger.println("All courses can be completed in the order shown");
    // }
    return result;
  } else {
    // visualize {
    logger.println("Cannot complete all courses due to circular dependencies");
    // }
    return [];
  }
}

// Run the algorithm
const order = findOrder(numCourses, prerequisites);

// logger {
if (order.length > 0) {
  logger.println(`Final course order: [${order.join(", ")}]`);
} else {
  logger.println("No valid course order exists");
}
// }
