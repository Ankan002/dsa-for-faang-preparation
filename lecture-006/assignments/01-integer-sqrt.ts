/*
    Problem Statement: First problem of assignment.pdf
    Time Complexity: O(log n)
*/

const sqrtInt = (num: number): number => {
    if(num < 0 || !Number.isInteger(num)) return -1;

    if(num <= 1) return num;

    let lb = 1;
    let ub = num === 2 ? num : Math.ceil(num / 2);

    let sqrt = -1;

    while(lb <= ub){
        const mid = lb + (Math.floor((ub - lb) / 2));

        if((mid * mid) === num) {
            sqrt = mid;
            break;
        }

        else if ((mid * mid) < num) {
            sqrt = mid;
            lb = mid + 1;
        }

        else ub = mid - 1;
    }

    return sqrt;
}

console.log(sqrtInt(4));
console.log(sqrtInt(8));