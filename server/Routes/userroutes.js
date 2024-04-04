// Dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Middleware function to get user by ID
async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id).select('_id email username purchaseHistory shippingAddress');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userData = {
            _id: user._id,
            email: user.email,
            username: user.username,
            purchaseHistory: user.purchaseHistory,
            shippingAddress: user.shippingAddress
        };
        res.user = userData;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // Update status code to 201
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific user by ID
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Update a specific user by ID
router.put('/:id', getUser, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a specific user by ID
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
