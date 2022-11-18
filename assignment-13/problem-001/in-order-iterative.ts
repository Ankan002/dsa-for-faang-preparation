/*
    ! Time Complexity: O(n)
    ! Space Complexity: O(n)

    ! Approach: InOrder Traversal

    * Steps

    * First we check if the the root is null, then we simply return.
    * Then we take a stack and curret variable.
    * We initite the current varibale with the root.
    * Then we run an infinite loop.
    * Inside the loop we check if the current variable is not undefined, then we simply push it into the stack.
    * Else if the current is null & the len of the stack is greater than 0, then we assign the popped out the value from the stack to current. Also we print the current's value and reassign current to current.right .
    * Else if nothing mateches the condition, then we simply break out of the loop.
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

const inOrderTraversal = (root: TreeNode | null): void => {
    // * If the root is null, then we simply return.
    if(!root) return;

    // * Now we initiate an empty stack and also a current node & assign root to it.
    const stack: Array<TreeNode> = [];
    let currentNode: TreeNode | undefined | null = root;

    // * Then we runn an infinite loop.
    while(true){
        // * Now if the currentNode is not null then we simply pusg the currentNode in the stack & assign the currentNode to currentNode.left .
        if(currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        }

        // * But if the current node is null & the stack's length > 0
        else if(stack.length > 0){
            // * Then we assign currenNode as pooped out value from the stack.
            currentNode = stack.pop();
            // * Then print current node's value.
            if(currentNode) console.log(currentNode.val);

            // * Finally we assign currentNode as currentNode's right.
            if(currentNode) currentNode = currentNode.right
        }

        // * If nothing matches then we simply break out of the loop.
        else break;
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

inOrderTraversal(root);