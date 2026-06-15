# CareAssist - AI-Powered Healthcare Support Assistant

An automated triage and case-management web platform built for NGOs to rapidly receive, prioritize, and coordinate support requests from patients.

---

## 📋 Table of Contents
1. [Problem & Solution](#-problem--solution)
2. [Tech Stack](#-tech-stack)
3. [AI Feature Details](#-ai-feature-details)
4. [NGO Use Cases](#-ngo-use-cases)
5. [Project Folder Layout](#-project-folder-layout)
6. [Local Deployment Steps](#-local-deployment-steps)
7. [Authentication & Verification](#-authentication--verification)

---

## 🚨 Problem & Solution

### The Problem
During humanitarian crises, medical shortages, or community emergencies, NGOs receive an overwhelming volume of patient support requests. These range from general inquiries to critical, life-threatening scenarios (e.g. urgent blood requirements or severe pain). Reviewing these requests manually creates response bottlenecks, resulting in delayed care for critical patients.

### The Solution
**CareAssist** solves this bottleneck by integrating **Google Gemini AI** directly into the patient intake pipeline. When a patient submits a request:
1. **Gemini AI** immediately analyzes the case description.
2. It generates a concise **AI Summary**, determines the **Urgency Priority** (High, Medium, or Low) using custom triaging rules, and recommends an **Immediate Action**.
3. The request is instantly queued on a **Volunteer Dashboard**, where coordinators can search, filter by priority, and immediately contact patients.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite-scaffolded), React Router v6, Tailwind CSS, Axios, Lucide Icons
- **Backend:** Node.js, Express.js, MVC Architecture
- **Database:** MongoDB Atlas & Mongoose
- **AI Integration:** Google Gemini API (`@google/generative-ai`)
- **Authentication:** JWT (JSON Web Tokens) & Cryptographic Password Hashing (`bcryptjs`)

---

## 🧠 AI Feature Details

After intake, the Express backend makes a structured API call to Gemini.

### Prompt Instruction
```text
You are a healthcare support assistant.
Analyze the patient's request of type "[Support Type]".
Patient's description: "[Description]".

Rules:
High: urgent, emergency, severe pain, blood needed, life threatening
Medium: medicine support, consultation
Low: general inquiry
```

### Response Format
Gemini is configured to output JSON matching this structure:
```json
{
  "priority": "High | Medium | Low",
  "summary": "short summary",
  "recommendedAction": "recommended action to take based on request details"
}
```

### Resilience Fallback
To ensure maximum availability, the application includes a **Heuristic Fallback Parser**. If the Gemini API key is missing or the external API call fails, the system scans the text using regex matches to categorize the case safely, ensuring the patient's ticket is still recorded and triaged.

---

## 🤝 NGO Use Cases

- **Immediate Blood Drive Alerts:** A patient requesting a blood requirement automatically triggers a "High Priority" flag, helping volunteers contact donors immediately.
- **Triage Dashboard:** Volunteers can filter out low-priority inquiries to focus fully on severe medical and mental health consultation needs.
- **Integrated Patient Contacts:** Action links allow volunteers to dial patient numbers (`tel:`) or open emails (`mailto:`) directly from their browser, cutting coordination latency to seconds.

---

## 📂 Project Folder Layout

```
AI Powered - Health Care Support/
├── backend/
│   ├── config/             # Database & third-party API configs
│   ├── controllers/        # Request, auth, and analytics controllers
│   ├── middleware/         # Auth protect token check
│   ├── models/             # SupportRequest and User schemas
│   ├── routes/             # API Router endpoints
│   ├── services/           # Gemini AI integration service
│   ├── server.js           # Server configuration & bootstrap
│   └── verify-api.js       # Local backend validation script
└── frontend/
    ├── src/
    │   ├── components/     # UI components (e.g. ProtectedRoute)
    │   ├── hooks/          # useAuth hook
    │   ├── layouts/        # MainLayout (Header, Nav, Footer)
    │   ├── pages/          # LandingPage, PatientForm, Success, Login, Dashboard, Details
    │   ├── services/       # Axios API client & Auth API calls
    │   └── App.jsx         # App router mount
    └── tailwind.config.js  # Color tokens and stylesheet paths
```

---

## 🚀 Local Deployment Steps

### 1. Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (running locally on port 27017 or a MongoDB Atlas URI)

### 2. Backend Setup
1. Open a terminal in the `backend/` directory:
   ```bash
   cd backend
   ```
2. Create your `.env` configuration file:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/healthcare-support
   JWT_SECRET=supersecretjwtsecretkeychangeinproduction
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal in the `frontend/` directory:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173`.

---

## 🔒 Authentication & Verification

On server startup, CareAssist automatically seeds a default volunteer user if none exists in the database.

- **Volunteer Username:** `volunteer@ngo.org`
- **Volunteer Password:** `password123`

You can verify server connectivity, Mongoose mapping, and AI categorization heuristics at any time by running:
```bash
cd backend
node verify-api.js
```
