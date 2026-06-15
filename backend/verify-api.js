require('dotenv').config();
const mongoose = require('mongoose');
const { analyzeRequest } = require('./services/geminiService');

const runTests = async () => {
  console.log('--- STARTING VERIFICATION TESTS ---');
  
  // 1. Test AI Analysis Service (Fallback and API)
  console.log('\n[Test 1] Testing Gemini AI Service / Heuristic Fallback...');
  
  // Test Medium priority keyword
  const analysis1 = await analyzeRequest('Medical Consultation', 'I have a mild fever and need a doctor appointment to check my symptoms and get a prescription.');
  console.log('Result 1 (Medical Consultation):', JSON.stringify(analysis1, null, 2));
  
  // Test High priority keyword
  const analysis2 = await analyzeRequest('Blood Requirement', 'Urgent! Patient has severe bleeding after a road accident and needs 2 units of O negative blood immediately. Life threatening emergency!');
  console.log('Result 2 (Urgent Blood Request):', JSON.stringify(analysis2, null, 2));

  // 2. Test MongoDB Connection
  console.log('\n[Test 2] Testing MongoDB Atlas/Local connection...');
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/healthcare-support';
  console.log(`Using URI: ${mongoUri}`);
  
  try {
    await mongoose.connect(mongoUri);
    console.log('SUCCESS: Connected to MongoDB database successfully!');
    await mongoose.disconnect();
    console.log('SUCCESS: Disconnected from database.');
  } catch (err) {
    console.error('ERROR: Failed to connect to MongoDB:', err.message);
  }
  
  console.log('\n--- VERIFICATION TESTS COMPLETE ---');
};

runTests();
