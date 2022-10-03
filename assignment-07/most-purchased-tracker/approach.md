# Approach

```markdown
Time Complexity: O(n)
Space Complexity: O(n)
```

- According to the question, first we need to calculate the amount to items sold. So, we calculate by creating a hashmap and storing the data in the map. This takes `O(n)` time to complete the job and takes `O(n)` extra space.

- Now we simply need to go over the hashmap and maintain two variables maxProduct and maxProductSoldCount.

- If current product's sold count is greater than the maxProductSoldCount, then we update maxProductSoldCount with current product's sold count and the maxProduct with current product.

- Now if current product's sold count is equal to the maxProductSoldCount, then we actually check that if current product has a lexically higher value than maxProduct. If it is so, then we update maxProductSoldCount with current product's sold count and the maxProduct with current product.

- Optionally I thought of actually storing the same product count products in format of a max heap, but then I realised I was using an extra space which might be even O(n/2)... 😅😅😅.

- Finally, we return the maxProduct.
