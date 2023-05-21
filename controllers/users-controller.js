const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-error");

const users = [];

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { email, password } = req.body;

    if (users.find(user => user.email === email)) {
        const error = new HttpError(
            'User with that email exists already, please login instead.',
            422
        );
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
        );
        return next(error);
    }

    const createdUser = {
        email,
        password: hashedPassword,
        orders: [],
    };

    users.push(createdUser);

    let token;
    try {
        token = jwt.sign(
            { email: createdUser.email },
            "test",
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Could not sign token. Signing Up failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({
        email: createdUser.email,
        token: token,
        expiresIn: 3600
    });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser = users.find(user => user.email === email);
    if (!existingUser) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please check your credentials and try again.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { email: existingUser.email },
            "test",
            { expiresIn: '1h' },
        );
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again.',
            500
        );
        return next(error);
    }

    res.json({
        email: existingUser.email,
        token: token,
        expiresIn: 3600,
    });
}

exports.signup = signup;
exports.login = login;
exports.users = users;