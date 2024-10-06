const Order = require('../models/Order');


// Place an Order
exports.placeOrder = async (req, res) => {
    const { items, total } = req.body;
    let user = req.user && req.user.role !== 'guest' ? req.user.id : null;  // Null for guest users
  
    try {
      const order = new Order({ user, items, total });
      await order.save();
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: 'Failed to place order' });
    }
  };

// Get all Orders (for admin or user)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve orders' });
  }
};

// Get single user's orders (if logged in)
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve user orders' });
  }
};
