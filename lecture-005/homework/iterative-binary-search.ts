/*
Problem Statement: Perform a Iterative Binary Search on an array.
Time Complexity: O(log(n))
Space Complexity: O(1)
*/

const iterativeBinarySearch = (nums: Array<number>, target: number): number => {
    let left: number = 0;
    let right: number = nums.length - 1;

    while(left <= right) {
        const mid = left + (Math.floor((right - left) / 2));

        if(nums[mid] === target) return mid;
        else if(nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
}

console.log(iterativeBinarySearch([10, 20, 30, 40, 50, 60, 70, 80, 90], 40)); // -> 3
console.log(iterativeBinarySearch([10, 20, 30, 40, 50, 60, 70, 80, 90], 240)); // -> -1