const { GoogleGenerativeAI } = require('@google/generative-ai');

// Helper for local heuristic analysis in case Gemini API is not available or fails
const localFallbackAnalysis = (supportType, description) => {
  console.log('Using local heuristic analysis fallback...');
  const text = (supportType + ' ' + description).toLowerCase();

  let priority = 'Low';
  let summary = description.substring(0, 100);
  if (description.length > 100) summary += '...';
  
  let recommendedAction = 'Provide general support information and guide the patient to appropriate resources.';

  // Rule: High if urgent, emergency, severe pain, blood needed, life threatening
  const highKeywords = ['urgent', 'emergency', 'severe', 'pain', 'blood', 'life threatening', 'critical', 'accident', 'bleeding', 'suicid', 'heart attack', 'breath'];
  const hasHighKeyword = highKeywords.some(kw => text.includes(kw));

  // Support Type Blood Requirement is High
  if (supportType === 'Blood Requirement' || hasHighKeyword) {
    priority = 'High';
    recommendedAction = 'Immediate contact required. Alert nearby volunteers/blood donors and coordinate urgent assistance.';
  } else if (
    supportType === 'Medicine Support' || 
    supportType === 'Medical Consultation' || 
    text.includes('medicine') || 
    text.includes('pill') || 
    text.includes('consultation') || 
    text.includes('doctor')
  ) {
    priority = 'Medium';
    recommendedAction = 'Schedule medical consultation or review prescription list to arrange medicine supply.';
  } else if (supportType === 'Mental Health Support') {
    priority = 'Medium';
    recommendedAction = 'Schedule a session with a volunteer counselor or recommend helpline details.';
  }

  return {
    priority,
    summary,
    recommendedAction
  };
};

const analyzeRequest = async (supportType, description) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === '' || apiKey.includes('your_gemini_api_key')) {
    console.warn('GEMINI_API_KEY is not configured or placeholder remains.');
    return localFallbackAnalysis(supportType, description);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash as the standard fast text processing model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a healthcare support assistant.
Analyze the patient's request of type "${supportType}".
Patient's description of their problem: "${description}".

Rules for determining priority:
High:
* urgent
* emergency
* severe pain
* blood needed
* life threatening

Medium:
* medicine support
* consultation

Low:
* general inquiry

Return ONLY a valid JSON object matching this schema. Do not output any markdown formatting block, backticks, or other text outside the JSON object:
{
  "priority": "High" | "Medium" | "Low",
  "summary": "a short summary of the patient's request",
  "recommendedAction": "recommended action to take based on request details"
}`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    });

    const responseText = result.response.text().trim();
    console.log('Gemini raw response:', responseText);

    // Parse safety check
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch (parseErr) {
      // Sometimes models wrap responses in ```json ... ``` despite instructions
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw parseErr;
      }
    }

    // Double check that we got the valid priority types
    if (!['High', 'Medium', 'Low'].includes(parsedResult.priority)) {
      parsedResult.priority = 'Medium'; // default fallback for safety
    }

    return {
      priority: parsedResult.priority,
      summary: parsedResult.summary || 'Summary not provided.',
      recommendedAction: parsedResult.recommendedAction || 'Monitor and contact patient.'
    };
  } catch (error) {
    console.error('Error with Gemini API request:', error);
    return localFallbackAnalysis(supportType, description);
  }
};

module.exports = {
  analyzeRequest
};
