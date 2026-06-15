const mongoose = require('mongoose');

const supportRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please enter your full name'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Please enter your age'],
    min: [0, 'Age must be positive']
  },
  phone: {
    type: String,
    required: [true, 'Please enter your phone number'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    trim: true,
    lowercase: true
  },
  supportType: {
    type: String,
    required: [true, 'Please select a support type'],
    enum: {
      values: ['Medical Consultation', 'Blood Requirement', 'Medicine Support', 'Mental Health Support'],
      message: 'Invalid support type specified'
    }
  },
  description: {
    type: String,
    required: [true, 'Please describe your request details'],
    trim: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Low'
  },
  aiSummary: {
    type: String,
    default: ''
  },
  recommendedAction: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SupportRequest', supportRequestSchema);
