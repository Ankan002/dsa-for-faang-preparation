const dpMemoizedFibonacci = (num: number, memoizedArray: Array<number>): number => {
    if(memoizedArray[num]) return memoizedArray[num];

    if(num <= 1) return num;

    const result = dpMemoizedFibonacci(num - 1, memoizedArray) + dpMemoizedFibonacci(num - 2, memoizedArray);

    memoizedArray[num] = result;

    return result;
}

const getFibonacci = (num: number): number => {
    const memoizedArray: Array<number> = new Array(num + 1);

    return dpMemoizedFibonacci(num, memoizedArray);
}

console.log(getFibonacci(800));