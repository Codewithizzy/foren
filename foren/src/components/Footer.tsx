import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Make sure to create Footer.css if not already

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© 2025 <span className="footer-brand">Foren</span>. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/terms">Terms of Use</Link>
        <span>|</span>
        <Link to="/privacy">Privacy Policy</Link>
        <span>|</span>
        <a href="mailto:support@foren.ai">Contact Support</a>
      </div>
    </footer>
  );
};

export default Footer;
