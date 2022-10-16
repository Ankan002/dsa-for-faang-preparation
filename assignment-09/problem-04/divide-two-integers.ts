/*
    ? Problem: Q4 of Assignment 9

    ! Time Complexity: 
        ! - Worst Case: O(n/m) -> n = dividend & m = divisor
        ! - Average Case: Theta(log n) -> n = dividend

    ! Space Complexity: O(1)
*/

// * This function is reposnible for finding the quotient of dividend and divisor.
const divide = (dividend: number, divisor: number): number => {
    // * Here we figure out if the answer will be positive or negative.
    const answerSignIsPositive = Math.sign(dividend) === Math.sign(divisor);

    // * Now we are taking absolute values if the dividend and divisor.
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);

    // * If the dividend is less than divisor then no point of dividing and we can return 0, then and there.
    if (dividend < divisor) return 0;

    // * Here we create a copy of the divisor to keep track of current divisor and also to remember what was the actual divisor because we would need that later on.
    let divisorValue = divisor;
    let answer = 1;

    // * Now we can say if divisorValue * 2 is less than or equal to dividend then we can set divisorValue as divisorValue + divisorValue & if we double up the divisor, we can double up the quotient. Time Complexity of this loop is O(log n);
    while(divisorValue + divisorValue <= dividend) {
        divisorValue += divisorValue;
        answer += answer;
    }

    // * Now here we actually check if the answer has crossed the boundaries of a valid 32 bit signed integer. If it is so, then we return the boundary value i.e. (2 ** 31) -1 for positive numbers and -(2 ** 31) for negative numbers. This helps us to manage time complexity for very very large quotients in just O(log n).
    if(!answerSignIsPositive && (-answer) <= -(2 ** 31)) return -(2 ** 31);

    if(answer > (2**31) - 1) return (2**31) - 1;

    // * Now if some small parts if left then we actully run the loop utill divisorValue + value <= dividend. There, we increase the divisorValue by dividor and increment answer by 1. Here we hit the worst case time complexity i.e. O(n/m).
    while(divisorValue + divisor <= dividend) {
        divisorValue += divisor;
        answer += 1;
    }

    // * Now we finally again check the 32 bit signed integer boundaries.
    if(!answerSignIsPositive && (-answer) <= -(2 ** 31)) return -(2 ** 31);

    if(answer > (2**31) - 1) return (2**31) - 1;

    // * Finally here we return the answer.
    if(!answerSignIsPositive) return (-answer);

    return answer;
}

// ? Driver Code.
console.log(divide(10, 3));
console.log(divide(2147483647, 1));
console.log(divide(-2147483648, 1));
