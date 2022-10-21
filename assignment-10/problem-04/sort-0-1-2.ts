/*
    ? Problem: Q4 of Assignment 10.

    ! Time Complexity: O(n)
    ! Space Complexity: O(1)

    ! Approach: Counting Sort for Linked List. 
*/

class ListNode {
    data: number;
    next: ListNode | null;

    constructor(data: number, next?: ListNode) {
        this.data = data;
        this.next = next ? next : null;
    }
}

// * This function is responsible for sorting the 0, 1 and 2 in its correct places. We are sorting in place.
const sort = (head: ListNode | null): void => {
    // * We check if there is no head or no head.next, then we simly return. 
    if(!head || !head.next) return;

    // * Next up we create a temp pointer that points towards the head, initially.
    let temp: ListNode | null = head;

    // * Also we initiate a numberOfZero, number of Ones and numberOfTwo counters to keep a track of number of 0's, 1's and 2's we come across.
    let numberOfZero = 0;
    let numberOfOne = 0;
    let numberOfTwo = 0;

    // * Here we run a loop untill temp becomes null and count the number of zeros, ones and twos.
    while(temp !== null) {
        if(temp.data === 0) numberOfZero++;
        else if(temp.data === 1) numberOfOne++;
        else if(temp.data === 2) numberOfTwo++;

        temp = temp.next;
    }

    // * Now its time to put all the values in its correct places, so we assign temp as the head.
    temp = head;

    // * Finally we run a loop untill temp becomes null.
    while(temp !== null){
        // * Firstly we check if number of zeros is greater than zero, then we change the temp.data with 0, also decrement numberOfZeros by 1
        if(numberOfZero > 0){
            temp.data = 0;
            numberOfZero--;
        }
        // * Then we check if number of ones is greater than zero, then we change the temp.data with 1, also decrement numberOfOnes by 1
        else if(numberOfOne > 0){
            temp.data = 1;
            numberOfOne--;
        }
        // * Else we check if number of twos is greater than zero, then we change the temp.data with 2, also decrement numberOfTwos by 1
        else if(numberOfTwo > 0){
            temp.data = 2;
            numberOfTwo--;
        }

        // * Finally we move temp towards its next.
        temp = temp.next;
    }
}

const printList = (head: ListNode) => {
    let temp: ListNode | null = head;

    while(temp !== null){
        console.log(temp.data);
        temp = temp.next;
    }
}

// ? Driver Code
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(2);
head.next.next.next = new ListNode(1);
head.next.next.next.next = new ListNode(2);
head.next.next.next.next.next = new ListNode(0);
head.next.next.next.next.next.next = new ListNode(2);
head.next.next.next.next.next.next.next = new ListNode(2);

sort(head);
printList(head);
