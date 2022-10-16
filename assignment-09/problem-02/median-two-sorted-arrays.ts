/*
    ? Problem: Q2 of assignment 9.

    ! Time Complexity: O(m + n) -> m = length of array one & n = length of array two.
    ! Space Complexity: O(m + n) -> m = length of array one & n = length of array two.

    ! Note: A Space Optized Approach has been given below with the name as spaceOptimizedMedianSortedArrays.
*/

const findMedianSortedArrays = (nums1: Array<number>, nums2: Array<number>): number => {
    const mergedArray: Array<number> = [];

    let median = 0;

    let arrayOnePointer = 0;
    let arrayTwoPointer = 0;

    // * Firstly we need to merge the two sorted arrays into another array using the merge procedure.
    while(arrayOnePointer < nums1.length && arrayTwoPointer < nums2.length) {
        if(nums1[arrayOnePointer] <= nums2[arrayTwoPointer]){
            mergedArray.push(nums1[arrayOnePointer]);
            arrayOnePointer++;
        }
        else {
            mergedArray.push(nums2[arrayTwoPointer]);
            arrayTwoPointer++;
        }
    }

    while(arrayOnePointer < nums1.length){
        mergedArray.push(nums1[arrayOnePointer]);
        arrayOnePointer++;
    }

    while(arrayTwoPointer < nums2.length){
        mergedArray.push(nums2[arrayTwoPointer]);
        arrayTwoPointer++;
    }

    // * Then we check if the length of the merged array is even, if it is so, we simply find the median by calculating ((n/2)th position + ((n/2) - 1)th position) / 2
    if(mergedArray.length % 2 === 0) {
        median = (mergedArray[(mergedArray.length / 2) - 1] + mergedArray[(mergedArray.length / 2)]) / 2;
    }
    // * Else its simple Math.ceil(n/2)th position.
    else {
        median = mergedArray[Math.ceil(mergedArray.length / 2) - 1];
    }

    // * Finally we return the median.
    return median;
}



/*
    ! Time Complexity: O(m+n)
    ! Space Complexity: O(1)
*/
const spaceOptimizedFindMedianSortedArrays = (nums1: Array<number>, nums2: Array<number>): number => {
    // * Here we decide at which position we will be able to find the median.
    let medianPosition = Math.ceil((nums1.length + nums2.length) / 2) - 1;

    // * We are maitaining two pointers for iterarting the two arrays.
    let pointerOne = 0;
    let pointerTwo = 0;

    // * This marks the current position to compare with medianPosition.
    let currentPosition = 0;

    // * Here we state how to meidans can be found.
    let numberOfMedian = (nums1.length + nums2.length) % 2 === 0 ? 2 : 1;

    // * This marks how many medians have been found.
    let currentNumberOfMedian = 0; 

    // * This is simply the median that we are going to return.
    let median = 0;

    // * Here we run a lop utill pointerOne is than length of nums1 & pointerTwo is than length of nums2 & currentNumberOfMedian is less than numberOfMedian.
    while(pointerOne < nums1.length && pointerTwo < nums2.length && currentNumberOfMedian < numberOfMedian){
        if(nums1[pointerOne] <= nums2[pointerTwo]){
            // * If value at pointerOne of nums1 is less than or equal to value at pointerTwo of nums2 && currentPosition is equal to medianPosition then, we can add the value of position pointerOne at nums1 to median, increment medianPosition by 1 and currentNumberOfMedian by 1.
            if(currentPosition === medianPosition){
                median += nums1[pointerOne];
                medianPosition++;
                currentNumberOfMedian++;
            }
            pointerOne++;
            currentPosition++;
        }
        else {
            // * If value at pointerTwo of nums2 is less than or equal to value at pointerOne of nums1 && currentPosition is equal to medianPosition then, we can add the value of position pointerTwo at nums2 to median, increment medianPosition by 1 and currentNumberOfMedian by 1.
            if(currentPosition === medianPosition){
                median += nums2[pointerTwo];
                medianPosition++;
                currentNumberOfMedian++;
            }
            pointerTwo++;
            currentPosition++;
        }
    }

    // * Now to if any number are left to iterated and we also short of number of medians found then we go into this loop, searching for the left sorted array first.
    while(pointerOne < nums1.length && currentNumberOfMedian < numberOfMedian){
        if(currentPosition === medianPosition){
            median += nums1[pointerOne];
            medianPosition++;
            currentNumberOfMedian++;
        }
        pointerOne++;
        currentPosition++;
    }

    // * Then we go for searching right sorted array.
    while(pointerTwo < nums2.length && currentNumberOfMedian < numberOfMedian){
        if(currentPosition === medianPosition){
            median += nums2[pointerTwo];
            medianPosition++;
            currentNumberOfMedian++;
        }
        pointerTwo++;
        currentPosition++;
    }

    // * Finally we return the sorted array.
    return median / numberOfMedian;
}

// ? Driver Code
console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));

console.log(spaceOptimizedFindMedianSortedArrays([1, 3], [2]));
console.log(spaceOptimizedFindMedianSortedArrays([1, 2], [3, 4]));
