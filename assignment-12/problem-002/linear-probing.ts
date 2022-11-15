class HashTable {
    MAX_SIZE: number;
    numArray: Array<[number, number]>;

    constructor(){
        this.MAX_SIZE = 10;
        this.numArray = new Array(this.MAX_SIZE);
    }
}