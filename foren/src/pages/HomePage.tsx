import React from 'react';
import { Link } from 'react-router-dom';
import ForensicLogo from '../components/ForensicLogo';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <main className="home-main">
        <div className="home-hero">
          <div className="logo-container">
            <ForensicLogo />
          </div>
          <h1 className="home-title">Welcome to <span className="highlight">Foren</span></h1>
          <p className="home-subtitle">
            A next-generation forensic analysis platform. Navigate through real-time case timelines, 
            manage digital and physical evidence, run predictive crime mapping, and generate 
            court-ready statements—all in one place.
          </p>
        </div>

        <div className="feature-grid">
          <Link to="/dashboard" className="feature-card">
            <div className="card-content">
              <h3>Dashboard</h3>
              <p>Overview of recent cases and activity.</p>
            </div>
            <div className="card-icon">📊</div>
          </Link>

          <Link to="/case-list" className="feature-card">
            <div className="card-content">
              <h3>Case List</h3>
              <p>Browse and manage forensic cases.</p>
            </div>
            <div className="card-icon">📋</div>
          </Link>

          <Link to="/evidence" className="feature-card">
            <div className="card-content">
              <h3>Evidence</h3>
              <p>View and analyze collected evidence.</p>
            </div>
            <div className="card-icon">🔍</div>
          </Link>

          <Link to="/crime-scene" className="feature-card">
            <div className="card-content">
              <h3>Crime Scene</h3>
              <p>Upload and reconstruct scenes visually.</p>
            </div>
            <div className="card-icon">🖼️</div>
          </Link>

          <Link to="/court-statements" className="feature-card">
            <div className="card-content">
              <h3>Court Statements</h3>
              <p>Generate and manage legal reports.</p>
            </div>
            <div className="card-icon">⚖️</div>
          </Link>

        
          <Link to="/case-detail" className="feature-card">
            <div className="card-content">
              <h3>Case Data</h3>
              <p>Explore structured data across investigations.</p>
            </div>
            <div className="card-icon">📁</div>
          </Link>

          <Link to="/chain-of-custody" className="feature-card">
            <div className="card-content">
              <h3>Chain of Custody</h3>
              <p>Track evidence from collection to court.</p>
            </div>
            <div className="card-icon">🔗</div>
          </Link>

          <Link to="/footwear" className="feature-card">
            <div className="card-content">
              <h3>Footwear</h3>
              <p>Identify and match shoeprint evidence.</p>
            </div>
            <div className="card-icon">👣</div>
          </Link>

          <Link to="/cross-platform" className="feature-card">
            <div className="card-content">
              <h3>Cross-Platform</h3>
              <p>Integrate data from multiple systems.</p>
            </div>
            <div className="card-icon">🌐</div>
          </Link>

          <Link to="/message-analysis" className="feature-card">
            <div className="card-content">
              <h3>Message Analysis</h3>
              <p>Analyze texts, chats, and communications.</p>
            </div>
            <div className="card-icon">💬</div>
          </Link>

          <Link to="/auth" className="feature-card">
            <div className="card-content">
              <h3>Login</h3>
              <p>Access secure tools and features.</p>
            </div>
            <div className="card-icon">🔐</div>
          </Link>

      
        </div>
      </main>
    </div>
  );
};

export default HomePage;
