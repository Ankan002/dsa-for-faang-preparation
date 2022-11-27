/*
    ? Problem Statement: Q2 of assignment 15.
    
    ! Time Complexity: O(n)
    ! Space Complexity: O(1) -> If auxilliary space is taken under consideration, then it is O(log n)

    * Steps
    * If the root is null then return null.
    * Now recursively call the invertTree func once with root.left & root.right. Also store the returned values in two variables.
    * Then set root.left as right subtree root & root.right as left subtree root.
    * Finally return the root.
*/

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number, left?: TreeNode, right?: TreeNode){
        this.val = val;
        this.left = left ? left : null;
        this.right = right ? right : null;
    }
}

// * This function is responsible for inverting the binary tree and returning the root.
const invertTree = (root: TreeNode | null): TreeNode | null => {
    // * First we check if the root is null then er return null.
    if(!root) return null;

    // * Now we store the root of the left subtree and the right subtree in two variables.
    const rightSubtreeRoot = invertTree(root.left);
    const leftSubtreeRoot = invertTree(root.right);

    // * Then swap the stored values by assigning root.left as leftSubtreeRoot(prviously right subtree root) & root.right as rightSubtreeRoot(prviously left subtree root).
    root.left = leftSubtreeRoot;
    root.right = rightSubtreeRoot;

    // * Finally return root.
    return root;
};
