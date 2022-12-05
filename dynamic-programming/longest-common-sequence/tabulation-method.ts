/*
    ? Problem Statement: DP Tabular Approach for Longest Common Subsequence.

    ! Time Complexity: O(m * n)
    ! Space Complexity: O(m * n)
*/

// * This the response format in which the length of the subsequence and its characters would be returned.
interface LongestCommonSubsequenceResponse {
    longestCommonSubsequenceLength: number;
    longestCommonSubsequenceCharacters: Array<string>;
}

// * This function is responsible for finding the longest common subsequence
const getLongestCommonSubsequence = (text1: string, text2: string): LongestCommonSubsequenceResponse => {
    // * First we need to initialize a matrix or table with size (text1.length + 1 x text2.length + 1)
    const memoizedTable: Array<Array<number>> = [];

    for(let i=0; i<(text1.length + 1); i++){
        memoizedTable.push(new Array(text2.length + 1));
    }

    // * Now run a nested loop until we reach the last cell.
    // * If i == 0 or j == 0, the memoizedTable[i][j] = 0
    // * Else if, charracter at position i - 1 of text1 is equal to character at position j - 1 of text2, then set memoizedTable[i][j] to the previous diagonal cell i.e. memoizedTable[i-1][j-1]
    // * Else character set memoizedTable[i][j] to max of memoizedTable[i-1][j] and memoizedTable[i][j-1] i.e. the max of horizontally previous or vertically previous.
    for(let i=0; i<memoizedTable.length; i++){
        for(let j=0; j<memoizedTable[0].length; j++){
            if(i === 0 || j === 0){
                memoizedTable[i][j] = 0;
                continue;
            }

            if(text1.charAt(i-1) === text2.charAt(j-1)){
                memoizedTable[i][j] = memoizedTable[i-1][j-1] + 1;
            }
            else {
                memoizedTable[i][j] = Math.max(memoizedTable[i-1][j], memoizedTable[i][j-1]);
            }
        }
    }

    // * Now we need to find the characters selected in the sequence. We can also simply create this while getting the count but we are gonna do this to see how to find it if we are given simply with the array.

    /*
        * Initialize the following:
        * the currentRowPointer and the currentColumnPointer to the extreme ends that means the right bottom corner of matrix.
        * Intiate an array matches to store the matches.
        * Also maxMatchCanBeFound with the value at the corner of the matrix because that's the max value that can be found, and a matchesFound with zero.
    */
    let currentRowPointer = memoizedTable.length - 1;
    let currentColumnPointer = memoizedTable[0].length - 1;
    let matchesFound = 0;
    
    const matches: Array<string> = [];
    const maxMatchCanBeFound = memoizedTable[memoizedTable.length - 1][memoizedTable[0].length - 1];

    // * Then run a loop while currentRowPointer > 0 and currentColumnPointer > 0 and matchesFound < maxMatchCanBeFound
    while(currentRowPointer > 0 && currentColumnPointer > 0 && matchesFound < maxMatchCanBeFound){
        // * If value at current cell does not match with cell horizontally pervious cell & vertically previous one and also its just one increment of the value at diagonally previous one, then we can add that element at string 1, i.e, str1.charAt(currentRowPointer - 1) to the matches, decrement currentColumnPointer & currentRowPointer both 1 to move diagonally & increment the matches found by 1.
        if(
            memoizedTable[currentRowPointer][currentColumnPointer] !== memoizedTable[currentRowPointer-1][currentColumnPointer] && memoizedTable[currentRowPointer][currentColumnPointer] !== memoizedTable[currentRowPointer][currentColumnPointer-1] && memoizedTable[currentRowPointer][currentColumnPointer] === memoizedTable[currentRowPointer-1][currentColumnPointer-1] + 1
        ) {
            matches.unshift(text1.charAt(currentRowPointer - 1));
            currentColumnPointer--;
            currentRowPointer--;
            matchesFound++;
        }

        // * Else, see if the value at the horizontally previous is greater than or equal to vertically previous position value, then move horizally back by 1 i.e.currentColumnPointer-- else move vertically upwards by 1 i.e., currentRowPointer--.
        else {
            if(memoizedTable[currentRowPointer][currentColumnPointer-1] >= memoizedTable[currentRowPointer-1][currentColumnPointer]){
                currentColumnPointer--;
            }

            else {
                currentRowPointer--;
            }
        }
    }

    // * Finally we can return an object with longestCommonSubsequenceCharacters as matches & longestCommonSubsequenceLength as maxMatchCanBeFound.
    return {
        longestCommonSubsequenceCharacters: matches,
        longestCommonSubsequenceLength: maxMatchCanBeFound
    };
}

// ? Drive Code
console.log(getLongestCommonSubsequence("gxtxayb", "aggtab"));
console.log(getLongestCommonSubsequence("aggtab", "gxtxayb"));
console.log(getLongestCommonSubsequence("bd", "abcd"));
