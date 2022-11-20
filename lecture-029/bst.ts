/*
    ? Problem: Create a Binary Search Tree.
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

// * This function is responsible for inserting a value in binary search tree.
const insertInBST = (root: TreeNode | null, value: number): TreeNode => {
    if(!root) return new TreeNode(value);

    if(root.val === value) return root;

    if(root.val > value){
        root.left = insertInBST(root.left, value);
    }
    else {
        root.right = insertInBST(root.right, value);
    }

    return root;
}

// * This function helps to search a node in a binary search tree.
const searchInBST = (root: TreeNode | null, val: number): boolean => {
    if(!root) return false;

    if(root.val === val) return true;

    if(root.val > val) return searchInBST(root.left, val);
    else if(root.val < val) return searchInBST(root.right, val);

    return false;
}

// * This function is reponsible for deleting a node from BST.
const deleteFromBST = (root: TreeNode | null, val: number): TreeNode | null => {
    // * First if the root is null, we can simply return the root.
    if(!root) return root;

    // * Now if the value of root is greater than the value passed we search towards the left & assign the returned value to root.left. Else we searchthe right side & assign the value to root.right .
    if(root.val > val) root.left = deleteFromBST(root.left , val);
    else if(root.val < val) root.right = deleteFromBST(root.right, val);

    // * Finally if root.val == val
    else {
        // * If the node is a leaf node then we simply return null.
        if(!root.left && !root.right) return null;
        // * Now if it has only one child then we can return that child, & the replace the current node.
        else if(!root.left) return root.right
        else if(!root.right) return root.left;

        // * If it has both the children, then we find either the max on the left subtree(Inorder Predecessor) ot the min on right subtree(Inorder Successor). Then we simple delete that node and replace current node's value with the deleted node's value. Here we are following the Inorder Predecessor. Finally we return the current node.
        else {
            const maxOnLeft = findMaxLeftOrInOrderPredecessor(root.left);
            root.val = maxOnLeft;
            root.left = deleteFromBST(root.left, maxOnLeft);
            return root;
        }
    }

    return root;
}

// * This function finds the max in the left subtree.
const findMaxLeftOrInOrderPredecessor = (root: TreeNode): number => {
    if(!root.right) return root.val;
    return findMaxLeftOrInOrderPredecessor(root.right);
}

// * This function finds the min in the right subtree.
const findMinRightOrInOrderSuccessor = (root: TreeNode): number => {
    if(!root.left) return root.val;
    return findMinRightOrInOrderSuccessor(root.left);
}

// * This function is responsible for performing an in-order traversal.
const inOrderTraversal = (root: TreeNode | null) => {
    if(!root) return;

    inOrderTraversal(root.left);
    console.log(root.val);
    inOrderTraversal(root.right);
}

// ? Driver Code
const root = new TreeNode(10);
insertInBST(root, 3);
insertInBST(root, 31);
insertInBST(root, 13);
insertInBST(root, 34);
insertInBST(root, 20);
insertInBST(root, 39);

console.log(searchInBST(root, 13));
console.log(searchInBST(root, 15));

deleteFromBST(root, 3);
inOrderTraversal(root);
