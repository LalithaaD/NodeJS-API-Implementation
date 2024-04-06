const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// Route to get all carts
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a single cart by ID
router.get('/:id', getCart, (req, res) => {
    res.json(res.cart);
});

// Route to create a new cart
router.post('/', async (req, res) => {
    const cart = new Cart({
        products: req.body.products,
        quantities: req.body.quantities,
        user: req.body.user
    });
    try {
        const newCart = await cart.save();
        res.status(201).json(newCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to update a cart by ID
router.put('/:id', getCart, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a cart by ID
router.delete('/:id', getCart, async (req, res) => {
    try {
        await res.cart.remove();
        res.json({ message: 'Cart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get cart by ID
async function getCart(req, res, next) {
    let cart;
    try {
        cart = await Cart.findById(req.params.id);
        if (cart == null) {
            return res.status(404).json({ message: 'Cart not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.cart = cart;
    next();
}

module.exports = router;
