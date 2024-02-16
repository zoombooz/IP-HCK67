[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13592332&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

## 1. POST /register

Request:

- body:

```json
{
    "fullName" : "string",
    "email" : "string",
    "password" : "string",
    "phoneNumber" : "string",
    "address" : "string"
}
```

_Response (201 - created)_

```json
{
    "fullName" : "string",
    "email" : "string",
    "password" : "string",
    "phoneNumber" : "string",
    "address" : "string"
}
```

_Response (400 - bad request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email format is incorrect"
}
OR
{
  "message": "Email has been used"
}
OR
{
  "message": "Full name is required"
}
OR
{
  "message": "Password is required"
}
...
```

## 2. POST /login

Request:

- body:

```json
{
    "email" : "string",
    "password" : "string"
}
```

_Response (200 - ok)_

```json
{
    "accessToken" : "string"
}
```

_Response (400 - bad request)_

```json
{
  "message": "Email/password is required"
}
OR
{
  "message": "Your input is incorrect"
}
```

## 3. POST /products

Request:

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

- body:

```json
{
    "title": "string",
    "description": "string",
    "price": "integer",
    "discountPercentage": "decimal",
    "rating": "decimal",
    "stock": "integer",
    "brand": "string",
    "category": "string",
    "thumbnail": "string",
}
```

_Response (200 - ok)_

```json
{
    "id": "integer",
    "title": "string",
    "description": "string",
    "price": "integer",
    "discountPercentage": "decimal",
    "rating": "decimal",
    "stock": "integer",
    "brand": "string",
    "category": "string",
    "thumbnail": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Images": [...]
}
```

_Response (400 - bad request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Description is required"
}
OR
...
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```

## 4. GET /products 

Request:

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

_Response (200 - ok)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "price": "integer",
    "discountPercentage": "decimal",
    "rating": "decimal",
    "stock": "integer",
    "brand": "string",
    "category": "string",
    "thumbnail": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Images": [...]
  },
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "price": "integer",
    "discountPercentage": "decimal",
    "rating": "decimal",
    "stock": "integer",
    "brand": "string",
    "category": "string",
    "thumbnail": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Images": [...]
  },
  ...
]
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```

## 5. GET /products/:id 

Request:

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

- params :

```json
{
  "id" : "integer"
}
```

_Response (200 - ok)_

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "price": "integer",
  "discountPercentage": "decimal",
  "rating": "decimal",
  "stock": "integer",
  "brand": "string",
  "category": "string",
  "thumbnail": "string",
  "createdAt": "date",
  "updatedAt": "date",
  "Images": [...]
}
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 6. PUT /products/:id

Request : 

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

- params :

```json
{
  "id" : "integer"
}
```

- body:

```json
{
    "title": "string",
    "description": "string",
    "price": "integer",
    "discountPercentage": "decimal",
    "rating": "decimal",
    "stock": "integer",
    "brand": "string",
    "category": "string",
    "thumbnail": "string",
}
```

_Response (200 - ok)_

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "price": "integer",
  "discountPercentage": "decimal",
  "rating": "decimal",
  "stock": "integer",
  "brand": "string",
  "category": "string",
  "thumbnail": "string",
  "createdAt": "date",
  "updatedAt": "date",
  "Images": [...]
}
```

_Response (400 - bad request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Description is required"
}
OR
...
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "You are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 7. DELETE /products/:id

Request : 

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

- params :

```json
{
  "id" : "integer"
}
```

_Response (200 - ok)_

```json
{
  "message" : "<product_title> is deleted"
}
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "You are not authorized"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 9. GET /cart 

Request:

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

_Response (200 - ok)_

```json
[
  {
    "id": "integer",
    "userId": "integer",
    "productId": "integer",
    "amount": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Product": {"Product Object"}
  },
  {
    "id": "integer",
    "userId": "integer",
    "productId": "integer",
    "amount": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Product": {"Product Object"}
  },
  ...
]
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```
## 10. GET /cart/:productId

Request:

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

- params :

```json
{
  "productId" : "integer"
}
```

_Response (200 - ok)_

```json
{
  "id": "integer",
  "userId": "integer",
  "productId": "integer",
  "amount": "integer",
  "createdAt": "date",
  "updatedAt": "date",
  "Product": {"Product Object"}
}
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 11. POST /cart/:productId

Request : 

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

- params :

```json
{
  "productId" : "integer"
}
```

- body:

```json
{
    "amount" : "integer"
}
```

_Response (200 - ok)_

```json
{
  "message" : "Product has been added to cart"
}
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 12. PATCH /cart/:productId

Request : 

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

- params : 

```json
{
  "productId" : "integer"
}
```

- body : 

```json
{
  "amount" : "integer"
}
```

_Response (200 - ok)_

```json
{
  "message" : "Product's amount in the cart has been updated"
}
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 13. DELETE /cart/:productId

Request : 

- headers :

```json
{
  "Authorization" : "Bearer <access_token>"
}
```

- params : 

```json
{
  "productId" : "integer"
}
```

_Response (200 - ok)_

```json
{
  "message": "Product is deleted from cart"
}
```

_Response (401 - unauthorized)_

```json
{
  "message": "Authentication error"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## 14. GET /products/pub 

_Response (200 - ok)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "price": "integer",
    "discountPercentage": "decimal",
    "rating": "decimal",
    "stock": "integer",
    "brand": "string",
    "category": "string",
    "thumbnail": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Images": [...]
  },
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "price": "integer",
    "discountPercentage": "decimal",
    "rating": "decimal",
    "stock": "integer",
    "brand": "string",
    "category": "string",
    "thumbnail": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Images": [...]
  },
  ...
]
```

## 15. GET /products/:id/pub 

Request:

- params :

```json
{
  "id" : "integer"
}
```

_Response (200 - ok)_

```json
{
    "id": "integer",
    "title": "string",
    "description": "string",
    "price": "integer",
    "discountPercentage": "decimal",
    "rating": "decimal",
    "stock": "integer",
    "brand": "string",
    "category": "string",
    "thumbnail": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "Images": [...]
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Data Not Found"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
OR
{
    "message": "Authentication error"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```



