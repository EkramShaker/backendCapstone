const express = require('express');
const {
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Public route to get all menu items
router.get('/', getMenuItems);

// Protected routes for admin users
router.post('/', authMiddleware, addMenuItem);
router.put('/:id', authMiddleware, updateMenuItem);
router.delete('/:id', authMiddleware, deleteMenuItem);

module.exports = router;
