const selectionSort = (nums: Array<number>): void => {
    for(let standIndex=0; standIndex<nums.length-1; standIndex++){
        let minIndex = standIndex;

        for(let j=standIndex+1; j<nums.length; j++){
            if(nums[j] < nums[minIndex]) minIndex = j;
        }

        if(standIndex !== minIndex) [nums[standIndex], nums[minIndex]] = [nums[minIndex], nums[standIndex]];
    }
}

const numsArray = [5, 1, 4, 2, 8];

selectionSort(numsArray);

console.log(numsArray);