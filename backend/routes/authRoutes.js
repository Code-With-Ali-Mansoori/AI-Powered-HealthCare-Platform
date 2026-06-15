const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Route configurations
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
