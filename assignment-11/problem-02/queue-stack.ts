/*
    ! Time Complexity: 
        !- push: O(1)
        !- pop: O(n)
        !- peek: O(1)
        !- empty: O(1)

    ! Space Complexity: O(n)
*/

class Queue {
    stack1: Array<number>;
    stack2: Array<number>;

    // * Initializing stack1 and stack2 with an empty array.
    constructor(){
        this.stack1 = [];
        this.stack2 = [];
    }

    // * During push we can simply push a new number in stack1.
    push(x: number): void {
        this.stack1.push(x);
    }

    pop(): number {
        // * During pop if the both the stacks are empty we encounter a queue underflow exception.
        if(this.stack1.length === 0 && this.stack2.length === 0) return -1;

        // * We check if the stack2 is not empty then we simply pop out once from stack2 and return that value.
        if(this.stack2.length > 0) return this.stack2.pop() ?? -1;

        // * If it is not so then we pop n-1 elements from stack1 and push them to stack2.
        while(this.stack1.length > 1){
            let num = this.stack1.pop();
            if(num) this.stack2.push(num);
        }

        // * Finally we pop the nth element from the stack1 and return it.
        return this.stack1.pop() ?? -1;
    }

    peek(): number {
        // * For peeking in the queue, we check if both the stacks are empty then we simply pop out once from stack2 and return that value. 
        if(this.stack1.length === 0 && this.stack2.length === 0) return -1;

        // * If there are some elements in stack2, then we simply return the last element of stack2.
        if(this.stack2.length > 0) return this.stack2[this.stack2.length - 1];

        // * Finally if no conditions are satisfying, then we return the first element or 0th index of stack1.
        return this.stack1[0];
    }

    empty(): boolean {
        // * Here we simply return if both of the stacks are empty.
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}