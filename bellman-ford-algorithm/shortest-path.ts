/*
    ? Problem Statement: Implement Bellman Ford's Algorithm.
    ! Time Complexity: O(V*E)
        ! - If V == E: O(V^2)
        ! - If the graph is a complete graph: O(V^3)
    
    ! Space Complexity: O(V)
*/

// * This is the response type of the reponse we will be giving.
type BellmanFordsShortestPathResponse = {
    success: true;
    shortestDistancesFromOrigin: Record<string, number>;
} | {
    success: false;
    error: string;
}

// * This is the main function reponsible.
const bellmanFordsShortestPath = (origin: string, edges: Array<[string, string, number]>): BellmanFordsShortestPathResponse => {
    // * First here we are creating a table to maintain the shortest distances from the origin to the destinations.
    const shortestDistancesFromOrigin: Record<string, number> = {};

    // * Then we iterate over each and every edge and extract the vertexes out of it. Then we check if the vertex has already been registered, we continue. Else if, the vertex is same as the origin then we initiate it with zero, else we initiate it with infinite. 
    for(let edge of edges){
        const currentDistanceOfVertexOne = shortestDistancesFromOrigin[edge[0]]

        if(currentDistanceOfVertexOne !== 0 || currentDistanceOfVertexOne !== Infinity){
            shortestDistancesFromOrigin[edge[0]] = edge[0] === origin ? 0 : Infinity;
        }

        const currentDistanceOfVertexTwo = shortestDistancesFromOrigin[edge[1]]

        if(currentDistanceOfVertexTwo !== 0 || currentDistanceOfVertexTwo !== Infinity){
            shortestDistancesFromOrigin[edge[1]] = edge[1] === origin ? 0 : Infinity;
        }
    }

    // * Then we run a loop for v-1(num of vertex - 1) tims.
    for(let i=0; i<Object.keys(shortestDistancesFromOrigin).length - 1; i++){
        // * We keep a flag to check if we have updated a key or not.
        let isAnyKeyUpdated = false;

        // * Now we go over each of the edge.
        for(let edge of edges){
            // * Then we set the origin as the first element of the edge.
            const currentOrigin = edge[0];
            // * We set the destination as the second element of the edge.
            const currentDestination = edge[1];
            // * And the travel cost as the third element.
            const travelCostOrEdgeWeight = edge[2];

            // Then we check if the current travel cost at the origin + the travel cost from origin to dest < the min travel cost at dest.
            if(shortestDistancesFromOrigin[currentOrigin] + travelCostOrEdgeWeight < shortestDistancesFromOrigin[currentDestination]){
                // Then we update the min tavel cost at dest to current travel cost at the origin + the travel cost from origin to dest
                shortestDistancesFromOrigin[currentDestination] = shortestDistancesFromOrigin[currentOrigin] + travelCostOrEdgeWeight;

                // * Finally also update the key updation flag to tru.
                if(!isAnyKeyUpdated) isAnyKeyUpdated = true;
            }
        }

        // * If no key has been updated, then we know that we have reached the minimum cost & break out of the loop.
        if(!isAnyKeyUpdated) break;
    }

    // * Finally, we through all the edges one more time & perform the same task. If the min cost changes once, then we know that there is a negatie edge weight cycle and return false.
    for(let edge of edges){
        const currentOrigin = edge[0];
        const currentDestination = edge[1];
        const travelCostOrEdgeWeight = edge[2];

        if(shortestDistancesFromOrigin[currentOrigin] + travelCostOrEdgeWeight < shortestDistancesFromOrigin[currentDestination]){
            return {
                success: false,
                error: "There's a negative weight cycle!!"
            };
        }
    }

    // * Else we simply return the min distance table.
    return {
        success: true,
        shortestDistancesFromOrigin
    };
}

// ? Driver Code.
console.log(bellmanFordsShortestPath("A", [
    ["A", "B", 4],
    ["A", "C", 5],
    ["C", "D", 3],
    ["D", "B", -10]
]));
