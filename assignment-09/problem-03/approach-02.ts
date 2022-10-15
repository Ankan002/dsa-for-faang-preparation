/*
    ? Problem: Q3 of Assignment 9.

    ! Time Complexity: O(log n)
    ! Space Complexity: O(1)

    ? Note: This is simply the reccursive approach of the previous problem.

    ? Note: Also we are using O(log n) extra auxilliary space to store the recursion stack.
*/

const myPow = (x: number, n: number): number => {
    const isNegative = n < 0;

    n = Math.abs(n);

    if(isNegative) return 1 / myPowHelper(x, n)

    return myPowHelper(x, n)
};

const myPowHelper = (x: number, n: number): number => {
    if (n === 0) return 1;
    if (n === 1) return x;

    let currentAnswer = 1;

    if(n % 2 !== 0) {
        currentAnswer *= x;
        n--;
    }

    currentAnswer *= myPowHelper((x * x), n / 2);

    return currentAnswer;
}

console.log(myPow(2.0, 10));
console.log(myPow(2.1, 3));
console.log(myPow(2.0, -2));