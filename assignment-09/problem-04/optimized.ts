/*
    ? Problem: Q4 of assignment 9

    ! Time Complexity: O(log n)
    ! Space Complexity: O(1)

    ! Approach: Simplified Bitwise shift

    ! Note: check mathematical-approach.ts for most optimized solution.
*/

const divide = (dividend: number, divisor: number): number => {
    // * First we figure out if the final quotient is positive or negative.
    const isPositive = Math.sign(dividend) === Math.sign(divisor);
    
    // * Now we convert the divident and the divisor into their respective absolute values.
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);

    // * If the dividend is less than the divisor then we return zero.
    if (dividend < divisor) return 0;

    // * Then we initiate the quotient with 0.
    let quotient = 0;

    // * Here we run a loop while dividend is greater than or equal to divisor.
    while(dividend >= divisor) {
        // * Now we initiate the initial count with one and a current divisor with divisor as along the way we will be doubling it up.
        let count = 1;
        let currentDivisor = divisor;

        // * Then we run a loop while dividend is greater than or equal to currentDivisor.
        while(dividend >= currentDivisor){
            // * Then we subtarct the currentDivisor from the dividend & add the count to the quotient
            dividend -= currentDivisor;
            quotient += count;

            // * Finally we double up the current divisor & the count as its very simple if we double the current divisor & divide the divident then we would need to double the quotient count.
            currentDivisor += currentDivisor;
            count += count;
            
        }
    }

    // * Here we go out of the loop and if the quotient needs to be negative we add a minus before it.
    if(!isPositive) quotient = -quotient

    // * Finally we check it they are going out of the 32 bit integer bound. If it is so then we return there respective values, else we return the quotient.
    return Math.min(Math.max(-2147483648, quotient), 2147483647);
};

// ? Driver Code.
console.log(divide(10, 3));
console.log(divide(-2147483648, -1));