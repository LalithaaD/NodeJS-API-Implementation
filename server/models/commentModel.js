//Dependencies
const mongoose = require('mongoose');

//Schema
const commentSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: String,
    text: String
});

//Create a Model
const Comment = mongoose.model('Comment', commentSchema);

//Export
module.exports = Comment;
