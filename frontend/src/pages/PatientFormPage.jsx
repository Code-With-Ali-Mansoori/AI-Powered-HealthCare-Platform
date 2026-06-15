import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Activity, ShieldAlert, CheckCircle, FileText, User, Phone, Mail, Calendar, HelpCircle, Loader2 } from 'lucide-react';

const PatientFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    supportType: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full Name is required';
    
    if (!formData.age) {
      tempErrors.age = 'Age is required';
    } else {
      const parsedAge = Number(formData.age);
      if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
        tempErrors.age = 'Please enter a valid age (1-120)';
      }
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        tempErrors.phone = 'Please enter a valid phone number (7-15 digits)';
      }
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        tempErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.supportType) {
      tempErrors.supportType = 'Please select a support type';
    }

    if (!formData.description.trim()) {
      tempErrors.description = 'Please describe your problem';
    } else if (formData.description.trim().length < 15) {
      tempErrors.description = 'Description should be at least 15 characters to allow proper AI analysis';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      // POST to /api/requests
      const response = await API.post('/requests', {
        ...formData,
        age: Number(formData.age)
      });
      console.log('Submission success:', response.data);
      navigate('/request-success');
    } catch (err) {
      console.error('Submission failed:', err);
      const errMsg = err.response?.data?.message || 'Failed to submit request. Please try again.';
      setSubmitError(errMsg);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Loading Overlay */}
      {submitting && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
          <div className="bg-white text-slate-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 text-center border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing Request</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-1">
              Google Gemini AI is summarizing your details and setting triage routing priority.
            </p>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full animate-pulse mt-3 inline-block">
              Connecting to Gemini AI...
            </span>
          </div>
        </div>
      )}

      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Healthcare Support Request Form
          </h1>
          <p className="mt-2.5 text-slate-500">
            Fill out the details below. Our system will analyze your case and queue it for priority volunteer contact.
          </p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 flex items-start space-x-3 text-sm">
            <ShieldAlert className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={`pl-10 block w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors text-sm py-3 ${
                    errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.fullName && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.fullName}</p>}
            </div>

            {/* Age & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-slate-700 mb-2">
                  Age
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="e.g. 35"
                    className={`pl-10 block w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors text-sm py-3 ${
                      errors.age ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300'
                    }`}
                  />
                </div>
                {errors.age && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.age}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 555 123 4567"
                    className={`pl-10 block w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors text-sm py-3 ${
                      errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300'
                    }`}
                  />
                </div>
                {errors.phone && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.phone}</p>}
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className={`pl-10 block w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors text-sm py-3 ${
                    errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>}
            </div>

            {/* Support Type */}
            <div>
              <label htmlFor="supportType" className="block text-sm font-semibold text-slate-700 mb-2">
                Support Type
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <select
                  id="supportType"
                  name="supportType"
                  value={formData.supportType}
                  onChange={handleChange}
                  className={`pl-10 block w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors text-sm py-3 bg-white ${
                    errors.supportType ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select Support Type</option>
                  <option value="Medical Consultation">Medical Consultation</option>
                  <option value="Blood Requirement">Blood Requirement</option>
                  <option value="Medicine Support">Medicine Support</option>
                  <option value="Mental Health Support">Mental Health Support</option>
                </select>
              </div>
              {errors.supportType && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.supportType}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-2">
                Describe Your Health Problem
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Please describe symptoms, severity, timelines, or medication/blood specs..."
                className={`block w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors text-sm py-3 px-3.5 ${
                  errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300'
                }`}
              />
              <p className="mt-1.5 text-[11px] text-slate-400 leading-normal">
                Include relevant context (e.g. blood group details, pain level, fever presence) for better AI parsing.
              </p>
              {errors.description && <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex justify-center items-center px-6 py-3.5 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Submit Support Request</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientFormPage;
