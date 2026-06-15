import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

// Import Pages
import LandingPage from './pages/LandingPage';
import PatientFormPage from './pages/PatientFormPage';
import SuccessPage from './pages/SuccessPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RequestDetailsPage from './pages/RequestDetailsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            {/* Public Patient Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/request-support" element={<PatientFormPage />} />
            <Route path="/request-success" element={<SuccessPage />} />

            {/* Volunteer Authentication */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Volunteer Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/requests/:id"
              element={
                <ProtectedRoute>
                  <RequestDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
