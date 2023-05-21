const HttpError = require('../models/http-error');

const Meal = require('../models/meal');

const getMeals = async (req, res, next) => {
    let meals;
    try {
        meals = await Meal.find({});
    } catch (err) {
        const error = new HttpError(
            'Fetching meals failed, please try again later.',
            500,
        );
        return next(error);
    }
    res.json({meals: meals.map(meal => meal.toObject({ getters: true }))});
};

exports.getMeals = getMeals;