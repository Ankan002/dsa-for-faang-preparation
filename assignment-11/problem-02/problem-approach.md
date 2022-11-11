## Problem Statement

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue shouldsupport a normal queue's functions (push, peek, pop, and empty).

### Approach

- Take two stacks stack1 and stack2.

- During enqueue simply push in stack1.

- But during the pop first check if both the stacks are empty then its a queue underflow.

- Now if the stack2 is not empty then pop out from the stack2.

- If it is not so, then pop n-1 elements from stack1 and push them in stack2.

- Finally we can simply pop the nth element out of stack1 and we have got out answer.

#### Example

```markdown
Elements: 1, 2, 3

Stack1: []
Stack2: []

1. enqueue(1):

    Simply push into Stack1
    Stack1 = [1]
    Stack2 = []

2. enqueue(2):

    Stack1 = [1,2]
    Stack2 = []

3. enqueue(3):

    Stack1 = [1,2,3]
    Stack2 = []

4. dequeue():

    - First we check that is Stack2 empty. In this case it is so. So pop out n-1 elements from Stack1 and push them in Stack2.

        Stack1 = [1]
        Stack2 = [3,2]

    - Now we need to pop out and store the nth element from Stack1.

        Stack1 = []
        Stack2 = [3,2]
        Dequeued Number = 1

    - Finally return Dequeued Number.

5. dequeue():

    - In this case the Stack2 is not empty. So we can pop Stack2 once and store the popped number in temp variable.

        Stack1 = []
        Stack2 = [3]
        Dequeued Number = 2

    - Finally return Dequeued Number.
    
```
