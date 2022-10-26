/*
    ? Problem: Q6 of Assignment 10.

    ! Time Complexity: O(n)
    ! Space Complexity: O(1)

    ! Approach: Fast & Slow Pointer
*/

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val: number, next?: ListNode ){
        this.val = val;
        this.next = next ? next : null;
    }
}

// * This function removes the nth node from the end of the Linkedlist.
const removeNthFromEnd = (head: ListNode | null, n: number): ListNode | null => {
    // * If the head is null, then we will return head.
    if(!head) return head;
    // * If head.next is null & we need to delete the last node, then we simply return null.
    if(!head.next && n === 1) {
        head = null;
        return head;
    }

    // * Here we initiate the fastPtr & slowPtr with head.
    let fastPtr: ListNode | null = head;
    let slowPtr: ListNode | null = head;

    // * We also maintain a counter that would maintain the number of nodes moved. This is initiated with zero.
    let countMoved = 0;

    // * Here first we move n node from the front to maintain the equivalence via a loop.
    while(countMoved < n && fastPtr !== null){
        // * If the fastPtr.next becomes null, the we check if the count moved is actually equivalent to n-1, if it is so, then we know that the head needs to be changed, thus we change the head & return the same. Else we know that the node that they are asking us to change is not even in the scope & hence we return head.
        if(fastPtr.next === null){
            if(countMoved === (n - 1)) {
                head = slowPtr.next;
                return head;
            }

            return head;
        }

        // * Finally we update the fastPtr by one and aldo the counter by one.
        fastPtr = fastPtr.next;
        countMoved++;
    }

    // * Now we move the fast pointer and the slow pointer until the fastPtr.next becomes null to position the slowPtr at its correct position that is the position just before the node that needs to be deleted.
    while(fastPtr && fastPtr.next !== null && slowPtr){
        fastPtr = fastPtr.next;
        slowPtr = slowPtr.next;
    }

    if(!slowPtr || !slowPtr.next) return head;

    // * Now after that operation we simply delete the slowPtr.next node by assigning slowPtr.next.next to slowPtr.next
    slowPtr.next = slowPtr.next.next;

    // * Finally we return the head.
    return head;
}

// ? Driver Code
const head = new ListNode(1);
head.next = new ListNode(2);

const newHead = removeNthFromEnd(head, 1);