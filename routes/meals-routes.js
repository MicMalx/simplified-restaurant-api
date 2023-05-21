const express = require('express');
const mealsControllers = require('../controllers/meals-controller');

const router = express.Router();

router.get('/', mealsControllers.getMeals);

module.exports = router;