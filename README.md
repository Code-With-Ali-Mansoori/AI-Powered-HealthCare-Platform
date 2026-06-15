# CareAssist: AI-Powered Patient Triage & NGO Coordination Portal

Welcome! I designed and developed **CareAssist**—a full-stack MERN application integrated with Google Gemini AI that automates intake triaging for healthcare support organizations and NGOs. 

This platform allows vulnerable patients to submit medical requirements while leveraging Large Language Models (LLMs) to analyze descriptions, assign emergency priority tags, and guide volunteer coordinates for immediate response.

---

## 🚀 Key Highlights & My Engineering Decisions

* **Production-Grade MVC Architecture:** I separated concerns strictly across controllers, models, routes, and services on the backend, making it modular and easy to scale.
* **Resilient AI-Integration (With Fallback):** I integrated the `@google/generative-ai` SDK. To ensure the application is production-ready, I built a local Regex-based **Heuristic Fallback Engine**. If the Gemini API key is missing or encounters a rate limit, the system automatically triages the case safely without crashing.
* **Secure Token-Based Auth (JWT):** Built robust volunteer access controls, password hashing with `bcryptjs`, and route guards on the React frontend.
* **Seeded Development Workflow:** I added a boot hook that automatically seeds a volunteer profile if your database is empty, so recruiters and developers can log in instantly without manual database operations.

---

## 🛠️ The Tech Stack I Used

* **Frontend:** React, React Router v6, Tailwind CSS, Axios, Lucide Icons
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose ODM
* **AI Engine:** Google Gemini AI API (`gemini-1.5-flash`)
* **Security:** JSON Web Tokens (JWT), Bcrypt password hashing

---

## 🧠 How My AI Triage Pipeline Works

When a patient submits a request, my backend sends the case details directly to Gemini with a highly optimized triaging system prompt:

### The Triaging Prompt
> *Analyze the patient's request of type "[Support Type]". Patient's description: "[Description]". Determine the priority (High, Medium, Low) and return a structured JSON response.*

### Priority Classification Rules I Defined:
* 🔴 **High Priority:** Urgent, emergency scenarios, severe pain, active bleeding, or blood requirement requests.
* 🟡 **Medium Priority:** Regular medicine support, standard consultations, and mental health counseling.
* 🟢 **Low Priority:** General inquiries or information requests.

Gemini returns a clean JSON block which my backend parses and stores:
```json
{
  "priority": "High | Medium | Low",
  "summary": "Short 1-sentence case overview",
  "recommendedAction": "Action steps for the volunteer"
}
```

---

## 💻 Features I Built

### 1. Patient Portal & Intake Form
* Clean, responsive form capturing demographic details, support type, and symptoms.
* Client-side validation (checks age thresholds, phone formats, and email patterns).
* Dynamic loading screen with AI analysis status indicator during submission.

### 2. Volunteer Dashboard & Metrics
* Stat cards displaying Total, High, Medium, and Resolved counts.
* Interactive AI Insights card demonstrating live resolution rates and top request categories.
* Real-time search query box and filter buttons (sort dynamically by Priority and Status).

### 3. Patient Case Inspection Page
* Deep-dive view of patient profiles, symptoms, and contact information.
* Prominently featured AI Analysis Card detailing Gemini's summary and recommended action.
* Action buttons to update ticket status ("Mark In Progress", "Mark Resolved") and quick links to directly call (`tel:`) or email (`mailto:`) the patient in a single click.

---

## 📂 Code Layout

Here is the directory structure I created:
```
CareAssist/
├── backend/
│   ├── config/             # Database connection & API setups
│   ├── controllers/        # Request, Auth, and Analytics endpoints logic
│   ├── middleware/         # Route guarding (JWT token validation)
│   ├── models/             # Mongoose schemas (SupportRequest, User)
│   ├── routes/             # Express routing setup
│   ├── services/           # Gemini AI API and Fallback Heuristics
│   ├── server.js           # Server bootstrap & default seeder
│   └── verify-api.js       # CLI validation script I wrote
└── frontend/
    ├── src/
    │   ├── components/     # Reusable layout guards (ProtectedRoute)
    │   ├── hooks/          # useAuth context provider hook
    │   ├── layouts/        # Header, Navbars, and Footers wrapper
    │   ├── pages/          # Landing, PatientForm, Success, Login, Dashboard, Details
    │   ├── services/       # Axios API client connection
    │   └── App.jsx         # Routes mapping
    └── tailwind.config.js  # Styling themes and tokens
```

---

## ⚙️ How to Run this Project Locally

### 1. Setup Backend Environment Configuration
1. Open your terminal and go to the `backend` folder:
   ```bash
   cd backend
   ```
2. Copy the template variable file to create your active `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your details:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/healthcareSupport_DB
   JWT_SECRET=supersecretjwtsecretkeychangeinproduction
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### 2. Run the Frontend
1. Open a new terminal window, and go to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Start the client server:
   ```bash
   npm run dev
   ```
4. Open your browser to **`http://localhost:5173`**.

---

## 🔑 Recruiter Demo Access Credentials

To access the volunteer coordination hub without manually registering accounts, I seeded a default volunteer profile in the start database:

* **Volunteer Username:** `volunteer@ngo.org`
* **Volunteer Password:** `password123`
