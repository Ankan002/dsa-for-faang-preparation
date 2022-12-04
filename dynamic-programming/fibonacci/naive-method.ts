/*
    ? Problem Statement: Find fibonacci.

    ! Time Complexity: O(2^n)
*/

const fibonacci = (num: number): number => {
    if(num <= 1) return num;

    const result = fibonacci(num - 1) + fibonacci(num - 2);

    return result;
}

console.log(fibonacci(10));
