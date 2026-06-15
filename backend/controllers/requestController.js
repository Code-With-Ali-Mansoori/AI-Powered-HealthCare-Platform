const SupportRequest = require('../models/SupportRequest');
const { analyzeRequest } = require('../services/geminiService');

// @desc    Create new support request (Public)
// @route   POST /api/requests
// @access  Public
const createRequest = async (req, res) => {
  try {
    const { fullName, age, phone, email, supportType, description } = req.body;

    // Validation
    if (!fullName || !age || !phone || !email || !supportType || !description) {
      return res.status(400).json({ message: 'All patient request fields are required' });
    }

    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum <= 0) {
      return res.status(400).json({ message: 'Please enter a valid age' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    const validSupportTypes = ['Medical Consultation', 'Blood Requirement', 'Medicine Support', 'Mental Health Support'];
    if (!validSupportTypes.includes(supportType)) {
      return res.status(400).json({ message: 'Invalid support type' });
    }

    console.log(`Analyzing request from ${fullName} using Gemini AI...`);
    
    // Call Gemini AI service to analyze request description
    const aiAnalysis = await analyzeRequest(supportType, description);

    // Create DB entry
    const newRequest = await SupportRequest.create({
      fullName,
      age: ageNum,
      phone,
      email,
      supportType,
      description,
      priority: aiAnalysis.priority,
      aiSummary: aiAnalysis.summary,
      recommendedAction: aiAnalysis.recommendedAction,
      status: 'Open'
    });

    res.status(201).json(newRequest);
  } catch (err) {
    console.error('Error in createRequest:', err);
    res.status(500).json({ message: 'Server error while submitting support request', error: err.message });
  }
};

// @desc    Get support requests with search/filter (Protected)
// @route   GET /api/requests
// @access  Private (Volunteer)
const getRequests = async (req, res) => {
  try {
    const { search, priority, status } = req.query;
    const queryObject = {};

    // Filter by priority
    if (priority && priority !== 'All') {
      queryObject.priority = priority;
    }

    // Filter by status
    if (status && status !== 'All') {
      queryObject.status = status;
    }

    // Search query (matches name or description case-insensitively)
    if (search) {
      queryObject.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch requests sorted by newest first
    const requests = await SupportRequest.find(queryObject).sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error('Error in getRequests:', err);
    res.status(500).json({ message: 'Server error while fetching support requests', error: err.message });
  }
};

// @desc    Get single support request by ID (Protected)
// @route   GET /api/requests/:id
// @access  Private (Volunteer)
const getRequestById = async (req, res) => {
  try {
    const request = await SupportRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Support request not found' });
    }

    res.json(request);
  } catch (err) {
    console.error('Error in getRequestById:', err);
    res.status(500).json({ message: 'Server error while retrieving request details', error: err.message });
  }
};

// @desc    Update support request status (Protected)
// @route   PATCH /api/requests/:id/status
// @access  Private (Volunteer)
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status field is required' });
    }

    const validStatuses = ['Open', 'In Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const request = await SupportRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Support request not found' });
    }

    request.status = status;
    const updatedRequest = await request.save();

    res.json(updatedRequest);
  } catch (err) {
    console.error('Error in updateRequestStatus:', err);
    res.status(500).json({ message: 'Server error while updating request status', error: err.message });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus
};
