/*
    ? Problem: Q3 of Assignment 10.

    ! Time Complexity: O(n)
    ! Space Complexity: O(1)
    ! Approach: Fast pointer and slow pointer
*/

/*
    ! Intuition

    * First we find the mid of the linked list.

    * Then we actually reverse the second half of the linked list.

    * Now we check the second half's value against the first half. If they are the same we retur true else false.

    * But before we return the result we return the actual order of the second half of the linked list.
*/

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next?: ListNode) {
        this.val = val;
        this.next = next ? next : null;
    }
}

// * This function is responsible for reversing the linked list. Its takes three params, head -> the first node, headNextAdress ->  the address where the head should point to, and finally the terminationNode -> the node where if the current node reaches, it should stop reversing.
const reverseLinkedList = (head: ListNode | null, headNextAddress: ListNode | null, terminationNode: ListNode | null): ListNode | null => {
    if(!head || !head.next) return head;

    let currentPtr: ListNode | null = head;
    let prevPtr = headNextAddress;
    let nextPtr: ListNode | null = null;

    while(currentPtr !== null && currentPtr !== terminationNode) {
        nextPtr = currentPtr.next;
        currentPtr.next = prevPtr;

        prevPtr = currentPtr;
        currentPtr = nextPtr;
    }

    return prevPtr;
}

// * This function checks of the linked list is palindrome or not.
const isPalindrome = (head: ListNode | null): boolean => {
    // * If the list is empty we return false but if the list contains only one element we return true.
    if(!head) return false;
    if(!head.next) return true;

    // * Now we initiate a prevSlowPointer with null to maintain the pointer before the slow pointer.
    let prevSlowPtr: ListNode | null = null;
    // * We initiate a slowPtr & fastPtr with head.
    let slowPtr: ListNode | null = head;
    let fastPtr: ListNode | null = head;

    // * The we run a loop until either fastPtr becomes null or fastPtr.next becomes null. 
    while(fastPtr !== null && fastPtr.next !== null){
        // * Now we move the fast pointer by two nodes.
        fastPtr = fastPtr.next.next;
        // * Then we set the prevSlowPtr as slowPtr.
        prevSlowPtr = slowPtr;

        if(slowPtr.next === null) break;
        // * Finally we move slowPtr by one node.
        slowPtr = slowPtr.next;
    }

    // * Now we can experimentally conclude that if fastPtr is null, then the lenght of the linked list is eve, else its odd.
    const isEvenLength = fastPtr === null;

    // * If we are having a odd length-ed linked list, then we can simply move the slow ptr by one to find from where to reverse the linked list.
    if(!isEvenLength) {
        prevSlowPtr = slowPtr;
        slowPtr = slowPtr.next;
    }

    // * Finally we assign mid as the prevSlowPtr.
    let mid = prevSlowPtr;

    // * At last we reverse the linked list from mid.next & the node it returns becomes the tail.
    const tail = reverseLinkedList(mid?.next ?? null, mid, null);

    // * Here we create a tailRef -> A reference of the tail & a headRef -> A  reference of the head. Also we initiate a isPalindrome variable as true.
    let tailRef = tail;
    let headRef: ListNode | null = head;
    let isPalindrome = true;

    // * Now we run a loop until headRef becomes mid.next or null or tailRef becomes mid or null. 
    while(headRef !== mid?.next && tailRef !== mid && headRef && tailRef){
        // * If headRef's val is not equivalent to tailRef's val, then we make isPalindrome false and break out of the loop.
        if(headRef.val !== tailRef?.val){
            isPalindrome = false;
            break;
        }

        // * If its not so then we go to the next headRef & tailRef.
        headRef = headRef.next;
        tailRef = tailRef.next;
    }

    // * Finally we reshape the second half of the linked list by passing the head as the tail and the endpoint as the mid.
    const midsNext = reverseLinkedList(tail, null, mid);

    // * Now the head returned by the reversal function is assigned as the next of the mid.
    if(mid) mid.next = midsNext;

    // * And finlly we return isPalindrome.
    return isPalindrome;
}

// ? Driver Code.
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(2);
head.next.next.next.next = new ListNode(1);

console.log(isPalindrome(head));