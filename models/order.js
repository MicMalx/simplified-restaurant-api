const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    price: { type: Number, required: true },
    meals: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true }
        }
    ],
    purchaserId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Order', orderSchema);