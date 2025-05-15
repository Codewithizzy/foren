import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CaseDetailPage from './pages/CaseDetailPage';
import Cases from './pages/CasesPage';
import ChainOfCustodyPage from './pages/ChainOfCustodyPage';
import CourtStatementsPage from './pages/CourtStatementsPage';
import CrimeScenePage from './pages/CrimeScenePage';
import DashboardPage from './pages/DashboardPage';
import EvidencePage from './pages/EvidencePage';
import EvidenceDetailsPage from './pages/EvidenceDetailPage';
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
import { CaseProvider } from './context/CaseContext';
import About from './pages/About';
import Docs from './pages/Docs';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ui/use-toast';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutWithDrawer from './components/LayoutWithDrawer';
import PublicLayout from './components/PublicLayout';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <CaseProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes with Header & Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/auth" element={<EmailLoginForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* Secured Routes */}
            <Route path="/dashboard" element={<LayoutWithDrawer><DashboardPage /></LayoutWithDrawer>} />
            <Route path="/cases" element={<LayoutWithDrawer><Cases /></LayoutWithDrawer>} />
            <Route path="/cases/:id" element={<LayoutWithDrawer><CaseDetailPage /></LayoutWithDrawer>} />
            <Route path="/chain-of-custody" element={<LayoutWithDrawer><ChainOfCustodyPage /></LayoutWithDrawer>} />
            <Route path="/court-statements" element={<LayoutWithDrawer><CourtStatementsPage /></LayoutWithDrawer>} />
            <Route path="/crime-scene" element={<LayoutWithDrawer><CrimeScenePage /></LayoutWithDrawer>} />
            <Route path="/evidence" element={<LayoutWithDrawer><EvidencePage /></LayoutWithDrawer>} />
            <Route path="/evidence-details/:evidenceId" element={<EvidenceDetailsPage />} />
            <Route path="/footwear-3d" element={<ProtectedRoute element={<LayoutWithDrawer><Footwear3DViewer /></LayoutWithDrawer>} />} />
            <Route path="/footwear-analysis" element={<ProtectedRoute element={<LayoutWithDrawer><FootwearAnalysisPage /></LayoutWithDrawer>} />} />
            <Route path="/message-analysis" element={<ProtectedRoute element={<LayoutWithDrawer><MessageAnalysisPage /></LayoutWithDrawer>} />} />
            <Route path="/predictive-map" element={<ProtectedRoute element={<LayoutWithDrawer><PredictiveMapPage /></LayoutWithDrawer>} />} />
            <Route path="/settings" element={<ProtectedRoute element={<LayoutWithDrawer><SettingsPage /></LayoutWithDrawer>} />} />
            <Route path="/suspect-profiler" element={<ProtectedRoute element={<LayoutWithDrawer><SuspectProfilerPage /></LayoutWithDrawer>} />} />
            <Route path="/tamper-alerts" element={<ProtectedRoute element={<LayoutWithDrawer><TamperAlertsPage /></LayoutWithDrawer>} />} />
            <Route path="/tampering-report" element={<ProtectedRoute element={<LayoutWithDrawer><TamperingReportPage /></LayoutWithDrawer>} />} />
            <Route path="/user-profile" element={<ProtectedRoute element={<LayoutWithDrawer><UserProfilePage /></LayoutWithDrawer>} />} />

            {/* Fallback */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </ToastProvider>
        </CaseProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
