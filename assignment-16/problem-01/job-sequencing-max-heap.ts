/*
    ? Problem Statement: Q1 of assignment 16.

    ! Time Complexity: O(n log n)
    ! Space Complexity: O(n)

    * Steps:

    * First sort the jobs on the base of deadlines.
    * Now keep an empty max heap.
    * Then start iterating the job array from the back.(Where the deadline is max)
    * After that check what is the max number of job slots between current job and the job with previous deadline i.e. between i and i-1.
    * Also push the current job in the max heap on the basis of profit.
    * Then until the job slots remaining becomes 0, keep popping from the max heap & adding the profit into profit variable. Finally return the profit.
*/

// * This is an util function of pushing into the heap
const heapPush = (maxJobHeap: Array<[string, number, number]>, jobWithDeadline: [string, number, number]): void => {
    maxJobHeap.push(jobWithDeadline);

    const maxLength = maxJobHeap.length - 1;

    let currentPos = maxJobHeap.length - 1;
    let parent = currentPos % 2 === 0 ? (currentPos - 2) / 2 : (currentPos - 1) / 2;

    while(parent >= 0) {
        if(maxJobHeap[parent][2] < maxJobHeap[currentPos][2]){
            maxHeapify(maxJobHeap, parent, maxLength);
        }

        currentPos = parent;
        parent = currentPos % 2 === 0 ? (currentPos - 2) / 2 : (currentPos - 1) / 2;
    }
}

// * This is an util function for popping from the heap
const heapPop = (maxJobHeap: Array<[string, number, number]>): [string, number, number] | undefined => {
    if(maxJobHeap.length < 1) return undefined;
    if(maxJobHeap.length === 1) return maxJobHeap.pop();

    const temp = maxJobHeap[0];
    maxJobHeap[0] = maxJobHeap[(maxJobHeap.length - 1)];
    maxJobHeap[(maxJobHeap.length - 1)] = temp;

    const valueToBeReturned = maxJobHeap.pop();
    maxHeapify(maxJobHeap, 0, maxJobHeap.length - 1);

    return valueToBeReturned;
}

// * This is an utility function for heapifying.
const maxHeapify = (maxJobHeap: Array<[string, number, number]>, parent: number, maxLength: number) => {
    if(parent > maxLength) return;

    const leftChildIndex = (parent * 2) + 1;
    const rightChildIndex = (parent * 2) + 2;

    let maxIndex = parent;

    if(leftChildIndex <= maxLength && maxJobHeap[leftChildIndex][2] > maxJobHeap[maxIndex][2]) maxIndex = leftChildIndex;
    if(rightChildIndex <= maxLength && maxJobHeap[rightChildIndex][2] > maxJobHeap[maxIndex][2]) maxIndex = rightChildIndex;

    if(parent !== maxIndex){
        const temp = maxJobHeap[maxIndex];
        maxJobHeap[maxIndex] = maxJobHeap[parent];
        maxJobHeap[parent] = temp;

        maxHeapify(maxJobHeap, maxIndex, maxLength);
    }
} 

// * This is the main function responsible getting the max profit.
const getMaxProfit = (jobsWithDeadline: Array<[string, number, number]>):number => {

    // * First we sort the jobs according to their deadlines
    jobsWithDeadline.sort((jobWithDeadlineOne, jobWithDeadlineTwo) => {
        if(jobWithDeadlineOne[1] === jobWithDeadlineTwo[1]) return 0;

        return (jobWithDeadlineOne[1] > jobWithDeadlineTwo[1]) ? 1 : -1;
    });

    // * Here we initiate the max profit with 0. And also a  max job heap
    let maxProfit = 0;
    let maxJobHeap: Array<[string, number, number]> = [];

    // * Now we iterarte the jobsWithDeadline from the back.
    for(let i=jobsWithDeadline.length - 1; i>=0; i--){
        // * We create a slots available with 0
        let slotsAvailable = 0;

        // * The we check if i=0, then the max slots available is the current deadline.
        if(i === 0) slotsAvailable = jobsWithDeadline[i][1];
        // * Else its current deadline - next dealine(or practically its the previous deadline).
        else slotsAvailable = jobsWithDeadline[i][1] - jobsWithDeadline[i-1][1];

        // * Then we push the current job into the max job heap
        heapPush(maxJobHeap, jobsWithDeadline[i]);

        // * Finally until there are slots remaining & max job heap is not empty, we pop from the heap & add the profits into the max profit
        while (slotsAvailable > 0 && maxJobHeap.length > 0){
            const job = heapPop(maxJobHeap);

            if(job) maxProfit += job[2];
            slotsAvailable--;
        }
    }

    // * Finally return the max profit.
    return maxProfit;
}

// ? Driver code
console.log(getMaxProfit(
    [
        ['a', 2, 100],
        ['b', 1, 19],
        ['c', 2, 27],
        ['d', 1, 25],
        ['e', 3, 15],
    ]
));

console.log(getMaxProfit(
    [['J1', 5, 55],
    ['J2', 2, 65],
    ['J3', 7, 75],
    ['J4', 3, 60],
    ['J5', 2, 70],
    ['J6', 1, 50],
    ['J7', 4, 85],
    ['J8', 5, 68],
    ['J9', 3, 45]]
));