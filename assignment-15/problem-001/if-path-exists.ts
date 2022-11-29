/*
    ? Problem Statement: Q1 of assignment 15.

    ! Time Complexity: O(n)
    ! Space Complexity: O(n)

    * Steps

    * First build the adjacency list to represent the graph.
    * Now we are using BFS traversal here.
    * So create a set to store the visited nodes.
    * Also enqueue the source node into the queue & add the node into the visited set.
    * Now run the loop while the queue does become empty.
    * Inside the loop first dequeue an element from the queue. Tf that node is the destination then return true.
    * Now run a loop for each neighbour nodes of that particular element.
    * Inside the second loop, check if that particular node is in the visited set. If it is not so then enqueue that node inside the queue and also add that into the visited set. Else continue.
    * Finally if the destination is yet not found, then simply return false.
*/

// * This function is responsible for checking for a valid path.
const validPath = (n: number, edges: Array<[number, number]>, source: number, destination: number): boolean => {
    // * First here we build an adjacency list to represent the graph.
    const graphAdjacencyList = buildAdjacencyListGraph(edges);

    // * Now, we create a BFS Queue, also initiate a visitedSet to store the nodes already visited.
    const BFSQueue: Array<number> = [];
    const visitedSet: Set<number> = new Set();

    // * First enqueue the source into the BFSQueue & also add the source into visitedSet.
    BFSQueue.push(source);
    visitedSet.add(source);

    // * Run a loop until the BFS Queue becomes empty.
    while(BFSQueue.length > 0){
        // * Here dequeue an element from the front of the queue.
        const currentNode = BFSQueue.shift();

        // * Now if there is no element then we return false.
        if(currentNode === undefined || currentNode === null) return false;
        // * We check if the element is the destination then we return true.
        if(currentNode === destination) return true;

        // * Now we get all the neighbours of the selected node
        const neighbouringNodes = graphAdjacencyList[currentNode];

        // * Here we run a loop for all the neighbours of the selected node
        for(let neighbouringNode of neighbouringNodes){
            // * If the neighbour has already been visited we continue.
            if(visitedSet.has(neighbouringNode)) continue;

            // * Else we enqueue the neighbour inside the queue. Also we add it inside the visitedSet.
            visitedSet.add(neighbouringNode)
            BFSQueue.push(neighbouringNode);
        }
    }

    // * Finally if we cannot get to the destination, then we return false.
    return false;
};

// * This is an helper function responsible for building the adjacency graph.
const buildAdjacencyListGraph = (edges: Array<[number, number]>) => {
    const adjacencyList: Record<number, Array<number>> = {};

    for(let edge of edges){
        const [vertexOne, vertexTwo] = edge;

        if(!(vertexOne in adjacencyList)) adjacencyList[vertexOne] = [];
        if(!(vertexTwo in adjacencyList)) adjacencyList[vertexTwo] = [];

        adjacencyList[vertexOne].push(vertexTwo);
        adjacencyList[vertexTwo].push(vertexOne);
    }

    return adjacencyList;
};

// ? Driver Code
console.log(validPath(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5)); // -> False
console.log(validPath(3, [[0,1],[1,2],[2,0]], 0, 2)); // -> True