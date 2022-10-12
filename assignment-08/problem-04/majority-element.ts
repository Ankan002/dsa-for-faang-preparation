/*
    ? Problem Statement: Q4 of Assignment sheet.

    ! Time Complexity: O(n)
    ! Space Complexity: O(1)
    ! Algo used: Moore's voting algorithm.
*/

// * This function returns the majority element using Moore's voting algorithm.
const getMajorityElement = (nums: Array<number>): number => {
    let candidate = nums[0];
    let currentCount = 0;

    for(let i=0; i<nums.length; i++){
        
        // * According to moore's algorithm if value at current position is equivalent to candidate, we increment the currentCount
        if(candidate === nums[i]){
            currentCount++;
        }
        //  * According to moore's algorithm if value at current position is not equivalent to candidate, we decrement the currentCount
        else {
            currentCount--;
        }

        // * If the currentCount is equal to 0 we update the candidate as the number at current position also we increment the currentCount
        if(currentCount === 0){
            candidate = nums[i];
            currentCount++;
        }
    }

    // * NOTE: According to Moore's algo, if the currentCount is less than or equal to one, we can conclude that no majority element exists in the array.

    let candidateCount = 0;

    // * We just verify here that the count of the selected candidate is actually greater than half of length of the array.
    for(let i of nums){
        if(i === candidate) candidateCount++;
    }

    if ((candidateCount) <= (nums.length / 2)) return -1;

    return candidate;
}

// ? Driver Code.
console.log(getMajorityElement([3,2,3]));
console.log(getMajorityElement([2,2,1,1,1,2,2]));
