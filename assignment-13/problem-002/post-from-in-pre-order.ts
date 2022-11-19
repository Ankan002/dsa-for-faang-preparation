/*
    ? Problem: Q2 of Assignment 13.

    ! Time Complexity: O(n^2)
    ! Space Complexity: O(n)

    ! Approach: Create a tree from preorder and inorder traversal. Then traverse it in a postorder manner.

    ! NOTE: Time complexity can be improved using an hashmap to O(n) but to use that approach we need to have a confirmation that the tree does not have a duplicate node. This is helpful in case of Binary Search Tree.

    * Intuition

    * Actually the preorder traversal would define what is the next value but the inorder traversal would say us which side to place.
    * All the elements to the left of the selected element would lie in the left subtree but the right elements would lie in the right subtree.
*/

class TreeNode {
    val: string;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: string, left?: TreeNode, right?: TreeNode){
        this.val = val;
        this.left = left ? left : null;
        this.right = right? right : null;
    }
}

// * Initiate a preorder index with -1.
let preOrderIndex = -1;

// * This function is respobsible for building the tree. It takes the postOrder Traversal & the inOrderTraversal along with the range of search index in the inOrder Traversal.
const buildTree = (inOrder: Array<string>, preOrder: Array<string>, inOrderStartIndex: number, inOrderEndIndex: number): TreeNode | null => {
    // * If the left index of inorder traversal > right index of inorder traversal then we simply return null.
    if(inOrderStartIndex > inOrderEndIndex) return null;

    // * Here we increment the preOrderIndex to its correct position. And also create a new treenode with the current preorder index value.
    preOrderIndex++;
    const currentNode = new TreeNode(preOrder[preOrderIndex]);

    // * Now if the left index of inorder traversal == right index of inorder traversal, then we simply return the new Treenode.
    if(inOrderStartIndex === inOrderEndIndex) return currentNode;

    // * Then we find if the index of the value of the current node in the inorder traversal.
    const indexInInorder = searchInArray(inOrder, inOrderStartIndex, inOrderEndIndex, currentNode.val);

    // * Finally we reccursively call the buildTree function with the inOrder Traversal from left index of inorder traversal upto the indexInInOrder -1. The node or root of the subtree received in response is assigned to the current Node's left.
    currentNode.left = buildTree(inOrder, preOrder, inOrderStartIndex, indexInInorder - 1);

    // * Also we reccursively call the buildTree function again with the inOrder Traversal from indexInInOrder + 1 upto right index of inorder traversal. The node or root of the subtree received in response is assigned to the current Node's right.
    currentNode.right = buildTree(inOrder, preOrder, indexInInorder + 1, inOrderEndIndex);

    // * At the end we return the current node as the reponse as this will return the root reference of the subtree created.
    return currentNode;
}

// * This is an utility function for finding the index of a target element in an range of index of an array.
const searchInArray = (arr: Array<string>, startIndex: number, endIndex: number, key: string): number => {
    for(let i=startIndex; i<=endIndex; i++){
        if(arr[i] === key) return i;
    }

    return -1;
}

// * This function is responsible for performing the post order traversal.
const postOrderTraversal = (root: TreeNode | null): void => {
    if(!root) return;

    postOrderTraversal(root.left);
    postOrderTraversal(root.right);
    console.log(root.val);
}

// * This function is reponsible of assembling all the functions together.
const build = (inOrder: Array<string>, preOrder: Array<string>): void => {

    // * Here we call the buildTree Function and store the root reference returned by it in a root variable.
    const root = buildTree(inOrder, preOrder, 0, inOrder.length - 1);

    // * Here we perform the postOrder Traversal.
    postOrderTraversal(root);

    // * Finally we reset the postOrderIndex to -1 for further use case.
    preOrderIndex = -1;
}

// ? Drive Code
build(["D", "I", "A", "B", "C", "E", "G", "H", "F"], ["C", "D", "B", "I", "A", "E", "F", "G", "H"]);