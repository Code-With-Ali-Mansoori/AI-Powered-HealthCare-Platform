# CareAssist 🏥
### AI-Powered Patient Triage & NGO Coordination Portal

A full-stack **MERN** application I built to help NGOs automatically receive, analyze, and prioritize patient support requests using **Google Gemini AI**.

---

## ⚡ Core Features I Developed
* **AI-Intake Triage:** Patient descriptions are automatically categorized into **High**, **Medium**, or **Low** priority using custom prompts I configured for the Gemini API.
* **Resilient API Design:** Includes a **built-in heuristic fallback**—if the Gemini API key is missing or fails, regex rules safely triage cases so the app never goes down.
* **Volunteer Dashboard:** Real-time analytics, filtering, search, and dynamic status updates ("Open", "In Progress", "Resolved").
* **Direct Contacts:** Direct click-to-call (`tel:`) and click-to-email (`mailto:`) links to reach out to patients instantly.

---

## 🛠️ The Stack
**MongoDB Atlas** | **Express.js** | **React.js** | **Node.js** | **Tailwind CSS** | **Google Gemini API**

---

## 🔑 Recruiter Demo Login
I configured the backend to automatically seed a volunteer account on startup so you don't have to register:
* **Email:** `volunteer@ngo.org`
* **Password:** `password123`

---

## 🚀 Fast Local Setup (2 Minutes)

### 1. Backend Setup
1. In your terminal, enter the `backend` folder:
   ```bash
   cd backend
   ```
2. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your Gemini API key (the database URL is already set to local MongoDB by default):
   ```env
   GEMINI_API_KEY=your_key_here
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and go to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install packages & run:
   ```bash
   npm install
   npm run dev
   ```
3. Open **`http://localhost:5173`** in your browser.
