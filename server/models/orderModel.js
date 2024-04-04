//Dependencies
const mongoose = require('mongoose');

//Schema
const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

//Create a model
const Order = mongoose.model('Order', orderSchema);

//Export
module.exports = Order;
