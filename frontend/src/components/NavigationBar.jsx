import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md'; // Dashboard icon
import { IoDocumentText, IoSettings } from 'react-icons/io5'; // Reports and Settings icons
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <nav className="glass-nav">
      <div className="nav-header">
        <h2 className="text-gradient">AX</h2> {/* Shortened name for icon-centric design */}
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} title="Dashboard">
            <MdDashboard className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} title="Reports">
            <IoDocumentText className="nav-icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} title="Settings">
            <IoSettings className="nav-icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
