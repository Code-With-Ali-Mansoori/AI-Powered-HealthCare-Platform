const express = require('express');
const router = express.Router();
const { 
  createRequest, 
  getRequests, 
  getRequestById, 
  updateRequestStatus 
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

// Public route: Patients submit support request
router.post('/', createRequest);

// Protected routes: Volunteers manage requests
router.get('/', protect, getRequests);
router.get('/:id', protect, getRequestById);
router.patch('/:id/status', protect, updateRequestStatus);

module.exports = router;
