import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-main">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <img src="/mech-logo.jpg" alt="Mechanic On Call" className="footer-logo"/>
            <p className="footer-description">
              Your trusted partner for emergency roadside assistance, car repairs, and towing services across Kenya.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/share/1FDhMh2LtP/" rel='noreferrer' aria-label="Facebook"><FaFacebook className="icon" /></a>
            <a href="https://www.instagram.com/kchomes_tours_and_travel?igsh=MXJpcGtnM2s5ejNzNQ==" rel='noreferrer' target='_blank' aria-label="Instagram"><FaInstagram className="icon" /></a>
            <a href="https://x.com/KcHomesTours?t=BVpLITcxJd0ykpYwDQATEQ&s=09" rel='noreferrer' aria-label="Twitter"><FaTwitter className="icon" /></a>
            <a href="https://chat.whatsapp.com/F8d3eQoHBOzHXZfVXOErPY?mode=r_t" rel='noreferrer' target="_blank" aria-label="WhatsApp"><FaWhatsapp className="icon" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/providers">Become a Provider</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links">
            <h3 className="footer-heading">Our Services</h3>
            <ul className="footer-list">
              <li><a href="#">Roadside Assistance</a></li>
              <li><a href="#">Car Repair</a></li>
              <li><a href="#">Car Towing</a></li>
              <li><a href="#">Heavy Machinery</a></li>
              <li><a href="#">Emergency Help</a></li>
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
}

export default Footer