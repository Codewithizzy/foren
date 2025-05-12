import React from 'react';
import './Docs.css';

const Docs: React.FC = () => {
  return (
    <div className="docs-container">
      <h1 className="page-title">Foren Documentation</h1>
      
      <section className="section">
        <h2 className="section-title">Getting Started</h2>
        <p className="section-description">
          Follow the steps below to set up Foren and start using it for forensic analysis. 
        </p>
        <ul className="steps">
          <li>Step 1: Install Foren on your device (Mobile, Tablet, or PC)</li>
          <li>Step 2: Set up your environment</li>
          <li>Step 3: Begin analyzing forensic data using our powerful tools</li>
        </ul>
      </section>
      
      <section className="section">
        <h2 className="section-title">Device Compatibility</h2>
        <p className="section-description">
          Foren is optimized for different devices, including mobile phones, tablets, and PCs. Below are the device-specific recommendations for optimal performance:
        </p>
        <div className="device-guide">
          <div className="device-section">
            <h3 className="device-title">Mobile Devices</h3>
            <p className="device-description">
              On mobile devices, Foren offers a streamlined interface with touch gestures. You can easily analyze crime scene data and manage evidence with a mobile-optimized interface.
            </p>
            <ul className="device-steps">
              <li>Ensure your mobile device has at least 4GB of RAM.</li>
              <li>Use a stable internet connection for seamless data uploads.</li>
              <li>Use Foren’s mobile camera integration for on-site evidence capture.</li>
            </ul>
          </div>
          <div className="device-section">
            <h3 className="device-title">Tablets</h3>
            <p className="device-description">
              Tablets offer a larger screen for more detailed forensic analysis. Foren on tablets allows for easier navigation through crime scene data and evidence management.
            </p>
            <ul className="device-steps">
              <li>For best performance, use tablets with 8GB of RAM or higher.</li>
              <li>Enable landscape mode for a broader view of analysis tools.</li>
            </ul>
          </div>
          <div className="device-section">
            <h3 className="device-title">PCs</h3>
            <p className="device-description">
              Foren on PCs provides the most robust and detailed analysis tools, ideal for heavy-duty forensic investigations with multi-window support and extensive reporting.
            </p>
            <ul className="device-steps">
              <li>Ensure your PC meets the recommended system requirements.</li>
              <li>Utilize the desktop version for full functionality and faster data processing.</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="section">
        <h2 className="section-title">Features Overview</h2>
        <p className="section-description">
          The following key features of Foren are available across all devices:
        </p>
        <ul className="features-list">
          <li>Footwear Analysis</li>
          <li>Crime Scene Analysis</li>
          <li>Message Analysis</li>
          <li>Chain of Custody Management</li>
          <li>Evidence Management</li>
        </ul>
      </section>
      
      <section className="section">
        <h2 className="section-title">API Reference</h2>
        <p className="section-description">
          Foren provides a set of RESTful APIs for integration. Below are some commonly used endpoints:
        </p>
        <div className="api-reference">
          <div className="api-endpoint">
            <h3 className="endpoint-title">POST /api/analyze</h3>
            <p className="endpoint-description">
              Use this endpoint to submit evidence data for analysis. Foren will process the data and return results in a structured format.
            </p>
          </div>
          <div className="api-endpoint">
            <h3 className="endpoint-title">GET /api/evidence</h3>
            <p className="endpoint-description">
              Fetch evidence stored on the blockchain. This is useful for tracking and retrieving historical data.
            </p>
          </div>
          <div className="api-endpoint">
            <h3 className="endpoint-title">POST /api/upload</h3>
            <p className="endpoint-description">
              Upload forensic evidence to Foren's decentralized storage solution using this endpoint.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Docs;
