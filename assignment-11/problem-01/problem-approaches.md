## Problem Statement

Implement a LIFO stack using only two queues. The implemented stack should support all thefunctions of a usual stack (push, pop, top, empty)

### Approach 1 (Expensive POP)

- Take two queues q1 and q2.
- During push operation simply enqueue in q1.
- During pop operation dequeue n-1 elements from q1 and enqueue them in q2.
- Now dequeue the nth element from q2 and you have the element that you wanted.
- But hold on that's not it. Now dequeue all the elements from q2 and enqueue them to q1.
- Time Complexity for `PUSH` operation is O(1) & for `POP` operation is O(n). 

#### Example

```markdown
Elements: 1, 2, 3

Q1: []
Q2: []

1. push(1):
    Q1: [1]
    Q2: []

2. push(2):
    Q1: [1,2]
    Q2: []

3. push(3):
    Q1: [1,2,3]
    Q2: []

4. pop():
    - Dequeuing Q1 til n-1 length and enqueuing them in Q2
        Q1: [3]
        Q2: [1,2]

    - Dequeuing the nth element and storing them in temp variable
        Q1: []
        Required Number = 3
        Q2: [1,2]

    - Then again dequeuing all the element from Q2 and then enqueuing them in Q1
        Q1: [1,2]
        Required Number = 3
        Q2: []

    - Finally return Required Number.

```

### Approach 2 (Expensive PUSH)

- Take two queues q1 and q2.
- During push operation we will try to place the pushed element in the front, so that we can dequeue it when pop operation is required.
- To achieve this first we will dequeue all element from q1 and enqueue them to q2.
- Then enqueue the ruired element to q1.
- Finally dequeue all elements from q2 and enqueue them back in q1.
- During pop operation we can simply dequeue the first element from q1.
- Time Complexity for `PUSH` operation is O(n) & for `POP` operation is O(1).

#### Exmaple

```markdown
Elements: 1, 2

Q1: []
Q2: []

1. push(1):
    - As the Q1 is empty so we can simply enqueue the element in Q1.
        Q1: [1]
        Q2: []

2. push(2):
    - Now here the Q1 is not empty, so we can first dequeue all elements from Q1 and enqueue them to Q2.
        Q1: []
        Q2: [1]
    
    - Then we can simply enqueue the required number to Q1.
        Q1: [2]
        Q2: [1]

    - Then we can simply dequeue all elements from Q2 and enqueue them back to Q1.
        Q1: [2,1]
        Q2: []

3. pop():
    - Simply dequeue the Q1 once to get the front most element and store them in a temp variable.
        Q1: [1]
        Required Number: 2
        Q2: []

    - Finally return the Required Number.

```
