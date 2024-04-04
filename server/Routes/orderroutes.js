// orderRoutes.js

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
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to update an order by ID
router.put('/:id', getOrder, async (req, res) => {
    if (req.body.products != null) {
        res.order.products = req.body.products;
    }
    if (req.body.user != null) {
        res.order.user = req.body.user;
    }
    if (req.body.totalPrice != null) {
        res.order.totalPrice = req.body.totalPrice;
    }
    if (req.body.shippingAddress != null) {
        res.order.shippingAddress = req.body.shippingAddress;
    }
    if (req.body.orderDate != null) {
        res.order.orderDate = req.body.orderDate;
    }
    try {
        const updatedOrder = await res.order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete an order by ID
router.delete('/:id', getOrder, async (req, res) => {
    try {
        await res.order.remove();
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get order by ID
async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.order = order;
    next();
}

module.exports = router;
