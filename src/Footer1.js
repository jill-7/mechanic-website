import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer */}
        <div className="footer-main">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <img src="/mech-logo.jpg" alt="Mechanic On Call" className="footer-logo"/>
            <p className="footer-description">
              Your trusted partner for emergency roadside assistance, car repairs, and towing services across Kenya.
            </p>
            <div className="footer-social">
            <a href="https://web.facebook.com/profile.php?id=61583263268404" rel='noreferrer' aria-label="Facebook"><FaFacebook className="icon" /></a>
            <a href="https://www.instagram.com/kchomes_tours_and_travel?igsh=MXJpcGtnM2s5ejNzNQ==" rel='noreferrer' target='_blank' aria-label="Instagram"><FaInstagram className="icon" /></a>
            <a href="https://x.com/KcHomesTours?t=BVpLITcxJd0ykpYwDQATEQ&s=09" rel='noreferrer' aria-label="Twitter"><FaTwitter className="icon" /></a>
            <a href="https://x.com/KcHomesTours?t=BVpLITcxJd0ykpYwDQATEQ&s=09" rel='noreferrer' aria-label="Whatsapp"><FaWhatsapp className="icon" /></a>
            
            
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/services">Services</Link>
              <Link to="/providers">Become a Provider</Link>
              <Link to="/contacts">Contact</Link>
            </ul> 
          </div>

          {/* Services */}
          <div className="footer-links">
            <h3 className="footer-heading">Our Services</h3>
            <ul className="footer-list">
              <li><a href="services#emergency">Roadside Assistance</a></li>
              <li><a href="services#car-repair">Car Repair</a></li>
              <li><a href="services#towing">Car Towing</a></li>
              <li><a href="services#heavy-machinery">Heavy Machinery</a></li>
              <li><a href="services#emergency">Emergency Help</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3 className="footer-heading">Contact Info</h3>
            <div className="contact-item">
              <span className="contact-icon"><a href="https://www.envelope.com/share/1FDhMh2LtP/" rel='noreferrer' aria-label="Envelope"><FaEnvelope className="icon" /></a></span>
              <span>support@mechaniconcall.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon"><a href="https://www.phone.com/share/1FDhMh2LtP/" rel='noreferrer' aria-label="Phone"><FaPhone className="icon" /></a></span>
              <span>+254 700 000 000</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Nairobi, Kenya</span>
            </div>
            
            {/* App Download Buttons */}
            <div className="footer-apps">
              <button className="app-download-btn">
                <span className="app-icon">📱</span>
                <div className="app-text">
                  <span className="app-get">Get it on</span>
                  <span className="app-store">Google Play</span>
                </div>
              </button>
              <button className="app-download-btn">
                <span className="app-icon">📱</span>
                <div className="app-text">
                  <span className="app-get">Download on</span>
                  <span className="app-store">App Store</span>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              © 2025 Mechanic On Call. All rights reserved.
            </div>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;