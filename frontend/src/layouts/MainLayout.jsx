import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Heart, LayoutDashboard, LogOut, LogIn, FileText, Home } from 'lucide-react';

const MainLayout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Brand Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-blue-600 font-bold text-xl tracking-tight transition hover:opacity-90">
                <div className="bg-blue-600/10 p-2 rounded-lg text-blue-600">
                  <Heart className="h-6 w-6 fill-current" />
                </div>
                <span>CareAssist</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/request-support"
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  location.pathname === '/request-support' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Request Support</span>
              </Link>
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/dashboard') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Volunteer Hub</span>
              </Link>
            </nav>

            {/* CTA/Auth Button */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    Volunteer: {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 px-3.5 py-2 rounded-lg transition-all border border-transparent hover:border-red-100"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Volunteer Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:flex md:justify-between md:items-center">
          <div className="flex justify-center items-center space-x-2 text-white font-bold text-lg mb-4 md:mb-0">
            <Heart className="h-5 w-5 text-blue-500 fill-current" />
            <span>CareAssist Support Hub</span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CareAssist NGO Platform. Built for rapid community medical response.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
