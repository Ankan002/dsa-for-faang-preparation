/*
    ? Problem: Q5 of Assignment 10

    ! Time Complexity: O(n)
    ! Space Complexity: O(1)

    ! Approach Used: Slow and Fast Pointers Algo.
*/

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next?: ListNode){
        this.val = val;
        this.next = next ? next : null;
    }
}

// * This function is responsible to detect if there is a cycle in the linked list.
const hasCycle = (head: ListNode | null): boolean => {
    // * We check if there is head is null or head.next is null or head.next.next is null, if it is so then we simply return false.
    if(!head || !head.next || !head.next.next) return false;

    // * Now we intialize a slow pointer with head but fast pointer with head.next.next to ensure that they are not the same in the first pass.
    let slowPtr: ListNode | null = head;
    let fastPtr: ListNode | null = head.next.next;

    // * We here run a loop utill the fast pointer becomes null if it becomes null then we know that the linked list has a dead end & it does not contain a cycle.
    while(fastPtr !== null){
        // * Now at any point if out fast pointer and the slow pointer meets each other, then bingo there is a cycle.
        if(fastPtr === slowPtr) return true;

        // * Now before increasing fast pointer by 2, we need to ensure that there is a fastPtr.next, if there is none then also we have reached a dead end & its over.
        if(fastPtr.next === null) return false;
        fastPtr = fastPtr.next.next;
        
        if(slowPtr.next === null) return false;
        slowPtr = slowPtr.next;
    }

    // * Finally if we reach here then we know that we definitely do not have a cycle.
    return false;
}

// ? Driver Code
const head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = new ListNode(0);
head.next.next.next = new ListNode(-4);
head.next.next.next.next = head.next;

console.log(hasCycle(head));

const headTwo = new ListNode(0);
headTwo.next = new ListNode(1);
headTwo.next.next = new ListNode(2);
headTwo.next.next.next = new ListNode(3);

console.log(hasCycle(headTwo));
