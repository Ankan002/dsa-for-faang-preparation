/*
    ? Problem: Q2(I) of assignment 12.

    ! Time Complexity:
        !- hashFunction: O(n)
        !- addNum: O(1) [If we consider the time complexity of hasFunction then it becomes O(n)]
        !- getNum: O(1) [If we consider the time complexity of hasFunction then it becomes O(n)]
    ! Space Complexity: O(n)

    ! Approach: Linear Probing Method.(Duplicate values can be present but we can remove them by providing another check)
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

    // * This function returns the linearly probed index by the formula (hashFunc(v) + no. of collisions) % max_size
    linearProbe(indexGeneratedByHashFunction: number, numOfFailure: number): number {
        return ((indexGeneratedByHashFunction + numOfFailure) % this.MAX_SIZE);
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

        // * If there is a collision we try MAX_SIZE time to find a probed index. If we get one where there is no collision, we can simply add the value and move on.
        for(let i=1; i<=this.MAX_SIZE; i++){
            // * We directly use the hashIndex because we know every time the answer would be same for hashFunction(key). 
            let probedIndex = this.linearProbe(hashIndex, i);

            if(!this.numArray[probedIndex]){
                this.numArray[probedIndex] = [key, val];
                this.NUMBER_OF_SPACES_OCCUPIED++;
                return;
            }
        }

        // * If still we do not get a spot then it might be the case that will never get one & would always move in the same cycle, so we throw an exception.
        throw new Error("Bro your key is huge and you will never get to an answer so, stop wasting both of our time...");
    }

    // * Get num simply gets the number in the same way add num adds the value to the table.
    getNum(key: string): number | undefined {
        const hashIndex = this.hashFunction(key);

        if(!this.numArray[hashIndex]) return undefined;
        if(this.numArray[hashIndex][0] === key) return this.numArray[hashIndex][1];

        for(let i=1; i<=this.MAX_SIZE; i++){
            let probedIndex = this.linearProbe(hashIndex, i);

            if(this.numArray[probedIndex] && this.numArray[probedIndex][0] === key) return this.numArray[probedIndex][1];
        }

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

        for(let i=1;i<this.MAX_SIZE; i++){
            let probedIndex = this.linearProbe(hashIndex, i);

            if(this.numArray[probedIndex] && this.numArray[probedIndex][0] === key){
                delete this.numArray[probedIndex];
                this.NUMBER_OF_SPACES_OCCUPIED--;
                return;
            }
        }
    }
}

// ? Driver code
const hashTable = new HashTable();

hashTable.addNum("May 2020", 1);
hashTable.addNum("May 2037", 2);
hashTable.addNum("May 2033", 3);
hashTable.addNum("May 2023", 4);
hashTable.addNum("May 2024", 5);
hashTable.addNum("May 2025", 6);
hashTable.addNum("May 2026", 7);
hashTable.addNum("May 2027", 8);
hashTable.addNum("May 2039", 9);
hashTable.addNum("May 2029", 10);

console.log(hashTable.getNum("May 2023"));
console.log(hashTable.getNum("May 2027"));
console.log(hashTable.getNum("May 2037"));

hashTable.deleteNum("May 2027");

console.log(hashTable.getNum("May 2027"));