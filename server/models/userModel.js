// Dependency
const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    purchaseHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    shippingAddress: {
        type: String,
        required: true
    }
});

// Create a Model
const User = mongoose.model('User', userSchema);

// Export
module.exports = User;
