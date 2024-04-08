//Dependencies
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Route to get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a single order by ID
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
});

// Route to create a new order
router.post('/', async (req, res) => {
    const order = new Order({
        products: req.body.products,
        user: req.body.user,
        totalPrice: req.body.totalPrice,
        shippingAddress: req.body.shippingAddress,
        orderDate: req.body.orderDate
    });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder); // Updated to respond with the created order
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to update an order by ID
router.put('/:id', getOrder, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete an order by ID
router.delete('/:id', getOrder, async (req, res) => {
    try {
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get order by ID
async function getOrder(req, res, next) {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.order = order;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;
