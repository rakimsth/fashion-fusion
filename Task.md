// Product Detail

1. Out of stock

if product quantity < 1, the disabled true

2. Not of stock

a. Add to cart

- created a new reducer called updateCart, pass quantity and product in that function.

- Set the quantity using the state and pass that value to the update cart function using dispatch

  b. 4 random Pics

  - create a new empty array state; random4pics; set the state using useEffect hook

  - if products is empty, use fetchProduct from product slice to fill the data

c. Product detail fetch

      - create service called getById
      - create slice called getProduct
      - bind the extrareducers to getProduct
      - in productDetail page, create a function called getProduct with callback function called getProduct of slice.
      - useselector to get the product from the state, and display with the html

d. Category Name instead of ID

- use aggregate function with match, lookup, unwind, addFields
- return the first item of the array as result[0]
- use product?.category_name in the product detail page
