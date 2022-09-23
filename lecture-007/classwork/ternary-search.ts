const ternarySearch = (nums: Array<number>, target: number): number => {
    let lb = 0;
    let ub = nums.length - 1;

    while(lb <= ub){
        const midOne = lb + (Math.floor((ub - lb) / 2));
        const midTwo = ub - (Math.floor((ub - lb) / 2));

        if(nums[midOne] === target) return midOne;
        else if(nums[midTwo] === target) return midTwo;

        else if(target < nums[midOne]) ub = midOne - 1;
        else if(target > nums[midTwo]) lb = midTwo + 1;

        else {
            lb = midOne + 1;
            ub = midTwo - 1;
        }
    }

    return -1;
}

console.log(ternarySearch([23, 45, 67, 89, 93, 99, 101], 45));
console.log(ternarySearch([23, 45, 67, 89, 93, 99, 101], 89));
console.log(ternarySearch([23, 45, 67, 89, 93, 99, 101], 101));
console.log(ternarySearch([23, 45, 67, 89, 93, 99, 101], 506));