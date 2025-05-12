import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="page-title">About Foren</h1>
      <p className="about-text">
        Foren is a cutting-edge forensic science tool, utilizing AI and blockchain technology to enhance forensic analysis.
        Our mission is to provide forensic experts with advanced tools that improve the accuracy, speed, and efficiency of crime scene investigations.
      </p>
      <h2 className="section-title">Mission</h2>
      <p className="section-description">
        Our mission is to revolutionize the forensic science industry by integrating artificial intelligence and blockchain into the forensic process, ensuring transparency, security, and precision in every aspect of forensic work.
      </p>
      <h2 className="section-title">Vision</h2>
      <p className="section-description">
        To become the leading platform for digital and physical forensic analysis, empowering law enforcement agencies and forensic scientists worldwide with next-generation tools and technologies.
      </p>
    </div>
  );
};

export default About;
