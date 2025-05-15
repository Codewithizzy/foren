import React from 'react';
import './SideDrawer.css';

// Import Material Icons or any other icon library
import { FaTachometerAlt, FaGavel, FaFolder, FaChartBar, FaCogs, FaTools, FaSignOutAlt, FaHospital, FaEnvelope } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirect

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void; // This is for the logout logic
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, onLogout }) => {
  const navigate = useNavigate(); // Initialize the navigation function

  const handleLogout = () => {
    // Perform any logout logic (e.g., clearing authentication tokens)
    onLogout(); // You can still keep this in case there's other logout handling in the parent component
    
    // Redirect to the homepage after logout
    navigate('/'); // Navigate to the homepage (or the path you want)
  };

  return (
    <div className={`sideDrawer ${isOpen ? 'open' : 'closed'}`}>
      <div className="logo">
        Foren
        <button className="closeButton" onClick={onClose}>✕</button>
      </div>
      <nav className="navMenu">
        <a href="/dashboard"><FaTachometerAlt /> Dashboard</a>
        <a href="/cases"><FaGavel /> Cases</a>
        <a href="/evidence"><FaFolder /> Evidence</a>
        <a href="#"><FaChartBar /> Analysis</a>
        <a href="/court-statements"><FaHospital /> Court Statements</a>
        <a href="#"><FaFolder /> Chain of Custody</a>
        <a href="#"><FaTools /> Crime Scene Tools</a>
        <a href="#"><FaEnvelope /> Message Analysis</a>

        {/* Moving Settings and Logout to the bottom */}
        <div className="bottomNav">
          <a href="#"><FaCogs /> Settings</a>
          <button onClick={handleLogout} className="logoutButton"><FaSignOutAlt /> Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default SideDrawer;
