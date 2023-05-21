const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const { users } = require('./users-controller');

const createOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const { name, address, phoneNumber, paymentMethod, price, meals } = req.body;

    const createdOrder = {
        name,
        address,
        phoneNumber,
        paymentMethod,
        price,
        meals,
        userEmail: req.userData.userEmail,
    };

    const user = users.find((user => user.email === req.userData.userEmail));
    if (!user) {
        const error = new HttpError(
            'We could not find user for provided id.',
            404
        );
        return next(error);
    }    

    user.orders.push(createdOrder);

    res.status(201).json({ order: createdOrder });
};

const getOrdersByUserId = async (req, res, next) => {
    const { userEmail } = req.userData;

    const user = users.find(user => user.email === userEmail);

    if (!user || user.orders.length === 0) {
        return next(new HttpError(
            'Could not find orders for the provided user!',
            404
        ));
    }

    res.json({ orders: user.orders });
}

exports.createOrder = createOrder;
exports.getOrdersByUserId = getOrdersByUserId;