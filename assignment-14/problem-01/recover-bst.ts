/*
    ? Problem Statement: Q1 of assignment 13.

    ! Time Complexity: O(n)
    ! Space Complexity: O(1) -> If the auxilliary stack space is taken under consideration then its O(log n)

    * Steps:
    * First take four global pointers [first, mid, last & prev] and initiate them with null.
    * Now make a inorder traversal & during traversal follow the following steps.
    * Every time assign prev with root.
    * Now if prev is not null and prev.val > root.val, there can be two cases.
    * If first is null assign prev to first and current root to mid.
    * Else simply assgin current root to last.
    * Once we come out of the recursion, there can be two cases:
    * If first is not null and last is not null, then swap first.val & last.val [If the two values are not adjacent nodes, then first & last pointers keep their track].
    * Else if first is not null and mid is not null, then swap first.val & mid.val [If the two values are adjacent nodes, then first & mid pointers keep their track].
    * Reset the values of first, mid, last & prev to null
*/

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number, left?: TreeNode, right?: TreeNode) {
        this.val = val;
        this.left = left ? left : null;
        this.right = right ? right : null;
    }
}

// * Delcaring four pointers: first, mid, last & prev globally.
let first: TreeNode | null = null;
let mid: TreeNode | null = null;
let last: TreeNode | null = null;
let prev: TreeNode | null = null;

// * This function traverses the tree in Inorder manner & check where are the mistakes.
const traverseAndCheckInorderError = (root: TreeNode | null): void => {
    // * If the root is null then simply return.
    if(!root) return;

    // * Here we go towards the left first
    traverseAndCheckInorderError(root.left);

    // * If the prev is not null and prev's value is greater than current root's val, then someting is wrong.
    if(prev !== null && prev.val > root.val) {
        // * Now if the first has not yet been found then we can simply assign the first as prev and if there is a case where the nodes were adjacent, so to keep track of that we assign the mid as root.
        if(!first){
            first = prev;
            mid = root;
        }

        // * Else, here the second node was not adjacent so we assign last as root
        else last = root;
    }

    // * Here we assign the root to the prev pointer, to keep the track of previous pointer visited.
    prev = root;

    // * Finally, we go towards the right.
    traverseAndCheckInorderError(root.right);
}

// * This function calls the main traverse & mark function and correct the values.
const recoverTree = (root: TreeNode | null): void => {
    // * Here we call for the inorder & check function with root.
    traverseAndCheckInorderError(root);

    // * Case(Non-Adjacent Nodes) -> If the first is not null & last is also not null then we can simply swap their values.
    if(first !== null && last !== null) {
        const tempVal = first.val;
        first.val = last.val;
        last.val = tempVal;
    }
    // * Case(Adjacent-Nodes) -> Else if the the first is not null & mid is also not null then we can simply swap their values.
    else if(first !== null && mid !== null){
        const tempVal = first.val;
        first.val = mid.val;
        mid.val = tempVal;
    }

    // * Finally we reset first, mid, last & prev to null for further use cases.
    first = null;
    mid = null;
    last = null;
    prev = null;
}
