/*
    ! Intuition

    * a / b = c
    * => log(a/b) = log(c) [Here base is e]
    * => log(a) - log(b) = log(c)
    * => e^(log(a) - log(b)) = c
    * => c = e^(log(a) - log(b)) [Here e is exponential]
    
    ! Time Complexity: O(1)
    ! Space Complexity: O(1)

    ! Note: This is the most effiecient approach.
*/

const divide = (dividend: number, divisor: number): number => {
    // * If divident or divisor is 0 then we return 0 as the quotient.
    if(dividend === 0 || divisor === 0) return 0;

    // * Now we figure out if the resulting quotient is positive or negative.
    const isPositive = Math.sign(dividend) === Math.sign(divisor);

    // * Now we take absolute values of dividend and divisor.
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);

    // * We initiate the value of quotient with zero.
    let quotient = 0;

    // * Here we check if the value of divisor is 1 then we set quotient as the dividend else we calculate the actual quotient using the above given formula.
    if(divisor === 1) quotient = dividend;
    else quotient = Math.floor(Math.exp(Math.log(dividend) - Math.log(divisor)));

    // * If the quotient needs to be negative we add a minus before it.
    if(!isPositive) quotient = -quotient;

    // * Finally we check it they are going out of the 32 bit integer bound. If it is so then we return there respective values, else we return the quotient.
    return Math.min(Math.max(-2147483648, quotient), 2147483647);
};

// ? Driver Code.
console.log(divide(10, 3));
console.log(divide(-2147483648, -1));