/*
    Problem Statement: Second problem of assignment.pdf
    Time Complexity: O(log n)
*/

type Version = 0 | 1;

const firstBadVersion = (versions: Array<Version>): number => {
    let lb = 0;
    let ub = versions.length - 1;


    while(lb <= ub){
        const mid = lb + (Math.floor((ub - lb) / 2));

        if((versions[mid] === 1 && mid === 0) || (versions[mid] === 1 && versions[mid - 1] === 0)) return mid;

        else if(versions[mid] === 1 && versions[mid - 1] === 1) ub = mid - 1;

        else lb = mid + 1;
    }

    return -1;
}

console.log(firstBadVersion([0,0,0,1,1,1,1,1,1]));
console.log(firstBadVersion([1,1,1,1,1,1,1,1,1]));
console.log(firstBadVersion([0,0,0]));