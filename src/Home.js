import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Mechanic on Call. Rescue in Minutes.</h1>
          <p>Connect with verified mechanics, towing, and heavy lifting experts anytime, anywhere.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Request a Mechanic Now</button>
            <button className="btn-secondary">Become a Provider</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="app-screen">
              {/* This will show app preview */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3>Roadside Assistance</h3>
            <p>Quick fixes when you're stranded on the road</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🚗</div>
            <h3>Car Repair</h3>
            <p>Professional mechanics for all your car needs</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🚛</div>
            <h3>Car Towing</h3>
            <p>Reliable towing services for any vehicle</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏗</div>
            <h3>Machinery Lifting</h3>
            <p>Heavy equipment lifting and transport</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Request</h3>
            <p>Describe your issue and share your location</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Match</h3>
            <p>Get connected to a nearby verified expert</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Rescue</h3>
            <p>Track their arrival and get help on-site</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Help is in Your Pocket</h2>
          <p>Download the app now for instant service</p>
          <div className="app-buttons">
            <button className="app-store-btn">App Store</button>
            <button className="google-play-btn">Google Play</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;