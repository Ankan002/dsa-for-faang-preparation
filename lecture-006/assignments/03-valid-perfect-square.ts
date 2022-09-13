/*
    Problem Statement: Third problem of assignment.pdf
    Time Complexity: O(log n)
*/

const isPerfectSquare = (num: number): boolean => {
    if(num < 0 || !Number.isInteger(num)) return false;

    if(num <= 1) return true;

    let lb = 1;
    let ub = num === 2 ? num : Math.ceil(num / 2);

    while(lb <= ub) {
        const mid = lb + Math.floor((ub - lb) / 2);

        if((mid * mid) === num) return true;

        else if((mid * mid) < num) lb = mid + 1;

        else ub = mid - 1;
    }

    return false;
} 

console.log(isPerfectSquare(16));
console.log(isPerfectSquare(14));