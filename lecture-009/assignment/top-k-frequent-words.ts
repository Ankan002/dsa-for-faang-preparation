// *This function is responsible for get frequency for each word. It returns an object with words being its key and their frequency as their respesctive values. It has a time complexity of O(n)
const getWordFrequency = (words: Array<string>): Record<string, number> => {
    if (words.length === 0) return {};
    const wordFrequency: Record<string, number> = {};

    for(let word of words){
        if(wordFrequency[word]) wordFrequency[word] += 1;
        else wordFrequency[word] = 1;
    }

    return wordFrequency;
}

// *This function is used to build a max heap from the frequncy object. It returns a max heap. It has a time complexity of O(n log n).
const buildHeapFromObject = (wordFrequency: Record<string, number>): Array<[string, number]> => {
    let wordFrequencyHeap: Array<[string, number]> = [];

    for(let word in wordFrequency) {
        wordFrequencyHeap.push([word, wordFrequency[word]]);

        let parentIndex = ((wordFrequencyHeap.length - 1) % 2 === 0) ? (wordFrequencyHeap.length - 1 - 2) / 2 : (wordFrequencyHeap.length - 1 - 1) / 2;
        let currentIndex = wordFrequencyHeap.length - 1;

        // !Here we first check if the parentIndex is greater than -1. Then we check if the frequency of the the element in currentIndex is greater than that of in parentIndex. But maybe both of them are equal, although their lexical order is different, so to counter that we check the third condition.
        while(parentIndex >= 0 && (wordFrequencyHeap[parentIndex][1] < wordFrequencyHeap[currentIndex][1] || (wordFrequencyHeap[parentIndex][1] === wordFrequencyHeap[currentIndex][1] && wordFrequencyHeap[parentIndex][0] > wordFrequencyHeap[currentIndex][0]))){
            maxHeapify(wordFrequencyHeap, wordFrequencyHeap.length, parentIndex);

            currentIndex = parentIndex;

            parentIndex = (parentIndex % 2 === 0) ? (parentIndex - 2) / 2 : (parentIndex - 1) / 2;
        }
    }

    return wordFrequencyHeap;
};

// *This function takes care of popping the topmost element from the heap. It takes the Heap as argument and returns either an array of containing the word and number or undefined. This has a time complexity of O(log n).
const popMaxHeap = (wordFrequencyHeap: Array<[string, number]>): [string, number] | undefined => {
    if(wordFrequencyHeap.length <= 1) return wordFrequencyHeap.pop();

    [wordFrequencyHeap[0], wordFrequencyHeap[wordFrequencyHeap.length - 1]] = [wordFrequencyHeap[wordFrequencyHeap.length - 1], wordFrequencyHeap[0]];

    maxHeapify(wordFrequencyHeap, wordFrequencyHeap.length - 1, 0);

    return wordFrequencyHeap.pop();
}

// *This function simply puts the given element in its correct position in the maxHeap.
const maxHeapify = (wordFrequencyHeap: Array<[string, number]>, lengthOfArray: number, parent: number) => {
    let nextLeftChildIndex = (parent * 2) + 1;
    let nextRightChildIndex = (parent * 2) + 2;
    let max = parent;

    // !Here we check if the frequency of the maxIndex element is less than nextLeftChildIndex element.
    if(nextLeftChildIndex < lengthOfArray && wordFrequencyHeap[nextLeftChildIndex][1] > wordFrequencyHeap[max][1]){
        max = nextLeftChildIndex;
    }

    // !If the frequency of both maxIndex element and nextLeftChildIndex element are same then we for their lexical order.
    else if(nextLeftChildIndex < lengthOfArray && (wordFrequencyHeap[nextLeftChildIndex][1] === wordFrequencyHeap[max][1] && wordFrequencyHeap[nextLeftChildIndex][0] <  wordFrequencyHeap[max][0])){
        max = nextLeftChildIndex;
    }

    // !Here we check if the frequency of the maxIndex element is less than nextLeftChildIndex element.
    if(nextRightChildIndex < lengthOfArray && wordFrequencyHeap[nextRightChildIndex][1] > wordFrequencyHeap[max][1]){
        max = nextRightChildIndex;
    }

    // !If the frequency of both maxIndex element and nextRightChildIndex element are same then we for their lexical order.
    else if(nextRightChildIndex < lengthOfArray && (wordFrequencyHeap[nextRightChildIndex][1] === wordFrequencyHeap[max][1] && wordFrequencyHeap[nextRightChildIndex][0] <  wordFrequencyHeap[max][0])){
        max = nextRightChildIndex;
    }

    // !Here if the index of parent and the maxIndex is different then we swap both of them and also call this function recursively to check if the maxIndex is correctly positioned.
    if(max !== parent) {
        [wordFrequencyHeap[max], wordFrequencyHeap[parent]] = [wordFrequencyHeap[parent], wordFrequencyHeap[max]];

        maxHeapify(wordFrequencyHeap, lengthOfArray, max);
    }
};

// *This is the main function that accumulates all the function and calls them in the correct order and returns and array of k size containing k most frequently occurring words. It has a time complexity of O(n log n).
const topKFrequent = (words: Array<string>, k: number): Array<string> => {
    let wordFrequency = getWordFrequency(words);

    let wordFrequencyHeap = buildHeapFromObject(wordFrequency);

    const frequentWords: Array<string> = [];

    let currentIndex = 0;

    while(currentIndex < k && wordFrequencyHeap.length > 0){
        let nextFrequentWord = popMaxHeap(wordFrequencyHeap);

        if(nextFrequentWord) frequentWords.push(nextFrequentWord[0]);

        currentIndex++;
    }

    return frequentWords;
}

// ? Driver Code
console.log(topKFrequent(["i","love","leetcode","i","love","coding"], 2));
console.log(topKFrequent(["the","day","is","sunny","the","the","the","sunny","is","is"], 4));
console.log(topKFrequent(["aaa","aa","a"], 3));
