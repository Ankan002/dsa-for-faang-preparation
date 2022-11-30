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

const buildHeap = (nodes: Array<HuffmanNode>): void => {
    let currentPos = Math.floor((nodes.length - 1) / 2);

    while(currentPos >= 0){
        minHeapify(nodes, currentPos, nodes.length - 1);
        currentPos--;
    }
}

const heapPush = (nodes: Array<HuffmanNode>, node: HuffmanNode): void => {
    nodes.push(node);

    const maxLength = nodes.length - 1;
    let currentParentIndex = maxLength % 2 === 0 ? (maxLength - 2) / 2 : (maxLength - 1) / 2;

    while(currentParentIndex >= 0){
        minHeapify(nodes, currentParentIndex, maxLength);
        currentParentIndex = (currentParentIndex % 2 === 0) ? (currentParentIndex - 2) / 2: (currentParentIndex - 1) / 2;
    }
}

const heapPop = (nodes: Array<HuffmanNode>): HuffmanNode | undefined => {
    if(nodes.length === 0) return undefined;
    if(nodes.length === 1) return nodes.pop();

    [nodes[0], nodes[nodes.length - 1]] = [nodes[nodes.length - 1], nodes[0]];

    const valueToBeReturned = nodes.pop();

    minHeapify(nodes, 0, nodes.length - 1);

    return valueToBeReturned;
}

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

const getEncodedValue = (root: HuffmanNode | null, val: string, currentCode: string): string | null => {
    if(!root) return null;

    if(root.character === val) return currentCode;

    const leftValue = getEncodedValue(root.left, val, currentCode+"0");
    if(leftValue !== null) return leftValue;

    const rightValue = getEncodedValue(root.right, val, currentCode+"1");
    if(rightValue !== null) return rightValue;

    return null;
}

const encodeHuffman = (characterFrequencies: Array<[string, number]>): Record<string, string | null> => {
    const minHuffmanNodeHeap: Array<HuffmanNode> = [];

    for(let characterFrequency of characterFrequencies){
        const huffmanNode = new HuffmanNode(characterFrequency[1], characterFrequency[0]);
        minHuffmanNodeHeap.push(huffmanNode);
    }

    buildHeap(minHuffmanNodeHeap)

    while(minHuffmanNodeHeap.length > 1){
        const minimumNode = heapPop(minHuffmanNodeHeap);
        const secondMinimumNode = heapPop(minHuffmanNodeHeap);

        if(!minimumNode || !secondMinimumNode) break;

        const currentHuffmanTreeSubroot = new HuffmanNode(minimumNode.data + secondMinimumNode.data);

        currentHuffmanTreeSubroot.left = minimumNode;
        currentHuffmanTreeSubroot.right = secondMinimumNode;

        heapPush(minHuffmanNodeHeap, currentHuffmanTreeSubroot);
    }

    const huffmanTreeRoot = heapPop(minHuffmanNodeHeap);

    if(!huffmanTreeRoot) return {};

    const encodedValues: Record<string, string | null> = {};

    for(let characterFrequency of characterFrequencies){
        const code = getEncodedValue(huffmanTreeRoot, characterFrequency[0], "");
        encodedValues[characterFrequency[0]] = code;
    }

    return encodedValues;
}

console.log(encodeHuffman([["a", 10], ["e", 6], ["i", 15], ["o", 7], ["u", 16], ["s", 12], ["t", 20]]));
