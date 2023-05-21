# Demonstration Project

This is my demonstration project to show my backend skills.
The projct uses express, express-validator, mongoose dependencies and works with MongoDB Atlas to store data.
Project functionalities:
- sing up and login
- make an order
- browse orders by user

# See how the API works.

You can test the API with for example Postman.
The API is available at: https://restaurant-api-seqm.onrender.com/

\* The first response of the API may take longer because the API run on the free hosting which spun down the web service after 15 minutes of inactivity.

# Available endpoints.
### GET https://restaurant-api-seqm.onrender.com/api/meals
### POST https://restaurant-api-seqm.onrender.com/api/users/signup

```
{
    "email": "test@test.com",
    "password": "test"
}
```
### POST https://restaurant-api-seqm.onrender.com/api/users/login
```
{
    "email": "test@test.com",
    "password": "test"
}
```
### POST https://restaurant-api-seqm.onrender.com/api/orders/create

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

### GET https://restaurant-api-seqm.onrender.com/api/orders/user

To connect with this endpoint You need to add header "Authorization" with "Bearer ${TOKEN}" value. Replace ${TOKEN} with the value returned from singup/login endpoint.


# How to run project locally.

To run this project locally on Your machine:

1. Download the code from this repository.
2. Replace environment variables DB_USER, DB_PASSWORD, DB_NAME in app.js file with your MongoDB data and JWT_KEY in check-auth.js and users-controllers.js file or create a nodemon.json file in the root directory of the project with those variables.
3. Add users, orders, and meals empty collections.
4. Insert some data to meals collection.
5. Open terminal and go to the repository path.
6. Run npm install
7. Run npm start
8. Now You can test endpoints with for example Postman.
9. For local testing replace https://restaurant-spa.onrender.com/ with http://localhost:5000/ .