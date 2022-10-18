/*
    ? Problem: Q1 of assignment 10.

    ! Time Complexity: O(n)
    ! Space Complexity: O(1)
*/

/*
    ! Approach

    * First of all we check if the head is null or the head's next node is null or not. If any of them is null we can simply return the head.

    * Next the approach is like we are trying to change the memory address of the current node with the node preceeding that particular node.

    * To achieve that, what we do is we initiate 3 pointers, tempNode with head pointer, nextNode and prevNode as null. The names of the nodes are quite self explanatory for their job.

    * Now we run a loop while the tempNode not becomes null.

    * Then to keep track of the nextNode of the current node we first assign current Node's next to nextNode.

    * Second we change the current Node's next by saying currentNode.next = prevNode.

    * Then to incement or change the tempNode's position to the nextNode, first we update the prevNode with the tempNode & finally we update the tempNode as the nextNode.
    
    * And lastly we return the prevNode as it has become the new head to the list now.
*/

// * This the Node class that creates the LinkedList Node data type
class LinkedListNode {
    data: number;
    next: LinkedListNode | null;

    constructor(data: number, next?: LinkedListNode) {
        this.data = data;
        this.next = next ? next : null;
    }
}

// * This function is responsible for reversing the Linked List
const reverseList = (head: LinkedListNode | null): LinkedListNode | null => {
    // * We check if the head is null or even if the head.next is null.
    if(!head || !head.next) return head;

    // * Then we initiate prevNode as null.
    let prevNode: LinkedListNode | null = null;
    // * We initiate tempNode with head.
    let tempNode: LinkedListNode | null = head;
    // * Now, we initiate nextNode as null.
    let nextNode: LinkedListNode | null = null;

    // * We here run a loop while tempNode doesnot become null
    while(tempNode !== null){
        // * Firstly we assign nextNode as tempNode's next node.
        nextNode = tempNode.next;
        // * Next up, we update the tempNode's next pointer as the prevNode.
        tempNode.next = prevNode;

        // * Then, we update the prevNode as the tempNode.
        prevNode = tempNode;
        // * And finally, we update the tempNode with the nextNode.
        tempNode = nextNode;
    }

    // * Finally at the end, we return the prevNode.
    return prevNode;
}

// * This function simply prints all the values in the linkedlist.
const printList = (head: LinkedListNode | null): void => {
    let temp = head;

    while(temp !== null){
        console.log(temp.data);
        temp = temp.next;
    }
}

// ? Driver Code
const head = new LinkedListNode(1);
head.next = new LinkedListNode(2);
head.next.next = new LinkedListNode(3);
head.next.next.next = new LinkedListNode(4);
head.next.next.next.next = new LinkedListNode(5);

const headTwo = null;

const reversedHead = reverseList(head);
const reversedHeadTwo = reverseList(headTwo);

printList(reversedHead);
printList(reversedHeadTwo);
