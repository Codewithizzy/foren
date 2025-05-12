import React from 'react';
import './Features.css';

const Features: React.FC = () => {
  return (
    <div className="features-container">
      <h1 className="page-title">Features</h1>
      <div className="feature">
        <h2 className="feature-title">Footwear Analysis</h2>
        <p className="feature-description">
          Foren provides advanced footwear analysis to help forensic scientists analyze footwear impressions found at crime scenes.
        </p>
      </div>
      <div className="feature">
        <h2 className="feature-title">Crime Scene Analysis</h2>
        <p className="feature-description">
          Automatically process crime scene images and data, generating detailed reports and aiding investigators with analysis.
        </p>
      </div>
      <div className="feature">
        <h2 className="feature-title">Message Analysis</h2>
        <p className="feature-description">
          Foren’s message analysis tools allow forensic experts to extract, analyze, and report digital messages for evidence collection.
        </p>
      </div>
      <div className="feature">
        <h2 className="feature-title">Chain of Custody Management</h2>
        <p className="feature-description">
          Maintain an unbroken chain of custody with blockchain-backed verification, ensuring integrity in all forensic processes.
        </p>
      </div>
      <div className="feature">
        <h2 className="feature-title">Evidence Management</h2>
        <p className="feature-description">
          Securely manage evidence through an easy-to-use interface, with full tracking and verification.
        </p>
      </div>
    </div>
  );
};

export default Features;
