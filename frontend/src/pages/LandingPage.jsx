import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, Clock, Heart, Users, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 py-20 lg:py-32">
        {/* Subtle Decorative Gradients */}
        <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-emerald-50/30 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100/50 mb-6">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              <span>AI-Powered NGO Patient Support Portal</span>
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Helping Patients Connect With <span className="text-blue-600">Support Faster</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed font-normal">
              A healthcare coordination platform for NGOs. Powered by Google Gemini AI to analyze patient request urgency, summarize details, and suggest actions for rapid responder assignment.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/request-support"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                <span>Request Support</span>
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-base font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition-all"
              >
                Volunteer Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
              Platform Features
            </h2>
            <p className="mt-4 text-slate-500">
              Simplifying the bridge between vulnerable patients and responding volunteers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-blue-500/10 p-3.5 rounded-xl text-blue-600 inline-block mb-6">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                AI Case Prioritization
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Patient descriptions are parsed automatically by Gemini AI to classify cases into High, Medium, or Low priority. Critical emergencies or blood requirements are flagged instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-emerald-500/10 p-3.5 rounded-xl text-emerald-600 inline-block mb-6">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Patient Support Tracking
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Allows patients to request Medical Consultation, Blood, Medicine Support, or Mental Health care. Clean database logs capture demographic details and contact parameters.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-amber-500/10 p-3.5 rounded-xl text-amber-600 inline-block mb-6">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Faster Volunteer Response
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Volunteer dashboard centralizes open tickets. Volunteers search by patient name or filter by urgency type to make contact and mark tickets 'In Progress' or 'Resolved'.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-extrabold">100%</div>
            <div className="mt-2 text-blue-100 font-medium">Automatic Case Sorting</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold">&lt; 3 Sec</div>
            <div className="mt-2 text-blue-100 font-medium">AI Analysis Time</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold">24/7</div>
            <div className="mt-2 text-blue-100 font-medium">Support Intake Pipeline</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
