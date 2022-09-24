# Heapify

The heapify function is simply conerts a normal array into heap. To convert a normal array to a heaf the time complexity comes out to be ``O(n)``.

### Procedure

- First of all of we have two function:

  - ``buildHeap``: This function just takes an array as an argument and returns the heap.
  - ``minHeapify``: This function take three arguments: `array`, `size of array` and `current parent`. This function is resposible for placing the parent at its correct position. `minHeapify` returns `void`.

- First of all in the `buildHeap` function we leave out the leaf nodes as they do not have any child to be compared with. So the find the starting index by using:

```typescript
let startingIndex = Math.floor(arr.length / 2) - 1;
```

- Now until and unless we reach the `0`th index we need to run the loop and call the `minHeapify` function inside the loop.

- So lets create the `minHeapify` function.

- So firstly we need to calculate the that particular node's left child index and right child index. We can easily calculate that with following formula.

```markdown
leftChildIndex = (parentIndex * 2) + 1
rightChildIndex = (parentIndex * 2) + 1
```

- To maintain the minIndex among the three let's create a minIndex and initiate it with parent.

- Now we have two primary condition:
  
  - First if `leftChildIndex < length of array` and `array[min] > array[leftChildIndex]`, then set `min = leftChildIndex`.

  - Secondly, if `rightChildIndex < length of array` and `array[min] > array[rightChildIndex]`, then set `min = rightChildIndex`.

- The above steps would give us the minmum most index.

- Now if `min != parent` simply swap their values and to check if the swapped value is in its actual position or not call the `minHeapify` function again but this time `min` index as the parent node.

### Final Code:

```typescript
const buildHeap = (nums: Array<number>): Array<number> => {
    let currentIndex = Math.floor(nums.length / 2) - 1;

    while(currentIndex >= 0) {
        minHeapify(nums, nums.length, currentIndex);
        currentIndex--;
    }

    return nums;
}

const minHeapify = (nums: Array<number>, sizeOfArray: number, parent: number): void => {
    let nextLeftIndex = (parent * 2) + 1;
    let nextRightIndex = (parent * 2) + 2;
    let min = parent;

    if(nextLeftIndex < sizeOfArray && nums[min] > nums[nextLeftIndex]){
        min = nextLeftIndex;
    }

    if(nextRightIndex < sizeOfArray && nums[min] > nums[nextRightIndex]){
        min = nextRightIndex;
    }

    if(min !== parent) {
        [nums[parent], nums[min]] = [nums[min], nums[parent]];
        minHeapify(nums, sizeOfArray, min);
    }
}
```
