interface DistanceFromOrigin {
    distance: number;
    point: [number, number];
}


// * This function is reponsible for pushing number into the heap. Time Complexity: O(log n)
const pushHeap = (distanceHeap: Array<DistanceFromOrigin>, distance: DistanceFromOrigin) => {
    distanceHeap.push(distance);

    let currentParentIndex = (distanceHeap.length - 1) % 2 === 0 ? (distanceHeap.length - 1 - 2) / 2 : (distanceHeap.length - 1 - 1) / 2;

    let currentIndex = distanceHeap.length - 1;

    while(currentParentIndex > -1 && distanceHeap[currentParentIndex].distance > distanceHeap[currentIndex].distance){
        hepify(distanceHeap, distanceHeap.length, currentParentIndex);

        currentIndex = currentParentIndex;

        currentParentIndex = currentParentIndex % 2 === 0 ? (currentParentIndex - 2) / 2 : (currentParentIndex - 1) / 2;
    }
};


// * This function is responsible for poping the topmost element out of the heap. Time Complexity: O(log n)
const popHeap = (distanceHeap: Array<DistanceFromOrigin>): DistanceFromOrigin | undefined => {
    if (distanceHeap.length <= 1) return distanceHeap.pop();

    [distanceHeap[0], distanceHeap[distanceHeap.length - 1]] = [distanceHeap[distanceHeap.length - 1], distanceHeap[0]];

    hepify(distanceHeap, distanceHeap.length - 1, 0);

    return distanceHeap.pop();
};

// * This function is reposnble for puttin the given index into its correct position.
const hepify = (distanceHeap: Array<DistanceFromOrigin>, sizeOfArray: number, parent: number) => {
    let nextLeftChildIndex = (parent * 2) + 1;
    let nextRightChildIndex = (parent * 2) + 2;
    let min = parent;

    if(nextLeftChildIndex < sizeOfArray && distanceHeap[nextLeftChildIndex].distance < distanceHeap[min].distance){
        min = nextLeftChildIndex;
    }

    if(nextRightChildIndex < sizeOfArray && distanceHeap[nextRightChildIndex].distance < distanceHeap[min].distance){
        min = nextRightChildIndex;
    }

    if(min !== parent){
        [distanceHeap[parent], distanceHeap[min]] = [distanceHeap[min], distanceHeap[parent]];

        hepify(distanceHeap, sizeOfArray, min)
    }
};

// !This function is the main function that finds the k closest functions. It has a time complexity of O(n log n)
const kClosestPointsToOrigin = (points: Array<[number, number]>, k: number): Array<[number, number]> => {
    let distanceHeap: Array<DistanceFromOrigin> = [];

    for(let point of points){
        const distance = Math.sqrt((point[0] - 0) ** 2 + (point[1] - 0) ** 2);

        pushHeap(distanceHeap, {
            distance,
            point
        });
    }

    const kClosestPoints: Array<[number, number]> = [];

    let currentIndex = 0;

    while(currentIndex < k && distanceHeap.length >= 0) {
        const distanceObject = popHeap(distanceHeap);

        if(distanceObject) kClosestPoints.push(distanceObject.point);

        currentIndex++;
    }

    return kClosestPoints;
}


// *Driver Code
console.log(kClosestPointsToOrigin([[1,3],[-2,2]], 1));
console.log(kClosestPointsToOrigin([[3,3],[5,-1],[-2,4]], 2));
console.log(kClosestPointsToOrigin([[0,1],[1,0]], 2));