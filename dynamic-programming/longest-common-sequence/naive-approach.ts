const lcsHelper = (string1: string, string2: string, position1: number, position2: number): number => {
    if(position1 > string1.length - 1 || position2 > string2.length - 1) return 0;

    else if(string1.charAt(position1) === string2.charAt(position2)){
        return 1 + lcsHelper(string1, string2, position1 + 1, position2 + 1);
    }

    else {
        return Math.max(lcsHelper(string1, string2, position1 + 1, position2), lcsHelper(string1, string2, position1, position2 + 1));
    }
}

const getLcs = (string1: string, string2: string): number => {
    return lcsHelper(string1, string2, 0, 0);
}

console.log(getLcs("abcdefghi", "cdgi"));