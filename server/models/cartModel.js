//Dependencies
const mongoose = require('mongoose');

//Schema
const cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    quantities: [Number],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//Create a Model
const Cart = mongoose.model('Cart', cartSchema);

//Export
module.exports = Cart;
