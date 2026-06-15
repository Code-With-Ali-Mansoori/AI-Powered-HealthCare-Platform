import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { 
  Users, AlertCircle, FileText, CheckCircle2, Search, Filter, 
  RefreshCw, Brain, Sparkles, TrendingUp, ChevronRight, Activity, ArrowUpRight
} from 'lucide-react';

const DashboardPage = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState(null);
  
  // Filters and search state
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('All');
  const [status, setStatus] = useState('All');
  
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState('');

  // Fetch stats
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await API.get('/dashboard/stats');
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError('Could not retrieve analytics dashboard details.');
    } finally {
      setLoadingStats(false);
    }
  };

  // Fetch requests
  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const params = {};
      if (search.trim()) params.search = search;
      if (priority !== 'All') params.priority = priority;
      if (status !== 'All') params.status = status;
      
      const response = await API.get('/requests', { params });
      setRequests(response.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
      setError('Could not retrieve support requests.');
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    // Debounce search/filter requests load
    const delayDebounce = setTimeout(() => {
      fetchRequests();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, priority, status]);

  const handleRefresh = () => {
    fetchStats();
    fetchRequests();
  };

  const getPriorityBadgeClass = (p) => {
    switch (p) {
      case 'High': return 'bg-red-50 text-red-700 border-red-100';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Low': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getStatusBadgeClass = (s) => {
    switch (s) {
      case 'Resolved': return 'bg-emerald-100 text-emerald-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-orange-100 text-orange-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <span>Volunteer Coordination Dashboard</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Review AI summaries, prioritize high-risk medical requests, and assign volunteers.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Sync Data</span>
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="bg-blue-500/10 p-3 rounded-xl text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Requests</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {loadingStats ? '...' : stats?.totalRequests || 0}
              </h3>
            </div>
          </div>

          {/* Card 2: High Priority */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="bg-red-500/10 p-3 rounded-xl text-red-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">High Priority Cases</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {loadingStats ? '...' : stats?.highPriorityCount || 0}
              </h3>
            </div>
          </div>

          {/* Card 3: Medium Priority */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="bg-amber-500/10 p-3 rounded-xl text-amber-600">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Medium Priority Cases</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {loadingStats ? '...' : stats?.mediumPriorityCount || 0}
              </h3>
            </div>
          </div>

          {/* Card 4: Resolved */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolved Cases</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {loadingStats ? '...' : stats?.resolvedCount || 0}
              </h3>
            </div>
          </div>
        </div>

        {/* AI Insights & Diagnostics Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-md p-6 border border-blue-500/10">
          <div className="flex items-center space-x-2.5 mb-5">
            <Brain className="h-6 w-6 text-blue-100" />
            <h2 className="text-lg font-bold">AI Diagnostics & Trends</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Urgent Cases Metric */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-blue-100 tracking-wider">Urgent Cases Priority</span>
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Action Red</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold">{loadingStats ? '...' : stats?.highPriorityCount || 0}</span>
                <span className="text-sm text-blue-100">require immediate check</span>
              </div>
            </div>

            {/* Most Requested Support Type */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-blue-100 tracking-wider">Top Request Category</span>
                <Sparkles className="h-4 w-4 text-amber-300 fill-current" />
              </div>
              <div className="flex items-baseline space-x-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-lg font-extrabold">{loadingStats ? '...' : stats?.mostRequestedSupportType || 'None'}</span>
              </div>
              <p className="text-xs text-blue-100 mt-2">
                Has the highest ticket submission volume this period.
              </p>
            </div>

            {/* Resolution Percentage */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-blue-100 tracking-wider">Resolution Rate</span>
                <TrendingUp className="h-4 w-4 text-emerald-300" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold">{loadingStats ? '...' : `${stats?.resolutionPercentage || 0}%`}</span>
                <span className="text-sm text-blue-100">of requests solved</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5 mt-3">
                <div 
                  className="bg-emerald-300 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${loadingStats ? 0 : stats?.resolutionPercentage || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Management Panel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Filters Bar */}
          <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900 flex-shrink-0">Support Tickets Log</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:max-w-3xl">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 block w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-xs py-2.5 border"
                />
              </div>

              {/* Filter Priority */}
              <div className="flex items-center space-x-2">
                <Filter className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="block w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-xs py-2.5 border bg-white"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              {/* Filter Status */}
              <div className="flex items-center space-x-2">
                <Activity className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-xs py-2.5 border bg-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loadingRequests ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                <span className="text-sm font-medium">Fetching support request logs...</span>
              </div>
            ) : requests.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <FileText className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                <p className="text-sm font-semibold">No support requests match search filters.</p>
                <p className="text-xs text-slate-400 mt-1">Try resetting the priority or status search query.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-left">
                  <tr>
                    <th scope="col" className="px-6 py-4">Patient Name</th>
                    <th scope="col" className="px-6 py-4">Support Type</th>
                    <th scope="col" className="px-6 py-4">Priority</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                    <th scope="col" className="px-6 py-4">Date</th>
                    <th scope="col" className="relative px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-sm">
                  {requests.map((req) => (
                    <tr 
                      key={req._id} 
                      className="hover:bg-slate-50/50 transition cursor-pointer"
                      onClick={() => window.location.href = `/dashboard/requests/${req._id}`}
                    >
                      {/* Name & Age */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{req.fullName}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{req.age} yrs • {req.phone}</div>
                      </td>

                      {/* Support Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-slate-600 font-medium">{req.supportType}</span>
                      </td>

                      {/* Priority Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getPriorityBadgeClass(req.priority)}`}>
                          {req.priority}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getStatusBadgeClass(req.status)}`}>
                          {req.status}
                        </span>
                      </td>

                      {/* Submission Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">
                        {new Date(req.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>

                      {/* Action Arrow */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-slate-400">
                        <Link 
                          to={`/dashboard/requests/${req._id}`}
                          onClick={(e) => e.stopPropagation()} // Stop navigation trigger double hit
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold space-x-0.5 text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                        >
                          <span>Review</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardPage;
