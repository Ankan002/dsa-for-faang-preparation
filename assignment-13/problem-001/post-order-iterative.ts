/*
    ! Time Complexity: O(n)
    ! Space Complexity: O(n)

    ! Approach: Iterative Post Order Traversal

    * Steps

    * Check if the root is null then simply return null.
    * Now create two stacks main stack and a print stack.
    * First push the root into the main stack.
    * Now run a loop until the main stack becomes empty.
    * Inside the loop first pop out the top element & push its value into the print stack.
    * Now if there is a left child, then push it into the main stack.
    * Also if there is a right child, then push the right child.
    * Once you come out of the loop go into another loop until the print stack becomes empty.
    * Now inside the loop simply poop the values one by one from the print stack and print them.
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


const postOrderIterative = (root: TreeNode) => {
    // * Checking if the root is null
    if(!root) return;

    // * Here we initiate two stacks mainStack and the printStack.
    const mainStack: Array<TreeNode> = [];
    const printStack: Array<number> = [];

    // * First we push the root element into the stack.
    mainStack.push(root);

    // * Now until the mainStack becomes empty, we simply run a loop
    while(mainStack.length > 0){
        // * First we pop out the element from the stack.
        const currentNode = mainStack.pop();

        // * Then, push its value into the printStack
        if(currentNode) printStack.push(currentNode.val);

        //  * Finally if we have a left then push the left into the main stack. Also if the right is empty, then push the right into the main stack.
        if(currentNode && currentNode.left) mainStack.push(currentNode.left);
        if(currentNode && currentNode.right) mainStack.push(currentNode.right);
    }

    // * Then we run another loop until the printStack becomes empty.
    while(printStack.length > 0){
        // * Here we keep on popping out the elements and printing them.
        console.log(printStack.pop());
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

postOrderIterative(root);
