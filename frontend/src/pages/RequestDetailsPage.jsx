import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { 
  ArrowLeft, User, Phone, Mail, Calendar, HelpCircle, FileText, 
  Sparkles, CheckCircle2, AlertCircle, PlayCircle, Loader2, MessageSquare
} from 'lucide-react';

const RequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const fetchRequestDetails = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/requests/${id}`);
      setRequest(response.data);
    } catch (err) {
      console.error('Failed to fetch request details:', err);
      setError('Could not retrieve detailed patient request profiles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const response = await API.patch(`/requests/${id}/status`, { status: newStatus });
      setRequest(response.data);
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const getPriorityBadgeClass = (p) => {
    switch (p) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadgeClass = (s) => {
    switch (s) {
      case 'Resolved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Open': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
          <span className="text-slate-500 font-medium text-sm">Retrieving case profile...</span>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-slate-900 mb-2">Error Loading Case</h2>
          <p className="text-slate-500 text-sm mb-6">{error || 'The requested ticket could not be found.'}</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-slate-200 text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Link */}
        <Link 
          to="/dashboard" 
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header Title Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-extrabold text-slate-900">{request.fullName}</h1>
              <span className={`px-2.5 py-0.5 border text-xs font-semibold rounded ${getStatusBadgeClass(request.status)}`}>
                {request.status}
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1.5">
              Submitted on {new Date(request.createdAt).toLocaleString()}
            </p>
          </div>
          
          {/* Top Quick Actions */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <a
              href={`tel:${request.phone}`}
              className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2.5 border border-slate-200 text-xs font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition"
            >
              <Phone className="mr-2 h-4 w-4 text-slate-400" />
              <span>Call Patient</span>
            </a>
            <a
              href={`mailto:${request.email}?subject=CareAssist NGO Support regarding your ${request.supportType} request`}
              className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2.5 border border-slate-200 text-xs font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 shadow-sm transition"
            >
              <Mail className="mr-2 h-4 w-4 text-slate-400" />
              <span>Email Patient</span>
            </a>
          </div>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Patient Details Left Panel (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Demographic Parameters */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-md font-bold text-slate-900 border-b border-slate-100 pb-3">Patient Profile Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block font-medium uppercase tracking-wide">Full Name</span>
                    <span className="font-bold text-slate-800">{request.fullName}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block font-medium uppercase tracking-wide">Age</span>
                    <span className="font-bold text-slate-800">{request.age} Years Old</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block font-medium uppercase tracking-wide">Contact Number</span>
                    <a href={`tel:${request.phone}`} className="font-bold text-blue-600 hover:underline">{request.phone}</a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block font-medium uppercase tracking-wide">Email Address</span>
                    <a href={`mailto:${request.email}`} className="font-bold text-blue-600 hover:underline">{request.email}</a>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:col-span-2">
                  <HelpCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 text-[11px] block font-medium uppercase tracking-wide">Support Classification</span>
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded text-xs mt-1 inline-block border border-slate-200/50">
                      {request.supportType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem description */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-md font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <span>Problem Description</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-200/40 whitespace-pre-line font-medium">
                {request.description}
              </p>
            </div>
          </div>

          {/* AI Analysis Right Panel (1 col) */}
          <div className="space-y-6">
            
            {/* AI Highlight Card */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-md border border-blue-500/10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wide text-blue-100">
                  <Sparkles className="h-4 w-4 text-amber-300 fill-current" />
                  <span>Gemini AI Insights</span>
                </span>
                
                {/* Priority Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getPriorityBadgeClass(request.priority)}`}>
                  {request.priority} Priority
                </span>
              </div>

              {/* AI Summary */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-blue-100 uppercase tracking-wide">AI Brief Summary</h3>
                <p className="text-sm font-medium leading-relaxed bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                  {request.aiSummary || 'Summary pending processing...'}
                </p>
              </div>

              {/* Recommended Action */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-blue-100 uppercase tracking-wide">Recommended Action</h3>
                <p className="text-sm font-medium leading-relaxed bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                  {request.recommendedAction || 'Action pending analysis...'}
                </p>
              </div>
            </div>

            {/* Ticket Management Actions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-md font-bold text-slate-900 border-b border-slate-100 pb-3">Update Case Status</h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => updateStatus('In Progress')}
                  disabled={updating || request.status === 'In Progress'}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm hover:shadow"
                >
                  {updating ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : (
                    <PlayCircle className="mr-2 h-4 w-4" />
                  )}
                  <span>Mark In Progress</span>
                </button>

                <button
                  onClick={() => updateStatus('Resolved')}
                  disabled={updating || request.status === 'Resolved'}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm hover:shadow"
                >
                  {updating ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : (
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                  )}
                  <span>Mark Resolved</span>
                </button>
                
                {request.status !== 'Open' && (
                  <button
                    onClick={() => updateStatus('Open')}
                    disabled={updating}
                    className="w-full flex items-center justify-center px-4 py-2.5 border border-slate-200 text-xs font-semibold rounded-xl text-slate-500 bg-white hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span>Re-open Ticket</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RequestDetailsPage;
