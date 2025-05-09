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
import AuthPage from './pages/AuthPage';
import MessageAnalysisPage from './pages/MessageAnalysisPage';
import PredictiveMapPage from './pages/PredictiveMapPage';
import SettingsPage from './pages/SettingsPage';
import SuspectProfilerPage from './pages/SuspectProfilerPage';
import TamperAlertsPage from './pages/TamperAlertsPage';
import TamperingReportPage from './pages/TamperingReportPage';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Header component is now added here */}
        <Header />

        <Routes>
          <Route path="/calibration" element={<CalibrationPage />} />
          <Route path="/case-detail" element={<CaseDetailPage />} />
          <Route path="/case-list" element={<CaseListPage />} />
          <Route path="/chain-of-custody" element={<ChainOfCustodyPage />} />
          <Route path="/court-statements" element={<CourtStatementsPage />} />
          <Route path="/crime-scene" element={<CrimeScenePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/footwear-3d" element={<Footwear3DViewer />} />
          <Route path="/footwear-analysis" element={<FootwearAnalysisPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/message-analysis" element={<MessageAnalysisPage />} />
          <Route path="/predictive-map" element={<PredictiveMapPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/suspect-profiler" element={<SuspectProfilerPage />} />
          <Route path="/tamper-alerts" element={<TamperAlertsPage />} />
          <Route path="/tampering-report" element={<TamperingReportPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>

        {/* Footer should be inside Router */}
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
