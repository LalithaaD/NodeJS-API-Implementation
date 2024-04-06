const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    quantities: [Number], // Array to track quantities of each product
    user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);
