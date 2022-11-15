/*
    ? Problem: Q2(III) of assignment 12.

    ! Time Complexity:
        !- hashFunction: O(n)
        !- addNum: O(1) [If we consider the time complexity of hasFunction then it becomes O(n)]
        !- getNum: O(1) [If we consider the time complexity of hasFunction then it becomes O(n)]
    ! Space Complexity: O(n)

    ! Approach: Double Hashing Method.(Duplicate values can be present but we can remove them by providing another check)
*/

class HashTable {
    MAX_SIZE: number;
    numArray: Array<[string, number]>;
    NUMBER_OF_SPACES_OCCUPIED: number;

    // * This is the constructor. It initializes an array with the MAX_SIZE.
    constructor(){
        this.MAX_SIZE = 10;
        this.numArray = new Array(this.MAX_SIZE);
        this.NUMBER_OF_SPACES_OCCUPIED = 0;
    }

    // * This function generates the hash index where the data would be stored.
    hashFunction(key: string): number {
        // * We initiate a characterOrdValue variable with 0.
        let characterOrdValue = 0;

        // * Here we go over each and every number in the key and generate sum of their ASCII value.
        for(let i=0; i<key.length; i++){
            characterOrdValue += key.charCodeAt(i);
        }

        // * Finally we return the last digit of the whole ASCII value as the hashed index.
        return characterOrdValue % this.MAX_SIZE;
    }

    // * This function generates the secondary hash index.
    hashFunctionSecondary(key: string): number {
        // * First we simply calculate ASCII value
        let characterOrdValue = 0;

        for(let i=0; i<key.length; i++){
            characterOrdValue += key.charCodeAt(i);
        }

        // * Then we use a formula 1 + (value % (max_size - 2))
        return 1 + (characterOrdValue % (this.MAX_SIZE - 2));
    }

    // * This function returns the double hashed index by the formula (hashFunc(v) + (number of collisions * secondaryHashFunc(v))) % max_size
    doubleHash(
        indexGeneratedByPrimaryHashFunction: number,indexGeneratedBySecondaryHashFunction: number, 
        numOfFailure: number): number {
        
        return (indexGeneratedByPrimaryHashFunction + (numOfFailure * indexGeneratedBySecondaryHashFunction)) % this.MAX_SIZE;
    }

    // * This function is responsible for adding the number in the array.
    addNum(key: string,val: number): void {
        // * If we are trying to add more than MAX_SIZE values we throw an exception.
        if(this.NUMBER_OF_SPACES_OCCUPIED >= 10) throw new Error("Out of memory bound!!");

        // * Here we get the initially hashed index.
        const hashIndex = this.hashFunction(key);

        // * If there is no collision we can simply add the value and move on.
        if(!this.numArray[hashIndex]) {
            this.numArray[hashIndex] = [key, val];
            this.NUMBER_OF_SPACES_OCCUPIED++;
            return;
        }

        // * Here we obtain the secondary hash index.
        const secondaryHashIndex = this.hashFunctionSecondary(key);

         // * If there is a collision we try MAX_SIZE time to find a double hashed index. If we get one where there is no collision, we can simply add the value and move on.
        for(let i=1; i<=this.MAX_SIZE; i++){
             // * We directly use the hashIndex & secondaryHashIndex because we know every time the answer would be same for hashFunction(key) & secondaryHashFunction(key). 
            let doubleHashedIndex = this.doubleHash(hashIndex, secondaryHashIndex, i);

            if(!this.numArray[doubleHashedIndex]) {
                this.numArray[doubleHashedIndex] = [key, val];
                this.NUMBER_OF_SPACES_OCCUPIED++;
                return;
            }
        }

        // * If still we do not get a spot then it might be the case that will never get one & would always move in the same cycle, so we throw an exception.
        throw new Error("Bro your key is huge and you will never get to an answer so, stop wasting both of our time...");
    }

    // * Get num simply gets the number in the same way add num adds the value to the table.
    getNum(key: string): number | undefined {
        // * Here we get the initially hashed index.
        const hashIndex = this.hashFunction(key);

        // * If the index is empty then we can say the index is not not present.
        if(!this.numArray[hashIndex]) return undefined;
        // * If the index is not empty then we can check if the key is the same as passed. If it is so, we return the value.
        if(this.numArray[hashIndex][0] === key) return this.numArray[hashIndex][1];

        // * Here we get the secondary hashed index.
        const secondaryHashIndex = this.hashFunctionSecondary(key);

        // * If there is a collision we try MAX_SIZE time to find a double hashed index. If we get one where the key is same as passed, we can simply return the value and move on.
        for(let i=1; i<=this.MAX_SIZE; i++){
            let doubleHashedIndex = this.doubleHash(hashIndex, secondaryHashIndex, i);

            if(this.numArray[doubleHashedIndex] && this.numArray[doubleHashedIndex][0] === key) return this.numArray[doubleHashedIndex][1];
        }

        // * Else we say we did not find the value.
        return undefined;
    }

    // * Delete num simply deletes the key, value pair.
    deleteNum(key: string): void {
        const hashIndex = this.hashFunction(key);

        if(!this.numArray[hashIndex]) return;
        if(this.numArray[hashIndex][0] === key) {
            delete this.numArray[hashIndex];
            this.NUMBER_OF_SPACES_OCCUPIED--;
            return;
        }

        const secondaryHashIndex = this.hashFunctionSecondary(key);

        for(let i=1;i<this.MAX_SIZE; i++){
            let doubleHashedIndex = this.doubleHash(hashIndex, secondaryHashIndex, i);

            if(this.numArray[doubleHashedIndex] && this.numArray[doubleHashedIndex][0] === key){
                delete this.numArray[doubleHashedIndex];
                this.NUMBER_OF_SPACES_OCCUPIED--;
                return;
            }
        }
    }
}

// ? Driver Code
const hashTable = new HashTable();

hashTable.addNum("May 2020", 1);
hashTable.addNum("May 2037", 2);
hashTable.addNum("May 2033", 3);
hashTable.addNum("May 2023", 4);
hashTable.addNum("May 2024", 5);
hashTable.addNum("May 2025", 6);
hashTable.addNum("May 2026", 7);
hashTable.addNum("May 2027", 8);
hashTable.addNum("May 2029", 10);
// ! hashTable.addNum("May 2039", 9); -> This test case will never get completed and will throw an exception. You can try it out by uncommenting it.

console.log(hashTable.getNum("May 2025"));
console.log(hashTable.getNum("May 2023"));
console.log(hashTable.getNum("May 2033"));

hashTable.deleteNum("May 2033");

console.log(hashTable.getNum("May 2033"));