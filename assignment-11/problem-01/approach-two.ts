/*
    ! Time Complexity:
        !- push: O(n)
        !- pop: O(1)
        !- top: O(1)
        !- empty: O(1)

    ! Space Complexity: O(n)

    ! Approach: 
    !- During pop opeation we can simply dequeue from q1.
    !- During push operation, we first dequeue all elements them from q1 and then enqueue them in q2.
    !- Then we enqueue the desired element in q1.
    !- Finally dequeue all elements from q2 and enqueue them in q1.
    ! Check problem-approach.md -> approach1 for more details.
*/

class Stack {
    q1: Array<number>;
    q2: Array<number>;

    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    push(x: number) {
        if(this.q1.length === 0){
            this.q1.push(x);
            return;
        }

        while(this.q1.length > 0){
            let num = this.q1.shift();
            if(num) this.q2.push(num);
        }

        this.q1.push(x);

        while(this.q2.length > 0){
            let num = this.q2.shift();
            if(num) this.q1.push(num);
        }
    }

    pop(): number {
        if(this.q1.length === 0) return -1;

        return this.q1.shift() ?? -1;
    }

    top(): number {
        if(this.q1.length === 0) return -1;

        return this.q1[0];
    }

    empty(): boolean {
        return this.q1.length === 0;
    }
}