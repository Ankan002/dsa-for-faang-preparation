/*
    !Time Complexity: O(n)
    !Space Complexity: O(n)
*/
const countProductsSold = (productsSold: Array<string>): Record<string, number> => {
    let productsSoldCount: Record<string, number> = {};

    for(let productSold of productsSold) {
        if(!productsSoldCount[productSold]) productsSoldCount[productSold] = 1;
        else productsSoldCount[productSold] += 1;
    }

    return productsSoldCount;
}

/*
    !Time Complexity: O(n)
    !Space Complexity: O(n)
*/
const findMostPurchasedProduct = (productsSold: Array<string>): string => {
    // *Create a hashmap that store exact amount of products sold.
    const productsSoldCount = countProductsSold(productsSold);

    let maxSoldProduct: string = "";
    let maxSoldProductAmount: number = 0;

    // *We loop over the products in the ProductsSoldCount and find which one was sold the most. Also if both the products have same sold amount, then we put the word with higher lexical value in the maxSoldProduct.
    for(let product in productsSoldCount) {
        if(productsSoldCount[product] > maxSoldProductAmount || (productsSoldCount[product] === maxSoldProductAmount && product > maxSoldProduct)) {
            maxSoldProductAmount = productsSoldCount[product];
            maxSoldProduct = product;
        }
    }

    return maxSoldProduct;
}

console.log(findMostPurchasedProduct(["burger", "burger", "pizza", "pizza"]));

console.log(findMostPurchasedProduct(['yellowShirt', 'redHat', 'blackShirt', 'bluePants', 'redHat','pinkHat', 'blackShirt', 'yellowShirt','greenPants', 'greenPants', 'greenPants']));