/*
    ? Question: Q2 of Assignment 10.

    ! Time Complexity: O(n)
    ! Space Complexity: O(1)
*/

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next?: ListNode){
        this.val = val;
        this.next = next ? next : null;
    }
}

// * This functuion is reponsible for converting a singly linked list into circular linked list.
const singlyToCircularLinkedList = (head: ListNode | null): void => {
    // * First of all we return if the head is null.
    if(!head) return;

    // * If it is not so, then we assign the head to temp.
    let temp = head;

    // * Now we run the loop util we reach the last element.
    while(temp.next !== null){
        temp = temp.next;
    }

    // * Finally we assign the last element's next pointer as the head.
    temp.next = head;
};

// * This function is responsible for printing the circular linked list.
const printCircularLinkedList = (head: ListNode): void => {
    let temp: ListNode | null = head;

    console.log(temp.val);
    temp = temp.next;

    while(temp !== head && temp?.next) {
        console.log(temp?.val);
        temp = temp?.next;
    }

    console.log(temp?.val);
}

// ? Driver Code
let head = new ListNode(20);
head.next = new ListNode(40);
head.next.next = new ListNode(45);
head.next.next.next = new ListNode(36);

singlyToCircularLinkedList(head);

printCircularLinkedList(head);
