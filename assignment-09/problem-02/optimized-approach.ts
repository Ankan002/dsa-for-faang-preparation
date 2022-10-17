/*
    ? Problem: Q2 of Assignment 9.

    ! Time Complexity: O(log(m + n))
    ! Space Complexity: O(1)
*/

// * This function is responsible for returning the median of the array.
const findMedianSortedArrays = (nums1: Array<number>, nums2: Array<number>): number => {
    // * We are considering the first array as our reference point so it must that first array not larger than the second array, as the second array might go out of index bound and create an infinite loop. So to check that problem we a handling that problem here.
    if(nums1.length > nums2.length){
        return findMedianSortedArrays(nums2, nums1)
    }

    // * We are initiating the left pointer of the array one at 0th position.
    let arrOneLeft = 0;

    // * And the right most pointer as the nums1.length position.
    let arrOneRight = nums1.length;

    // * This is the total length of merged array if it was formed.
    const totalMergedLength = nums1.length + nums2.length;

    // * Now we run a loop while arrOneLeft is less than or equal to arrOneRight
    while(arrOneLeft <= arrOneRight){
        // * numsOneLeft embarks the point from where the right portion starts in array one
        let numsOneLeft = arrOneLeft + Math.floor((arrOneRight - arrOneLeft) / 2);
        
        // * numsTwoLeft embarks the point from where the right portion starts in array two
        let numsTwoLeft = Math.floor((totalMergedLength + 1) / 2) - numsOneLeft;

        // * Now we evaluate the value of the last index of numsOne's left side. If the index is zero the we set it as Number.MIN_SAFE_INTEGER because -1 index does not exist in an array
        let numsOneLeftMinusOneValue = (numsOneLeft === 0) ? Number.MIN_SAFE_INTEGER : nums1[numsOneLeft - 1];

        // * Then we evaluate the value of the first index of numOne's right side. If the index is equivalent to nums1.Length the we set it as Number.MAX_SAFE_INTEGER because nums1.length index does not exist in array.
        let numsOneLeftValue = (numsOneLeft === nums1.length) ? Number.MAX_SAFE_INTEGER : nums1[numsOneLeft];

        // * Now we evaluate the value of the last index of numsTwo's left side. If the index is zero the we set it as Number.MIN_SAFE_INTEGER because -1 index does not exist in an array
        let numsTwoLeftMinusOneValue = (numsTwoLeft === 0) ? Number.MIN_SAFE_INTEGER : nums2[numsTwoLeft - 1];

        // * Then we evaluate the value of the first index of numTwo's right side. If the index is equivalent to nums1.Length the we set it as Number.MAX_SAFE_INTEGER because nums1.length index does not exist in array.
        let numsTwoLeftValue = (numsTwoLeft === nums2.length) ? Number.MAX_SAFE_INTEGER : nums2[numsTwoLeft];

        // * Now we check if numsOneLeftMinusOneValue <= numsTwoLeftValue and numsTwoLeftMinusOneValue <= numsOneLeftValue, then further down the line we need to check if the sumation of two arrays length would make it a even or odd length-ed array.
        if(numsOneLeftMinusOneValue <= numsTwoLeftValue && numsTwoLeftMinusOneValue <= numsOneLeftValue) {
            let median = 0;

            // * If the length of the resulting array is even, then we can simply say that (maxValue of leftArray + min value of rightArray) / 2 would give me the answer.
            if(totalMergedLength % 2 === 0){
                let leftMax = Math.max(numsOneLeftMinusOneValue, numsTwoLeftMinusOneValue);
                let rightMin = Math.min(numsOneLeftValue, numsTwoLeftValue);

                median = (leftMax + rightMin) / 2;
            }
            // * Else if it is odd then we need to find the max in the left side & that's it.
            else {
                median = Math.max(numsOneLeftMinusOneValue, numsTwoLeftMinusOneValue);
            }

            return median;
        }

        // * Now if the above condition does not satisfies, we need to take more elemnts from the array that has lower values, so to track that down we check if the last element on the left side of the first array is greater than the first element on the right side of the second array, then we take more elements from the second array. To do so set the arrOneRight pointer to numsOneLeft(first pointer of the right side of first array) - 1.
        else if(numsOneLeftMinusOneValue > numsTwoLeftValue){
            arrOneRight = numsOneLeft - 1;
        }

        // * Otherwise, if last element in the left side of the second array is greater than the first element on the right side of the first array, we select element from the first array. To do so, we set arrayOneLeft pointer to numsOneLeft + 1.
        else if (numsTwoLeftMinusOneValue > numsOneLeftValue){
            arrOneLeft = numsOneLeft + 1;
        }
    }

    return -1;
}

// ? Driver Code.
console.log(findMedianSortedArrays([2], []));
console.log(findMedianSortedArrays([1, 3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));
