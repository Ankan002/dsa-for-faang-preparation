/*
    ? Problem: Q3 of Assignment 9.

    ! Time Complexity: O(log n)
    ! Space Complexity: O(1)
*/

/*
    ! Approach

    * Here we are having a function, where we get x(number) and n(power) as arguments.

    * Then we identify if the power is in negative, and store it another variable.

    * Next we initiate a variable answer and store the answer there.

    * Now we run a loop util and unless the n is greater than zero.

    * Then we check if the n is odd we actually multiply answer by x, and decrement n by 1.

    * As the power becomes even we actually multiply the number by itself and divide the power by two. In other words we know that x^10 can be written as (x^2)^5, and just like that we can say, if we square the number then we can half the power.

    * Now I know after going through the code you are having a question that how am I bringing the value of x into answer. So, as you can see if n % 2 is not equal to 0 then we set answer as answer * x and we will eventually hit a situation at the end where power will be 1 & we will be able to multiply current answer to n.

    * Also there might be a corner case that even after getting power as 0, we might get something like x *= x according to the loop. First of all that doesnot matter, as once n is zero x no more be multiplied to answer and also we have put a condition that x *= x will only run if  n > 0.

    * Finally if power was negative, then we return 1 / answer. Else, we simply return answer.
*/

// * This functtion is responsible for finding the power.
const myPow = (x: number, n: number): number => {
  // * Here we hold if the power is negative.
  const isNegative = n < 0;

  // * Now we take the absolute power.
  n = Math.abs(n);

  let answer = 1;

  while (n > 0) {
    // * We check if the power is odd then we simply set answer as answer * x & decrement n by 1.
    if (n % 2 !== 0) {
      answer *= x;
      n--;
    }

    // * Then simply square the number and set power as power / 2.
    if(n > 0) x *= x;
    n /= 2;
  }

  // * If the power was negative then we can simply invert the answer as 1/answer
  if (isNegative) return 1 / answer;

  // * Else we simply return the answer.
  return answer;
};

// ? Driver Code
console.log(myPow(2.0, 10));
console.log(myPow(2.1, 3));
console.log(myPow(2.0, -2));
