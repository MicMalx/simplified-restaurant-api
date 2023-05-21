# Simplified version of restaurant API

The simplified version of API for testing without the need of connecting to MongoDB. Keep in mind the data You add will be lost after restarting the local server because the data is stored in variables instead of real database.
# Demonstration Project

This is my demonstration project to show my backend skills.

The simplified project uses express, express-validator dependencies.
Project functionalities:
- sing up and login
- make an order
- browse orders by user

# Available endpoints.
### GET http://localhost:5000/api/meals
### POST http://localhost:5000/api/users/signup

```
{
    "email": "test@test.com",
    "password": "test"
}
```
### POST http://localhost:5000/api/users/login
```
{
    "email": "test@test.com",
    "password": "test"
}
```
### POST http://localhost:5000/api/orders/create

To connect with this endpoint You need to add header "Authorization" with "Bearer ${TOKEN}" value. Replace ${TOKEN} with the value returned from singup/login endpoint.
```
{
    "name": "test",
    "address": "test 1/1",
    "phoneNumber": "555 555 555",
    "paymentMethod": "cash",
    "price": 1,
    "meals": [
        {
            "name": "mealName",
            "amount": 1
        },
        {
            "name": "mealName",
            "amount": 1
        }
    ]
}
```
paymentMethod parameter must be "cash" or "card" or API will return error.

### GET http://localhost:5000/api/orders/user

To connect with this endpoint You need to add header "Authorization" with "Bearer ${TOKEN}" value. Replace ${TOKEN} with the value returned from singup/login endpoint.


# How to run project locally.

To run this project locally on Your machine:

1. Download the code from this repository.
2. Open terminal and go to the repository path.
3. Run npm install
4. Run npm start
5. Now You can test endpoints with for example Postman.