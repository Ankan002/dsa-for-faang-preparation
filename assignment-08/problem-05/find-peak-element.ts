/*
    ? Problem Statement: Q5 of Assignment sheet.

    ! Time Complexity: O(log n)
    ! Space Complexity: O(1)
*/

// * This function is responsible for finding the peak element.
const findPeakElement = (nums: Array<number>): number => {
    // * First if there is only one element then, we simply return that element as question says nums[-1] = nums[n] = -∞.
    if(nums.length === 1) return 0;

    let lb = 0;
    let ub = nums.length - 1;

    while(lb <= ub) {
        const mid = lb + (Math.floor((ub - lb) / 2));

        // * Now if there the mid is the first element and the element is greater than its next element then we can say it is one of the peak elements.
        if(mid === 0 && nums[mid] > nums[mid + 1]) return mid;

        // * Again if the element is the last element and the element is greater than its previous element then we can say it is one of the peak elements.
        else if (mid === nums.length - 1 && nums[mid] > nums[mid - 1]) return mid;

        // * Here if the mid is somewhere in the middle, then we say if the mid element is greater than its predecessor and succesor, 
        else if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) return mid;

        // * Now if above given conditions does not work, then we simply check which side is larger because going to that side just might give us the correct answer but the smaller side does not guarantee us one. Also if we find that the right side is greater then we update the lb.
        else if (nums[mid] < nums[mid + 1]) lb = mid + 1;

        // * Just according to the condition discussed above, we might say the predecessor is larger and we update the ub.
        else ub = mid - 1;
    }

    return -1;
}

// ? Driver Code
console.log(findPeakElement([1,2,1,3,5,6,4]));
console.log(findPeakElement([1,2,3,1]));
console.log(findPeakElement([1]));
