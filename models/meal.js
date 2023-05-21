const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
    description: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
});

mealSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Meal', mealSchema);