/*
    ? Problem Statement: Q1 of assignment 13.
    
    ! Time Complexity: O(n)
    ! Space Complexity: O(n)

    ! Approach: Iterative Pre Order Traversal.

    * Steps

    * Check if the root is null then simply return.
    * Create a stack first.
    * Now, run a loop until the stack becomes empty.
    * In the loop first pop out the top most element and print that.
    * Then if it has a right child then push it into the stack.
    * Then if it has a left child then push it into the stack.
*/

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number, left?: TreeNode, right?: TreeNode){
        this.val = val;
        this.left = left ? left : null;
        this.right = right? right : null;
    }
}

// * This function is responsible for pre-order traversal in an iterative manner.
const preOrderIterative = (root: TreeNode | null): void => {
    // * First if the root is null, then simply return.
    if(!root) return;

    // * Now lets initialize an empty stack, and push the root into it.
    const stack: Array<TreeNode> = [];
    stack.push(root);

    // * Lets run a loop while the length of the stack does not become zero.
    while(stack.length > 0){
        // * First we pop out the topmost element.
        const currentNode = stack.pop();

        // * Then we print that element out.
        if (currentNode) console.log(currentNode.val);

        // * Now we check if the there is a current node's right, then we simply push the current node into the stack.
        if(currentNode && currentNode.right) stack.push(currentNode.right);
        // * Then we check if the there is a current node's left, then we simply push the current node into the stack.
        if(currentNode && currentNode.left) stack.push(currentNode.left);
    }
}

// ? Driver code.
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

preOrderIterative(root);
