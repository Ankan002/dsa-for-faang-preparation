const isValidParenthesis = (s: string): boolean => {
    const parenthesisStack: Array<string> = [];

    const matcherMap: Record<string, string | undefined> = {
        "}" : "{",
        ")" : "(",
        "]" : "["
    }

    for(let parenthesis of s){
        if(parenthesis === "(" || parenthesis === "{" || parenthesis === "["){
            parenthesisStack.push(parenthesis);
        }
        else if(parenthesisStack.length <= 0) return false;

        else if(parenthesisStack[parenthesisStack.length - 1] === matcherMap[parenthesis]){
            parenthesisStack.pop();
        }

        else return false;
    }

    return parenthesisStack.length === 0;
}

console.log(isValidParenthesis("()"));
console.log(isValidParenthesis("()[]{}"));
console.log(isValidParenthesis("(]"));