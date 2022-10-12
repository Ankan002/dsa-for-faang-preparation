/*
    ? Problem Statement: Q2 of Assignment sheet.

    ! Time Complexity:
        ! - Average/Best Case: Theta(n log n)
        ! - Worst Case: O(n^2)

    ! Space Complexity: O(1)

    ? Note: We are using a recursive call here so it would automatically take O(log n) space to store the function calls in a stack.
*/

// * This function is used to put the pivot into its right position and also divide the array into a lower half and greater half.
const partition = (nums: Array<number>, lb: number, ub: number): number => {
    const pivot = nums[lb];

    let i = lb;

    for(let j=i+1; j<=ub; j++){
        if(nums[j] <= pivot){
            i++;
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }

    [nums[i], nums[lb]] = [nums[lb], nums[i]];

    return i;
};

// * This function basically implements the quick sort algorithm.
const quickSort = (nums: Array<number>, lb: number, ub: number) => {
    if(lb < ub) {
        const pivot = partition(nums, lb, ub);

        quickSort(nums, lb, pivot - 1);
        quickSort(nums, pivot + 1, ub);
    }
}

const sortColors = (nums: Array<number>): void => {
    quickSort(nums, 0, nums.length - 1);
}


// ? Driver Code.
const nums = [2,0,2,1,1,0];
sortColors(nums);
console.log(nums);
