const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Order = require('../models/order');
const User = require('../models/user');

const createOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const { name, address, phoneNumber, paymentMethod, price, meals } = req.body;

    const createdOrder = new Order({
        name,
        address,
        phoneNumber,
        paymentMethod,
        price,
        meals,
        purchaserId: req.userData.userId
    });

    let user;

    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            'We could not find user for provided id.',
            404
        );
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdOrder.save({ session: sess });
        user.orders.push(createdOrder);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            'Creating order failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ order: createdOrder });
};

const getOrdersByUserId = async (req, res, next) => {
    const userId = req.userData.userId;

    let userWithOrders;
    try {
        userWithOrders = await User.findById(userId).populate('orders');
    } catch (err) {
        const error = new HttpError(
            'Fetching places failed, please try again later.',
            500
        );
        return next(error);
    }

    if (!userWithOrders || userWithOrders.length === 0) {
        return next(new HttpError(
            'Could not find orders for the provided user id!',
            404
        ));
    }

    res.json({ orders: userWithOrders.orders.map(order => order.toObject({ getters: true }) )});
}

exports.createOrder = createOrder;
exports.getOrdersByUserId = getOrdersByUserId;