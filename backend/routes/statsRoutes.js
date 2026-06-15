const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

// Protected route: Volunteer dashboard metrics
router.get('/stats', protect, getDashboardStats);

module.exports = router;
