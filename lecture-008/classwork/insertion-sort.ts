const insertionSort = (nums: Array<number>): void => {
    for(let i=0; i<nums.length - 1; i++){
        const compareNum = nums[i+1];
        let currentComparingIndex = i;

        while(currentComparingIndex>=0 && nums[currentComparingIndex] > compareNum){
            nums[currentComparingIndex+1] = nums[currentComparingIndex];
            currentComparingIndex--;
        }

        nums[currentComparingIndex+1] = compareNum;
    }
}

const nums = [5, 1, 4, 2, 8];

insertionSort(nums);

console.log(nums);