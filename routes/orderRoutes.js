const express = require('express');
const { placeOrder, getOrders, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

// Route for placing an order
router.post('/api/orders', placeOrder);

// Route for getting all orders (admin or user)
router.get('/api/orders', getOrders);

// Route for getting a specific user's orders
router.get('/api/orders/user', getUserOrders);

module.exports = router;
