# Top k Frequent Words

### Problem Statement

```markdown
Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.
```

### Approach

- First of all, we need to find the frequency of each and every word. After finding that we are using an object to store them.

- Now as the problem statement states that we need to find the most frequently occuring elements, so we will be using a `MAX HEAP`. You must be wondering that how can we do so due to lexical order thing but we can handle that as another condition.

- Firstly we will create an array of array, where each element of the parent array will be an array of word as its first index and their frequency as the second index.

- Now we can push each key and pair of the frequency object into the heap one by one and check if they are in the correct position. This would be done by `buildHeapFromObject` function and would do their job in `O (n log n)` Time complexity.

- Also if they are not in their correct position then a function named `maxHeapify` will come into action and place them in their correct place.

- Taking about the `maxHeapify` function, it would take the `heap`, `length of array` and `parent index` as its argument and also would be a recursive function.

- Now it would create a maxIndex variable that would be initiated with the parent index.

- Next we can calculate the `nextLeftChildIndex` and `nextRightChildIndex` with the following formula:

```markdown
leftChildIndex = (parentIndex * 2) + 1
rightChildIndex = (parentIndex * 2) + 1
```
- Then we need to check the following conditions:

  - First if `leftChildIndex < length of array` and frequency at the word at max index is less than frequency at leftChildIndex, then we set `maxIndex = leftChildIndex`.

  - If it is not so, and both max index word's freuency and the leftChildIndex word's frequency are same but leftChildIndex's word's lexical order is less than that of maxIndex's word's lexical order, then we can simply set `maxIndex = leftChildIndex`.

  - First if `rightChildIndex < length of array` and frequency at the word at max index is less than frequency at rightChildIndex, then we set `maxIndex = rightChildIndex`.

  - If it is not so, and both max index word's freuency and the rightChildIndex word's frequency are same but rightChildIndex's word's lexical order is less than that of maxIndex's word's lexical order, then we can simply set `maxIndex = rightChildIndex`.

- Finally if `parent != max`, then we swap both the indexes and call the same function recursively just with max as its parent index just to check if now max is placed correctly.

- So, as we have now got a correctly positioned maxHeap, we can now simply pop out the max occuring element from top of the heap k number of times with the help of `popMaxHeap` function. 

- The `popMaxHeap` function just pops the topmost value from the heap and returns the popped value. It completes its job in `O (log n)` time. To get a clear idea of the function refer the code file.

- Now that's it... you simply place the words of the popped array into another array and return that array. Finnaly the TIME COMPLEXITY to implement this code will be `O (log n)`.

FOR MORE CLARITY and CODE refer the `top-k-frequent-words.ts` file.
