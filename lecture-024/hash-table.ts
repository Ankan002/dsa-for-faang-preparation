// This is the implementation of

class HashTable {
    MAX_TABLE_SIZE: number;
    numArray: Array<number>;

    constructor() {
        this.numArray = [];
        this.MAX_TABLE_SIZE = 10;
    }

    hashFunction(key: string){
        let asciiVal = 0;

        for(let i=0; i<key.length; i++){
            asciiVal += key.charCodeAt(i);
        }

        return asciiVal % this.MAX_TABLE_SIZE;
    }

    addNum(key: string, value: number){
        let index = this.hashFunction(key);

        this.numArray[index] = value;
    }

    getNum(key: string): number | undefined {
        let index = this.hashFunction(key);

        return this.numArray[index];
    }
}