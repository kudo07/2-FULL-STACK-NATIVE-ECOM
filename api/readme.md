# ROUTES

## Table of Contents

- [PRODUCTS](#products)
  - [Get All Products](#get-all-products)
  - [Get Product by ID](#get-product-by-id)
  - [Create a Product](#create-a-product)
  - [Delete a Product](#delete-a-product)
  - [Update a Product](#update-a-product)
- [AUTH](#auth)
  - [Login](#login)
  - [Register](#register)
- [ORDERS](#orders)
  - [Create an Order](#create-an-order)
  - [List Orders](#list-orders)
  - [Get Order by ID](#get-order-by-id)
  - [Update Order](#update-order)

## PRODUCTS

### Files

- `productSchema.ts`
- `productController.ts`

### Endpoints

1. **Get All Products**

   - **Method**: `GET`
   - **URL**: `http://localhost:3000/products/`
   - **Example**:
     ```bash
     curl -X GET http://localhost:3000/products/
     ```

2. **Get Product by ID**

   - **Method**: `GET`
   - **URL**: `http://localhost:3000/products/:id`
   - **Example**:
     ```bash
     curl -X GET http://localhost:3000/products/5
     ```

3. **Create a Product**

   - **Method**: `POST`
   - **URL**: `http://localhost:3000/products/`
   - **Request Body**:
     ```json
     {
       "name": "iphone",
       "price": "312312"
     }
     ```
   - **Example**:
     ```bash
     curl -X POST http://localhost:3000/products/ \
     -H "Content-Type: application/json" \
     -d '{
       "name": "iphone",
       "price": "312312"
     }'
     ```

4. **Delete a Product**

   - **Method**: `DELETE`
   - **URL**: `http://localhost:3000/products/:id`
   - **Example**:
     ```bash
     curl -X DELETE http://localhost:3000/products/3
     ```

5. **Update a Product**
   - **Method**: `PUT`
   - **URL**: `http://localhost:3000/products/:id`
   - **Request Body**:
     ```json
     {
       "name": "UPDATED",
       "price": "404"
     }
     ```
   - **Example**:
     ```bash
     curl -X PUT http://localhost:3000/products/3432 \
     -H "Content-Type: application/json" \
     -d '{
       "name": "UPDATED",
       "price": "404"
     }'
     ```

[Back to Top](#table-of-contents)

## AUTH

1. **Login**

   - **Method**: `POST`
   - **URL**: `http://localhost:3000/auth/login`
   - **Request Body**:
     ```json
     {
       "email": "rewgewrfgreWFWFFWERGFwgfr",
       "password": "frewfgw"
     }
     ```
   - **Example**:
     ```bash
     curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "rewgewrfgreWFWFFWERGFwgfr",
       "password": "frewfgw"
     }'
     ```

2. **Register**
   - **Method**: `POST`
   - **URL**: `http://localhost:3000/auth/register`
   - **Request Body**:
     ```json
     {
       "email": "rewgewrfgreWFWFFWERGFwgfr",
       "password": "frewfgw"
     }
     ```
   - **Example**:
     ```bash
     curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "rewgewrfgreWFWFFWERGFwgfr",
       "password": "frewfgw"
     }'
     ```

[Back to Top](#table-of-contents)

## ORDERS

1. **Create an Order**

   - **Method**: `POST`
   - **URL**: `http://localhost:3000/orders`
   - **Request Body**:
     ```json
     {
       "order": {},
       "items": [
         {
           "productId": 2,
           "quantity": 1,
           "price": 100
         },
         {
           "productId": 3,
           "quantity": 2,
           "price": 120
         }
       ]
     }
     ```
   - **Example**:
     ```bash
     curl -X POST http://localhost:3000/orders \
     -H "Content-Type: application/json" \
     -d '{
       "order": {},
       "items": [
         {
           "productId": 2,
           "quantity": 1,
           "price": 100
         },
         {
           "productId": 3,
           "quantity": 2,
           "price": 120
         }
       ]
     }'
     ```

2. **List Orders**

   - **Method**: `GET`
   - **URL**: `http://localhost:3000/orders`
   - **Example**:
     ```bash
     curl -X GET http://localhost:3000/orders
     ```

3. **Get Order by ID**

   - **Method**: `GET`
   - **URL**: `http://localhost:3000/orders/:id`
   - **Example**:
     ```bash
     curl -X GET http://localhost:3000/orders/5
     ```

   **Logged Order Details Example**:

   ````json
   [
     {
       "orders": {
         "id": 5,
         "createdAt": "2024-10-29T05:58:55.192Z",
         "status": "New",
         "userId": 1,
         "stripePaymentIntentId": null
       },
       "order_items": {
         "id": 9,
         "orderId": 5,
         "productId": 2,
         "quantity": 1,
         "price": 100
       }
     },
     {
       "orders": {
         "id": 5,
         "createdAt": "2024-10-29T05:58:55.192Z",
         "status": "New",
         "userId": 1,
         "stripePaymentIntentId": null
       },
       "order_items": {
         "id": 10,
         "orderId": 5,
         "productId": 3,
         "quantity": 2,
         "price": 120
       }
     }
   ]
   ```### Merged Order Example
   ````

```json
{
  "id": 5,
  "createdAt": "2024-10-29T05:58:55.192Z",
  "status": "New",
  "userId": 1,
  "stripePaymentIntentId": null,
  "items": [
    {
      "id": 9,
      "orderId": 5,
      "productId": 2,
      "quantity": 1,
      "price": 100
    },
    {
      "id": 10,
      "orderId": 5,
      "productId": 3,
      "quantity": 2,
      "price": 120
    }
  ]
}
```

Update Order
Method: PUT
URL: http://localhost:3000/orders/:id
Request Body:
json
Copy code
{
"status": "delivered"
}
