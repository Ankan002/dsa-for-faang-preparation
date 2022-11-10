/*
    ! Time Complexity:
        !- push: O(1)
        !- pop: O(n)
        !- top: O(1)
        !- empty: O(1)

    ! Space Complexity: O(n)

    ! Approach: 
    ! - During push operation we simply enqueue but during pop operation we first dequeue the q1 till n-1 elements and enqueue them in q2. 
    ! - Then we dequeue the last q1 element. 
    ! - Then we dequeue all q2 elements and enqueue them to q1 & finally return the last q1 dequed element. 
    !Check problem-approach.md -> approach1 for more details.
*/

class Stack {
    q1: Array<number>;
    q2: Array<number>;

    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    push(x: number): void {
        this.q1.push(x);
    }

    pop(): number {
        if(this.q1.length === 0) return -1;
        if(this.q1.length === 1) return this.q1.shift() ?? 0;

        while(this.q1.length > 1){
            let num = this.q1.shift();
            if(num) this.q2.push(num);
        }

        let poppedOutNumber = this.q1.shift();

        while(this.q2.length > 0){
            let num = this.q2.shift();
            if(num) this.q1.push(num);
        }

        return poppedOutNumber ?? 0;
    }

    top(): number {
        if(this.q1.length === 0) return -1;

        return this.q1[this.q1.length - 1];
    }

    empty(): boolean {
        return this.q1.length === 0
    }
}