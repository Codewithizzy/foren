import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';
import EvidenceList from './pages/evidence/EvidenceList';
import EvidenceDetail from './pages/evidence/EvidenceDetail';
import FootwearAnalysis from './pages/analysis/FootwearAnalysis';
import MessageAnalysis from './pages/analysis/MessageAnalysis';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard\" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            <Route path="evidence">
              <Route index element={<EvidenceList />} />
              <Route path=":id" element={<EvidenceDetail />} />
            </Route>
            
            <Route path="analysis">
              <Route path="footwear" element={<FootwearAnalysis />} />
              <Route path="message" element={<MessageAnalysis />} />
              <Route path="scene" element={<div className="p-6">Scene Analysis Coming Soon</div>} />
            </Route>
            
            <Route path="cases" element={<div className="p-6">Cases Management Coming Soon</div>} />
            <Route path="custody" element={<div className="p-6">Chain of Custody Coming Soon</div>} />
            <Route path="search" element={<div className="p-6">Search Coming Soon</div>} />
            <Route path="security" element={<div className="p-6">Security Settings Coming Soon</div>} />
            <Route path="settings" element={<div className="p-6">Settings Coming Soon</div>} />
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard\" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;