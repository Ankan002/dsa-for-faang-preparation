/*
    !Time Complexity: O(1)
    !Space Complexity: O(1)
*/

const isCollinear = (points: Array<[number, number]>): boolean => {
    // *Returns false if there 
    if(points.length !== 3) return false;

    /* 
        *Using the slope formula for find if three points are collinear,

        ! (y2 - y1) / (x2 - x1) === (y3 - y2) / (x3 - x2)
    */
    return ((points[1][1] - points[0][1]) / (points[1][0] - points[0][0])) === ((points[2][1] - points[1][1]) / (points[2][0] - points[1][0]));
}

console.log(isCollinear([[1, 1], [1, 6], [0, 9]]));
console.log(isCollinear([[1, 1], [1, 4], [1, 5]]));