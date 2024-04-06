const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');

// Route to get all comments
router.get('/', async (req, res, next) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
});

// Route to get a single comment by ID
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment);
});

// Route to create a new comment
router.post('/', async (req, res, next) => {
    const comment = new Comment({
        product: req.body.product,
        user: req.body.user,
        rating: req.body.rating,
        image: req.body.image,
        text: req.body.text
    });
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
});

// Route to update a comment by ID
router.put('/:id', getComment, async (req, res, next) => {
    try {
        if (req.body.product != null) {
            res.comment.product = req.body.product;
        }
        if (req.body.user != null) {
            res.comment.user = req.body.user;
        }
        if (req.body.rating != null) {
            res.comment.rating = req.body.rating;
        }
        if (req.body.image != null) {
            res.comment.image = req.body.image;
        }
        if (req.body.text != null) {
            res.comment.text = req.body.text;
        }
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
});

// Route to delete a comment by ID
router.delete('/:id', getComment, async (req, res, next) => {
    try {
        await res.comment.remove();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
});

// Middleware function to get comment by ID
async function getComment(req, res, next) {
    try {
        const comment = await Comment.findById(req.params.id);
        console.log('Type of comment:', typeof comment);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.comment = comment; // Assign the comment object to res.comment
        next();
    } catch (err) {
        next(err); // Pass the error to the error handler middleware
    }
}

// Error handler middleware
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;
