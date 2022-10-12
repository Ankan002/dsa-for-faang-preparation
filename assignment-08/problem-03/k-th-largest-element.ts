/*
    ? Problem Statement: Q2 of Assignment sheet.

    ! Time Complexity:
        ! - Average/Best Case: Theta(n)
        ! - Worst Case: O(n^2)

    ! Space Complexity: O(1)

    ? Note: We are using a recursive call here so it would automatically take O(log n) space to store the function calls in a stack.
*/

// * This function returns a random number between lower bound and upper bound. 
const getRandomNumber = (lb: number, ub: number): number => {
    return Math.floor(Math.random() * (ub - lb )) + lb;
}

const partition = (nums: Array<number>, lb: number, ub: number): number => {
    // * We are using a Randomized Quick Sort Technique to optimize the algo.
    const randomIndex = getRandomNumber(lb, ub + 1);

    [nums[lb], nums[randomIndex]] = [nums[randomIndex], nums[lb]];

    const pivot = nums[lb];

    let i = lb;

    for(let j=i+1; j<=ub; j++){
        // *If value at j-th position is less than or equal to pivot, then first increment i by 1 and swap the values at i and j
        if(nums[j]<=pivot){
            i++;
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }

    // *Now we swap the i-th index with lower bound. Now finally pivot's value has been placed at its correct index
    [nums[lb], nums[i]] = [nums[i], nums[lb]];

    // *Let's return the pivot's correct index
    return i;
}

// * This function helps to find the element that can be placed correctly at the required index.
const findKthLargestHelper = (nums: Array<number>, requiredIndex: number, lb: number, ub: number): number => {
    // * If only one index is remaining i.e., lb === ub and also lb is quivalent to required index, then we return the value at lb.
    if(lb === ub && lb === requiredIndex) return nums[lb];

    if(lb < ub){
        const pivot = partition(nums, lb, ub);

        // *If the pivot returned i.e. the index that has been put in its correct place is returned is equivalent to required index we return the number at that particular index.
        if(requiredIndex === pivot) return nums[pivot];

        // *If the pivot returned is actually less than that of the required index then we need to search the larger side & we need to only call for pivot + 1 to upper bound.
        if(requiredIndex > pivot) return findKthLargestHelper(nums, requiredIndex, pivot + 1, ub);

        // *Else we know that the pivot is greater than that of he required index, then we need to search the smaller side & we need to only call for lower bound upto pivot - 1.
        else return findKthLargestHelper(nums, requiredIndex, lb, pivot - 1);
    }

    return nums[nums.length - 1];
};

// * This function helps us find the k-th largest number.
const findKthLargest = (nums: Array<number>, k: number): number => {
    return findKthLargestHelper(nums, (nums.length - k), 0, nums.length - 1);
}

// ? Driver code
const nums1 = [40, 25, 68, 79, 52, 66, 89, 97];
console.log(findKthLargest(nums1, 2));

const nums2 = [3,2,3,1,2,4,5,5,6,7,7,8,2,3,1,1,1,10,11,5,6,2,4,7,8,5,6];
console.log(findKthLargest(nums2, 2));