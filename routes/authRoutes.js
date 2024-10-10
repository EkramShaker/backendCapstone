const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);  // Ensure this route is added

module.exports = router;
