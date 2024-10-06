const express = require('express');
const { placeOrder, getOrders, getUserOrders } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Place an Order (For both guests and logged-in users)
router.post('/', authMiddleware, placeOrder);

// Get all Orders (Admin access)
router.get('/', authMiddleware, getOrders);

// Get orders for a specific user (Logged-in users only)
router.get('/my-orders', authMiddleware, getUserOrders);

module.exports = router;
