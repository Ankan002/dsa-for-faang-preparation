/*
Problem Statement: Perform a Iterative Binary Search on an array.
Time Complexity: O(log(n))
Space Complexity: O(log(n))
*/

const recursiveBinarySearch = (nums: Array<number>, target: number, left: number, right: number): number => {
    if(left > right) return -1;

    if(left === right) {
        if(nums[left] === target) return left;
        return -1;
    }

    const mid = left + (Math.floor((right - left) / 2));

    if(nums[mid] === target) return mid;
    else if(nums[mid] < target) left = mid + 1;
    else right = mid - 1;

    return recursiveBinarySearch(nums, target, left, right);
}

console.log(recursiveBinarySearch([10, 20, 30, 40, 50, 60, 70, 80, 90], 40, 0, 8)); // -> 3
console.log(recursiveBinarySearch([10, 20, 30, 40, 50, 60, 70, 80, 90], 240, 0, 8)); // -> -1