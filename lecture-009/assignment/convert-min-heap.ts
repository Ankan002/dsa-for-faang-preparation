// The Build heap function has a time complexity of O(n). It uses the recursive method.
const buildHeap = (nums: Array<number>): Array<number> => {
    let currentIndex = Math.floor(nums.length / 2) - 1;

    while(currentIndex >= 0) {
        minHeapify(nums, nums.length, currentIndex);
        currentIndex--;
    }

    return nums;
}

// This function serves the same functionality but with the iterative approach.
const buildHeapIterative = (nums: Array<number>): Array<number> => {
    let currentIndex = Math.floor(nums.length / 2) - 1;

    while(currentIndex >= 0) {
        minHeapifyIterative(nums, nums.length, currentIndex);
        currentIndex--;
    }

    return nums;
}

// This is the recursive approach for minHeapify function.
const minHeapify = (nums: Array<number>, sizeOfArray: number, parent: number): void => {
    let nextLeftIndex = (parent * 2) + 1;
    let nextRightIndex = (parent * 2) + 2;
    let min = parent;

    if(nextLeftIndex < sizeOfArray && nums[min] > nums[nextLeftIndex]){
        min = nextLeftIndex;
    }

    if(nextRightIndex < sizeOfArray && nums[min] > nums[nextRightIndex]){
        min = nextRightIndex;
    }

    if(min !== parent) {
        [nums[parent], nums[min]] = [nums[min], nums[parent]];
        minHeapify(nums, sizeOfArray, min);
    }
}

// This is the iterative approach for minHeapify function.
const minHeapifyIterative = (nums: Array<number>, sizeOfArray: number, parent: number): void => {
    let nextLeftIndex = (parent * 2) + 1;
    let nextRightIndex = (parent * 2) + 2

    while((nextLeftIndex < sizeOfArray && nums[parent] > nums[nextLeftIndex]) || (nextRightIndex < sizeOfArray && nums[parent] > nums[nextRightIndex])){
        let min = parent;

        if(nextLeftIndex < sizeOfArray && nums[min] > nums[nextLeftIndex] ) {
            min = nextLeftIndex;
        }

        if(nextRightIndex < sizeOfArray && nums[min] > nums[nextRightIndex]){
            min = nextRightIndex;
        }

        if(min !== parent){
            [nums[min], nums[parent]] = [nums[parent], nums[min]];
            parent = min;
            nextLeftIndex = (parent * 2) + 1;
            nextRightIndex = (parent * 2) + 2;
        }
    }
}

// * DRIVER CODE

// Testing the test cases with recursive method.
console.log(buildHeap([75, 25, 35, 45, 90, 80, 60, 20, 30]));
console.log(buildHeap([145, 40, 25, 65, 12, 48, 18]));

// Testing the test cases with iterative method.
console.log(buildHeapIterative([75, 25, 35, 45, 90, 80, 60, 20, 30]));
console.log(buildHeapIterative([145, 40, 25, 65, 12, 48, 18]));
