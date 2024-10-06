const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  // If no token is provided, assume the user is a guest
  if (!token) {
    req.user = { role: 'guest' };  // Treat the user as a guest
    return next();
  }

  // If a token is provided, verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
