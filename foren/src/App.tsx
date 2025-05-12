import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalibrationPage from './pages/CalibrationPage';
import CaseDetailPage from './pages/CaseDetailPage';
import CaseListPage from './pages/CaseListPage';
import ChainOfCustodyPage from './pages/ChainOfCustodyPage';
import CourtStatementsPage from './pages/CourtStatementsPage';
import CrimeScenePage from './pages/CrimeScenePage';
import DashboardPage from './pages/DashboardPage';
import EvidencePage from './pages/EvidencePage';
import Footwear3DViewer from './pages/Footwear3DViewer';
import FootwearAnalysisPage from './pages/FootwearAnalysisPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EmailLoginForm from './pages/EmailLoginForm';
import MessageAnalysisPage from './pages/MessageAnalysisPage';
import PredictiveMapPage from './pages/PredictiveMapPage';
import SettingsPage from './pages/SettingsPage';
import SuspectProfilerPage from './pages/SuspectProfilerPage';
import TamperAlertsPage from './pages/TamperAlertsPage';
import TamperingReportPage from './pages/TamperingReportPage';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import Features from './pages/Features';
import About from './pages/About';
import Docs from './pages/Docs';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ui/use-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Header />
          <Routes>
            <Route path="/calibration" element={<CalibrationPage />} />
            <Route path="/case-detail" element={<CaseDetailPage />} />
            <Route path="/case-list" element={<CaseListPage />} />
            <Route path="/chain-of-custody" element={<ChainOfCustodyPage />} />
            <Route path="/court-statements" element={<CourtStatementsPage />} />
            <Route path="/crime-scene" element={<CrimeScenePage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
            <Route path="/evidence" element={<ProtectedRoute element={<EvidencePage />} />} />
            <Route path="/footwear-3d" element={<ProtectedRoute element={<Footwear3DViewer />} />} />
            <Route path="/footwear-analysis" element={<ProtectedRoute element={<FootwearAnalysisPage />} />} />
            <Route path="/message-analysis" element={<ProtectedRoute element={<MessageAnalysisPage />} />} />
            <Route path="/predictive-map" element={<ProtectedRoute element={<PredictiveMapPage />} />} />
            <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
            <Route path="/suspect-profiler" element={<ProtectedRoute element={<SuspectProfilerPage />} />} />
            <Route path="/tamper-alerts" element={<ProtectedRoute element={<TamperAlertsPage />} />} />
            <Route path="/tampering-report" element={<ProtectedRoute element={<TamperingReportPage />} />} />
            <Route path="/user-profile" element={<ProtectedRoute element={<UserProfilePage />} />} />

            {/* Unprotected Routes */}
            <Route path="/auth" element={<EmailLoginForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
          <Footer />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
