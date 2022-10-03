/*
    !Time Complexity: O(n^2)
    !Space Complexity: O(log n)

    * We are using a recursive heapify approach that recursive stack takes up some extra space but apart from it, if we use the built in .sort() function or an iterative heapify approach we can solve it in O(1) space as well.

    * Also there can be another approach of just solving it using three nested loops, and comparing each and every element's sum, but in that case we would have a time complexity of O(n^3)
*/
const getClosestThreeSum = (nums: Array<number>, target: number): number => {
    if(nums.length < 3) return -1
    if(nums.length === 3) return nums[0] + nums[1] + nums[2];

    // *First let's sort the array.
    heapSort(nums);

    let fixedPointer = 0;

    let nearestSum: number = 0;
    let difference = Number.MAX_VALUE;

    while(fixedPointer < nums.length - 2){
        let leftPointer = fixedPointer + 1;
        let rightPointer = nums.length - 1;

        while(leftPointer < rightPointer){
            let currentSum = nums[fixedPointer] + nums[leftPointer] + nums[rightPointer];
            let currentDifference = Math.abs(target - currentSum);

            if(currentSum === target) return target;

            if(currentDifference < difference){
                nearestSum = currentSum;
                difference = currentDifference;
            }

            if(currentSum > target) rightPointer--;
            else leftPointer++;
        }

        fixedPointer++;
    }

    return nearestSum;
};

// *Here we are implementing heap sort that has a time complexity of O(n log n) & space complexity of O(log n).
const heapSort = (nums: Array<number>) => {
    if(nums.length <= 1) return;
    let currentPosition = Math.floor(nums.length / 2) - 1;

    // *Here we a converting the array into a min heap
    while(currentPosition >= 0){
        heapify(nums, currentPosition, nums.length);
        currentPosition--;
    }

    let maxLength = nums.length - 1;

    // *Here we are converting the array into a sorted array into descending order.
    while(maxLength >= 0){
        [nums[0], nums[maxLength]] = [nums[maxLength], nums[0]];
        maxLength--;
        heapify(nums, 0, maxLength + 1);
    }

    // *Here we are just reversiung the array.
    reverseArray(nums);
};

// *This function is used to reverse the array with time complexity of O(n) and space complexity of O(1).
const reverseArray = (nums: Array<number>) => {
    let left = 0;
    let right = nums.length - 1;

    while(left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
};

// *Finally this function heapifies the current data structure.
const heapify = (nums: Array<number>, parent: number, arrayLength: number): void => {
    const leftChildIndex = (parent * 2) + 1;
    const rightChildIndex = (parent * 2) + 2;
    let minIndex = parent;

    if(leftChildIndex < arrayLength && nums[leftChildIndex] < nums[minIndex]) minIndex  = leftChildIndex;

    if(rightChildIndex < arrayLength && nums[rightChildIndex] < nums[minIndex]) minIndex = rightChildIndex;

    if(minIndex !== parent) {
        [nums[minIndex], nums[parent]] = [nums[parent], nums[minIndex]];
        heapify(nums, minIndex, arrayLength);
    }
};

console.log(getClosestThreeSum([-1, 2, 1, -4], 1))
console.log(getClosestThreeSum([0, 0, 0], 1))