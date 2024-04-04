// cartRoutes.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');

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
    if (req.body.products != null) {
        res.cart.products = req.body.products;
    }
    if (req.body.quantities != null) {
        res.cart.quantities = req.body.quantities;
    }
    if (req.body.user != null) {
        res.cart.user = req.body.user;
    }
    try {
        const updatedCart = await res.cart.save();
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
