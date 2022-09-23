const bubbleSort = (nums: Array<number>): void => {
    for(let i=0; i<nums.length; i++){
        for(let j=0; j<nums.length - 1 - i; j++){
            if(nums[j+1] < nums[j]){
                [nums[j], nums[j+1]] = [nums[j+1], nums[j]];
            }
        }
    }
}

const nums = [5, 1, 4, 2, 8];

bubbleSort(nums);

console.log(nums);