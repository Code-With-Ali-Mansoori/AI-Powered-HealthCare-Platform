import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';

const SuccessPage = () => {
  return (
    <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-100 shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-50 p-4 rounded-full text-emerald-500">
            <CheckCircle className="h-16 w-16 fill-current" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
          Request Submitted!
        </h1>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          Thank you for reaching out. Your healthcare support request has been successfully recorded. 
          Our AI model is currently prioritizing the case, and an NGO volunteer will contact you shortly via phone or email.
        </p>

        <div className="space-y-3">
          <Link
            to="/request-support"
            className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
          >
            Submit Another Request
          </Link>
          
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center px-5 py-3 border border-slate-200 text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
