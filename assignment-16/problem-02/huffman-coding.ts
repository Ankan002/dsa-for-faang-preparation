/*
    ? Problem Statement: Q2 of assignment 16.

    ! Time Complexity: O(n log n)
    ! Space Complexity: O(n)

    * Steps:

    * First Convert Every every character to huffman treenode.
    * Then put them inside the min heap.
    * Now run a loop while only one big tree is left inside the min heap.
    * Inside the loop pop two min elements.
    * Then create a new node combining the frequencies of character 1 and character 2.
    * Now assign the min element to left of the node and second min to the right. 
    * Then put the whole formed tree inside the heap.
    * Finally once you come out of the loop pop out the final tree from the heap.
    * Then run the encode function for each element and return the values.
*/

class HuffmanNode {
    data: number;
    character: string;
    left: HuffmanNode | null;
    right: HuffmanNode | null;

    constructor(data?: number, character?: string){
        this.data = data ? data : 0;
        this.character = character ? character : "";
        this.left = null;
        this.right = null;
    }
}

// * This is an util for building the heap
const buildHeap = (nodes: Array<HuffmanNode>): void => {
    let currentPos = Math.floor((nodes.length - 1) / 2);

    while(currentPos >= 0){
        minHeapify(nodes, currentPos, nodes.length - 1);
        currentPos--;
    }
}

// * This is an util function for pushing into heap.
const heapPush = (nodes: Array<HuffmanNode>, node: HuffmanNode): void => {
    nodes.push(node);

    const maxLength = nodes.length - 1;
    let currentParentIndex = maxLength % 2 === 0 ? (maxLength - 2) / 2 : (maxLength - 1) / 2;

    while(currentParentIndex >= 0){
        minHeapify(nodes, currentParentIndex, maxLength);
        currentParentIndex = (currentParentIndex % 2 === 0) ? (currentParentIndex - 2) / 2: (currentParentIndex - 1) / 2;
    }
}

// * This is an util function for popping out of the heap.
const heapPop = (nodes: Array<HuffmanNode>): HuffmanNode | undefined => {
    if(nodes.length === 0) return undefined;
    if(nodes.length === 1) return nodes.pop();

    [nodes[0], nodes[nodes.length - 1]] = [nodes[nodes.length - 1], nodes[0]];

    const valueToBeReturned = nodes.pop();

    minHeapify(nodes, 0, nodes.length - 1);

    return valueToBeReturned;
}

// * This function is responsible for heapifying
const minHeapify = (nodes: Array<HuffmanNode>, parentIndex: number, maxLength: number): void => {
    if (parentIndex > maxLength || parentIndex < 0) return;

    const leftChildIndex = (parentIndex * 2) + 1;
    const rightChildIndex = (parentIndex * 2) + 2;
    let minIndex = parentIndex;

    if(leftChildIndex <= maxLength && nodes[leftChildIndex].data < nodes[minIndex].data) minIndex = leftChildIndex;
    if(rightChildIndex <= maxLength && nodes[rightChildIndex].data < nodes[minIndex].data) minIndex = rightChildIndex;

    if(minIndex !== parentIndex){
        [nodes[minIndex], nodes[parentIndex]] = [nodes[parentIndex], nodes[minIndex]];
        minHeapify(nodes, minIndex, maxLength);
    }
}

// * This function is responsible for encoding the values from the tree.
const getEncodedValue = (root: HuffmanNode | null, val: string, currentCode: string): string | null => {
    // * If the root is null then we return null.
    if(!root) return null;

    // * If the character we were looking for is this caharacter then we return the currentcode.
    if(root.character === val) return currentCode;

    // * If its not so the we go left by adding 0 to current code string. Then we check the returned value if its not null then we simply return the returned value.
    const leftValue = getEncodedValue(root.left, val, currentCode+"0");
    if(leftValue !== null) return leftValue;

    // * Now if that's not also true, then we go right by adding 1 to current code string. Then we check the returned value if its not null then we simply return the returned value.
    const rightValue = getEncodedValue(root.right, val, currentCode+"1");
    if(rightValue !== null) return rightValue;

    // * Finally if nothing works out then we simply return null
    return null;
}

// * This the main function.
const encodeHuffman = (characterFrequencies: Array<[string, number]>): Record<string, string | null> => {
    // * First create the min heap.
    const minHuffmanNodeHeap: Array<HuffmanNode> = [];

    // * Then for each character and frequency build a huffman node and push them into the array.
    for(let characterFrequency of characterFrequencies){
        const huffmanNode = new HuffmanNode(characterFrequency[1], characterFrequency[0]);
        minHuffmanNodeHeap.push(huffmanNode);
    }

    // * Then build the min heap.
    buildHeap(minHuffmanNodeHeap)

    // * Run a loop until only one element is remaining.
    while(minHuffmanNodeHeap.length > 1){
        // * Now pop 2 min elements
        const minimumNode = heapPop(minHuffmanNodeHeap);
        const secondMinimumNode = heapPop(minHuffmanNodeHeap);

        if(!minimumNode || !secondMinimumNode) break;

        // * Build a new huffman node combining values from two popped nodes.
        const currentHuffmanTreeSubroot = new HuffmanNode(minimumNode.data + secondMinimumNode.data);

        // * Set minimum node to new node's left and the other one to new node's right.
        currentHuffmanTreeSubroot.left = minimumNode;
        currentHuffmanTreeSubroot.right = secondMinimumNode;

        // * Finally push the new node into the heap.
        heapPush(minHuffmanNodeHeap, currentHuffmanTreeSubroot);
    }

    // * Finally do a heap pop from the min huffman node heap & that will be the huffman tree root.
    const huffmanTreeRoot = heapPop(minHuffmanNodeHeap);

    if(!huffmanTreeRoot) return {};

    const encodedValues: Record<string, string | null> = {};

    // * For each characer get encoded values
    for(let characterFrequency of characterFrequencies){
        const code = getEncodedValue(huffmanTreeRoot, characterFrequency[0], "");
        encodedValues[characterFrequency[0]] = code;
    }

    // * Finally return those values.
    return encodedValues;
}

// ? Driver Code
console.log(encodeHuffman([["a", 10], ["e", 6], ["i", 15], ["o", 7], ["u", 16], ["s", 12], ["t", 20]]));
