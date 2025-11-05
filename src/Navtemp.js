import React, { useState } from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navtemp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <img src="/mech-logo.jpg" alt="mech-logo" className="logo-image"/>
        
        <div className="nav-links">
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/services'>Services</Link>
          <Link to='/providers'>For Providers</Link>
          <Link to='/contacts'>Contacts</Link>
        </div>
        
        <div className="nav-actions">
          <button className="btn-secondary">Download App</button>
          <button className="btn-primary">Become a Provider</button>
        </div>

        <div className="hamburger" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${sidebarOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <img src="/mech-logo.jpg" alt="mech-logo" className="logo-image"/>
          <div className="hamburger active" onClick={toggleSidebar}>
            <span style={{transform: 'rotate(45deg) translate(5px, 5px)'}}></span>
            <span style={{opacity: 0}}></span>
            <span style={{transform: 'rotate(-45deg) translate(7px, -6px)'}}></span>
          </div>
        </div>
        
        <div className="sidebar-links">
          <Link to='/' onClick={closeSidebar}>Home</Link>
          <Link to='/about' onClick={closeSidebar}>About</Link>
          <Link to='/services' onClick={closeSidebar}>Services</Link>
          <Link to='/providers' onClick={closeSidebar}>For Providers</Link>
          <Link to='/contacts' onClick={closeSidebar}>Contacts</Link>
        </div>
        
        <div className="sidebar-actions">
          <button className="btn-secondary" onClick={closeSidebar}>Download App</button>
          <button className="btn-primary" onClick={closeSidebar}>Become a Provider</button>
        </div>
      </div>

      {/* Overlay */}
      <div className={`overlay ${sidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
    </>
  );
}

export default Navtemp;