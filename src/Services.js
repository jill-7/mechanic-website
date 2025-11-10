import React from 'react';
import './Services.css';

function Services() {
  return (
    <div className="services-page">
      {/* Hero */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1>Our Services</h1>
          <p>Comprehensive automotive solutions for every situation</p>
        </div>
      </section>

      {/* Main Services */}
      <section className="main-services">
        <div className="container">
          <div className="service-category" id='car-repair'>
            <div className="service-info" >
              <h2 >Car Repair Services</h2>
              <p>Professional automotive repair and maintenance services delivered to your location or at our partner garages.</p>
              <ul>
                <li>Engine Diagnostics & Repair</li>
                <li>Battery Replacement</li>
                <li>Tire Change & Repair</li>
                <li>Oil Change & Maintenance</li>
                <li>Brake System Services</li>
                <li>Electrical System Repair</li>
              </ul>
            </div>
            <div className="service-visual">
              <div className="visual-placeholder">🚗</div>
            </div>
          </div>

          <div className="service-category reverse" id='towing'>
            <div className="service-info">
              <h2>Towing Services</h2>
              <p>Reliable vehicle towing for emergencies, accidents, and transportation needs.</p>
              <ul>
                <li>Light Vehicle Towing</li>
                <li>Heavy Duty Towing</li>
                <li>Emergency Recovery</li>
                <li>Accident Scene Support</li>
                <li>Long Distance Towing</li>
              </ul>
            </div>
            <div className="service-visual">
              <div className="visual-placeholder">🚛</div>
            </div>
          </div>

          <div className="service-category" id='heavy-machinery'>
            <div className="service-info">
              <h2>Heavy Machinery Lifting</h2>
              <p>Specialized equipment lifting and transportation services for industrial and commercial needs.</p>
              <ul>
                <li>Construction Equipment</li>
                <li>Industrial Machinery</li>
                <li>Agricultural Equipment</li>
                <li>Specialized Transport</li>
              </ul>
            </div>
            <div className="service-visual">
              <div className="visual-placeholder">🏗</div>
            </div>
          </div>

          <div className="service-category reverse" id='emergency'>
            <div className="service-info">
              <h2>Emergency Roadside Assistance</h2>
              <p>Immediate help when you're stranded on the road.</p>
              <ul>
                <li>Jump Starts</li>
                <li>Flat Tire Assistance</li>
                <li>Fuel Delivery</li>
                <li>Lockout Service</li>
                <li>Minor Mechanical Fixes</li>
              </ul>
            </div>
            <div className="service-visual">
              <div className="visual-placeholder">🆘</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="features-highlight">
        <div className="container">
          <h2>Why Choose Our Services?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Real-time GPS Tracking</h3>
              <p>Track your service provider's arrival in real-time</p>
            </div>
            <div className="feature-card">
              <h3>Instant Pricing</h3>
              <p>Know the cost before you confirm your service</p>
            </div>
            <div className="feature-card">
              <h3>Secure Payments</h3>
              <p>Pay via mobile money, card, or wallet securely</p>
            </div>
            <div className="feature-card">
              <h3>Verified Professionals</h3>
              <p>All providers are certified and background-checked</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA  */}
      <section className="services-cta">
        <div className="container">
          <h2>Need Help Right Now?</h2>
          <p>Download our app and get assistance in minutes</p>
          <button className="download">Download the App</button>
        </div>
      </section>
    </div>
  );
}

export default Services;