import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ForensicTheme } from './theme';
import { AuthProvider, RequireAuth } from './components/auth';
import { MainLayout } from './components/layout/MainLayout';

// Authentication Pages
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// Main Application Pages
import { DashboardPage } from './pages/DashboardPage';
import { CaseListPage } from './pages/CaseListPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { FootwearAnalysisPage } from './pages/FootwearAnalysisPage';
import { Footwear3DViewer } from './pages/Footwear3DViewer';
import { CrimeScenePage } from './pages/CrimeScenePage';
import { MessageAnalysisPage } from './pages/MessageAnalysisPage';
import { ChainOfCustodyPage } from './pages/ChainOfCustodyPage';
import { EvidencePage } from './pages/EvidencePage';
import { CourtStatementsPage } from './pages/CourtStatementsPage';
import { PredictiveMapPage } from './pages/PredictiveMapPage';
import { SuspectProfilerPage } from './pages/SuspectProfilerPage';
import { TamperAlertsPage } from './pages/TamperAlertsPage';
import { TamperingReportPage } from './pages/TamperingReportPage';
import { CrossPlatformPage } from './pages/CrossPlatformPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { CalibrationPage } from './pages/CalibrationPage';

function App() {
  return (
    <ThemeProvider theme={ForensicTheme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected Routes */}
            <Route element={<MainLayout />}>
              <Route index element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              } />
              
              <Route path="/cases" element={
                <RequireAuth>
                  <CaseListPage />
                </RequireAuth>
              } />
              
              <Route path="/cases/:caseId" element={
                <RequireAuth>
                  <CaseDetailPage />
                </RequireAuth>
              } />
              
              <Route path="/footwear" element={
                <RequireAuth>
                  <FootwearAnalysisPage />
                </RequireAuth>
              } />
              
              <Route path="/footwear/3d" element={
                <RequireAuth>
                  <Footwear3DViewer />
                </RequireAuth>
              } />
              
              <Route path="/crime-scene" element={
                <RequireAuth>
                  <CrimeScenePage />
                </RequireAuth>
              } />
              
              <Route path="/messages" element={
                <RequireAuth>
                  <MessageAnalysisPage />
                </RequireAuth>
              } />
              
              <Route path="/chain-of-custody" element={
                <RequireAuth>
                  <ChainOfCustodyPage />
                </RequireAuth>
              } />
              
              <Route path="/evidence" element={
                <RequireAuth>
                  <EvidencePage />
                </RequireAuth>
              } />
              
              <Route path="/court-statements" element={
                <RequireAuth>
                  <CourtStatementsPage />
                </RequireAuth>
              } />
              
              <Route path="/predictive-map" element={
                <RequireAuth>
                  <PredictiveMapPage />
                </RequireAuth>
              } />
              
              <Route path="/suspects" element={
                <RequireAuth>
                  <SuspectProfilerPage />
                </RequireAuth>
              } />
              
              <Route path="/tamper-alerts" element={
                <RequireAuth>
                  <TamperAlertsPage />
                </RequireAuth>
              } />
              
              <Route path="/tampering-report" element={
                <RequireAuth>
                  <TamperingReportPage />
                </RequireAuth>
              } />
              
              <Route path="/cross-platform" element={
                <RequireAuth>
                  <CrossPlatformPage />
                </RequireAuth>
              } />
              
              <Route path="/profile" element={
                <RequireAuth>
                  <UserProfilePage />
                </RequireAuth>
              } />
              
              <Route path="/settings" element={
                <RequireAuth>
                  <SettingsPage />
                </RequireAuth>
              } />
              
              <Route path="/calibration" element={
                <RequireAuth>
                  <CalibrationPage />
                </RequireAuth>
              } />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;