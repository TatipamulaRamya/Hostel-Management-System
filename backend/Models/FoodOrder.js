// Models/FoodOrder.js

const mongoose = require('mongoose');

const FoodOrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    foodItem: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    quantity: { type: Number, required: true },
});

module.exports = mongoose.model('FoodOrder', FoodOrderSchema);
