const express = require('express');
const { check } = require('express-validator');
const ordersControllers = require('../controllers/orders-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.post(
    '/create',
    [
        check('name').not().isEmpty(),
        check('address').not().isEmpty(),
        check('phoneNumber').not().isEmpty(),
        check('paymentMethod').isIn(['cash', 'card']),
        check('price').isFloat({ gt: 0 }),
        check('meals.*.name').not().isEmpty(),
        check('meals.*.amount').isNumeric({ no_symbols: true }).isFloat({ gt: 0 }),
    ],
    ordersControllers.createOrder
);

router.get('/user', ordersControllers.getOrdersByUserId);

module.exports = router;