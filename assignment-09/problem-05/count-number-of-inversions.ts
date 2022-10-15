/*
    ? Problem: Q5 of Assignment 9.

    ! Time Complexity: O(n log n)
    ! Space Complexity: O(n)

    ! Note: We are using reccursion to implement the divide algo, so also we are using an auxilliary stack space of O(log n).
*/

// * This function is responsible for merging the array and returning the number of inversions.
const mergeAndCount = (arr: Array<number>, lb: number, mid: number, ub: number): number => {
    let i = lb;
    let j = mid + 1;

    let inversionCount = 0;
    const tempArray: Array<number> = [];

    while(i <= mid && j <= ub) {

        // * Here it is important to understand the intuition. See we know both the side of the array that we are merging is sorted and suppose number at position j is less than number at position i, then we can say that it is also less than that of numbers at positions from (i + 1) to mid. Thus we can increment inversion count by (mid - 1) + 1. Also we append the number at j-th position to the temp array and increment j by 1.
        if(arr[j] < arr[i]){
            inversionCount += (mid - i) + 1;
            tempArray.push(arr[j]);
            j++;
        }

        // * If the above condition is not true, then we can simply append the number at o-th position to the temp array and increment i by 1.
        else {
            tempArray.push(arr[i]);
            i++;
        }
    }

    while(i <= mid) {
        tempArray.push(arr[i]);
        i++;
    }

    while(j <= ub){
        tempArray.push(arr[j]);
        j++;
    }

    i = lb

    // * Copying back all the elements from tempArray to the main array.
    for(let num of tempArray){
        arr[i] = num;
        i++;
    }

    // * Finally we return inversion count i.e. the number of inversions.
    return inversionCount;
};

// * This function is responsible for dividing the array reccursively, also it counts the inversions by calling the mergeAndCount function, adding them and returning them to the upper level.
const divide = (arr: Array<number>, lb: number, ub: number): number => {
    if(lb < ub){
        const mid = lb + Math.floor((ub - lb) / 2);

        const leftInversionCount = divide(arr, lb, mid);
        const rightInversionCount = divide(arr, mid + 1, ub);

        const currentInversionCount = mergeAndCount(arr, lb, mid, ub);

        return leftInversionCount + rightInversionCount + currentInversionCount;
    }

    // * If we hit the small problem, them we will have no more inversions, hence we return zero.
    return 0;
};

const countInversions = (arr: Array<number>): number => {
    return divide(arr, 0, arr.length - 1);
} 

// ? Driver Code
const nums = [2, 4, 1, 3, 5];
console.log(countInversions(nums));

const numsTwo = [2, 3, 4, 5, 6];
console.log(countInversions(numsTwo));

const numsThree = [10, 10, 10];
console.log(countInversions(numsThree));
