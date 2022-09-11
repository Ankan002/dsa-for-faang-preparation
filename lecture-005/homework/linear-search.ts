/*
Problem Statement: Perform a Linear Search on an array.
Time Complexity: O(n)
Space Complexity: O(1)
*/

const linearSearch = (nums: Array<number>, target: number): number => {

    for(let i=0; i<=nums.length; i++){
        if(nums[i] === target) return i;
    }

    return -1;
}


// Test Cases
console.log(linearSearch([34, 71, 33, 21, 98, 55, 35, 57], 35)) // -> 6
console.log(linearSearch([34, 71, 33, 21, 98, 55, 35, 57], 37)) // -> -1