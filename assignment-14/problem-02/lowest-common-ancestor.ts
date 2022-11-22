/*
    ? Problem Statement: Q2 of assignment 14.

    ! Time Complexity: O(n)
    ! Space Complexity: O(n)

    * Steps:

    * As the tree is a BST then we can say that each node is unique & there will only be an unique path to reach to that node.
    * So, now we can find the two paths: from root to point1 & from root to point2.
    * Now, initialy path might be same, so we would traverse through both the array & select the last number that both has in common.
    * That common number would be our LCA. 
    

    ! NOTE: There might be a question if the first node is the parent of the second node and the second node is a leaf node. Then the case automatically gets handles as the loop runs while both of the array has values in it. If any of the array runs out then simply the last value that came in common i.e. the first node will come as the answer.
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

// * This function helps us to find the path from root to the target node. It also take a pathArray, where it stores the path traversed by it. Also if no path is found it returns false as a flag.
const findPathToNodeInBST = (root: TreeNode | null, target: number, pathArray: Array<number>): boolean => {
    // * If there is no root return false
    if(!root) return false;

    // * Now first push root's value into the array.
    pathArray.push(root.val);

    // * Then if the root's val is equal to target, then return true.
    if(root.val === target) return true;

    // * Now call recursive the function with root.left & root.right and if any of the calls return true, then return true from there.
    if(findPathToNodeInBST(root.left, target, pathArray)) return true;
    if(findPathToNodeInBST(root.right, target, pathArray)) return true;

    // * Now, if we do not find a path & it returns false, then we simply pop out the value we have added and return false.
    pathArray.pop();

    return false;
}

// * This is the main function responsible for finding the LCA.
const lowestCommonAncestor = (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null => {
    // * First check if any of the target is null simply return null. 
    if(!p || !q) return null

    // * Now initiate two path arrays to store the path to p & q Node.
    const pPath: Array<number> = [];
    const qPath: Array<number> = [];

    // * Here we are calling the function findPathToNodeInBST to get the path from root to P & root to Q.
    const isPPathFound = findPathToNodeInBST(root, p.val, pPath);
    const isQPathFound = findPathToNodeInBST(root, q.val, qPath);

    // * Now if any of the path is not found then we can simply return null.
    if(!isPPathFound || !isQPathFound) return null;

    // * If it is not so, we can actually initiate a currentPosition pointer with 0.
    let currentPosition = 0;

    // * Then run a loop while currentPosition < P'Path.length and currentPosition < Q'Path.length
    while(currentPosition < pPath.length && currentPosition < qPath.length) {
        // * If the value comes out to be different then we can simplty break out of the loop, as we know that the common lowest common ancestor they had was the last element.
        if(pPath[currentPosition] !== qPath[currentPosition]) break;

        currentPosition++;
    }

    // * Finally return a node with the value of Q's Path at currentPosition
    return new TreeNode(pPath[currentPosition - 1]);
}