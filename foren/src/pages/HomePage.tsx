import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ForensicLogo from '../components/ForensicLogo';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleExploreDashboardClick = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="home-container">
      <main className="home-main">

        {/* Hero Section */}
        <div className="home-hero">
          <div className="logo-container">
            <ForensicLogo />
          </div>
          <h1 className="home-title">
            Revolutionize Forensic Science with <span className="highlight">Foren</span>
          </h1>
          <p className="home-subtitle">
            From crime scene analysis to blockchain-secured custody tracking — manage cases, evidence, and court reports
            with AI-enhanced precision.
          </p>
          <div className="cta-buttons">
            <Link to="/auth" className="cta-button">Get Started Free</Link>
            <button onClick={handleExploreDashboardClick} className="cta-secondary">Explore Dashboard</button>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="feature-section">
          <h2 className="feature-heading">Core Capabilities</h2>
          <div className="feature-grid">

            {[
              { to: '/dashboard', title: 'Dashboard', desc: 'Overview of recent cases and activity.', icon: '📊' },
              { to: '/case-list', title: 'Case List', desc: 'Browse and manage forensic cases.', icon: '📋' },
              { to: '/evidence', title: 'Evidence', desc: 'View and analyze collected evidence.', icon: '🔍' },
              { to: '/crime-scene', title: 'Crime Scene', desc: 'Upload and reconstruct scenes visually.', icon: '🖼️' },
              { to: '/court-statements', title: 'Court Statements', desc: 'Generate and manage legal reports.', icon: '⚖️' },
              { to: '/case-detail', title: 'Case Data', desc: 'Explore structured data across investigations.', icon: '📁' },
              { to: '/chain-of-custody', title: 'Chain of Custody', desc: 'Track evidence from collection to court.', icon: '🔗' },
              { to: '/footwear', title: 'Footwear', desc: 'Identify and match shoeprint evidence.', icon: '👣' },
              { to: '/cross-platform', title: 'Cross-Platform', desc: 'Integrate data from multiple systems.', icon: '🌐' },
              { to: '/message-analysis', title: 'Message Analysis', desc: 'Analyze texts, chats, and communications.', icon: '💬' },
            ].map((feature, i) => (
              <Link to={feature.to} className="feature-card" key={i}>
                <div className="card-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
                <div className="card-icon">{feature.icon}</div>
              </Link>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
};

export default HomePage;
