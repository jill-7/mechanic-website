import React from 'react';
import './Providers.css';
import { Link } from 'react-router-dom';

function Providers() {
  return (
    <div className="providers-page">
      {/* Animated Hero Section */}
      <section className="providers-hero-section">
        <div className="providers-hero-background">
          <div className="providers-floating-tools">
            <div className="providers-tool providers-wrench">🔧</div>
            <div className="providers-tool providers-screwdriver">🪛</div>
            <div className="providers-tool providers-car">🚗</div>
            <div className="providers-tool providers-tow-truck">🚛</div>
          </div>
        </div>
        <div className="providers-hero-content">
          <h1 className="providers-hero-title">
            <span className="providers-title-line">Join Our</span>
            <span className="providers-title-line providers-title-accent">Professional Team</span>
          </h1>
          <p className="providers-hero-subtitle">Turn your skills into steady income with Kenya's fastest-growing automotive network</p>
          <Link to="/apply" className="providers-cta-pulse">Start Earning Today →</Link>
        </div>
        <div className="providers-scroll-indicator">
          <div className="providers-mouse">
            <div className="providers-wheel"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="providers-stats-section">
        <div className="providers-container">
          <div className="providers-stats-grid">
            <div className="providers-stat-card">
              <div className="providers-stat-number" data-target="500">0</div>
              <div className="providers-stat-label">Active Providers</div>
            </div>
            <div className="providers-stat-card">
              <div className="providers-stat-number" data-target="15000">0</div>
              <div className="providers-stat-label">Jobs Completed</div>
            </div>
            <div className="providers-stat-card">
              <div className="providers-stat-number" data-target="4.8">0</div>
              <div className="providers-stat-label">Avg Rating</div>
            </div>
            <div className="providers-stat-card">
              <div className="providers-stat-number" data-target="95">0</div>
              <div className="providers-stat-label">% Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Gallery */}
      <section className="providers-benefits-section">
        <div className="providers-container">
          <h2 className="providers-section-title">Why Top Mechanics Choose Us</h2>
          <div className="providers-benefits-grid">
            <div className="providers-benefit-card">
              <div className="providers-benefit-icon">💼</div>
              <h3>Steady Job Flow</h3>
              <p>Never worry about finding clients again. Consistent work in your area.</p>
            </div>
            <div className="providers-benefit-card">
              <div className="providers-benefit-icon">💳</div>
              <h3>Instant Payments</h3>
              <p>Get paid directly to your wallet after each completed job.</p>
            </div>
            <div className="providers-benefit-card">
              <div className="providers-benefit-icon">🗺</div>
              <h3>Smart Navigation</h3>
              <p>Built-in GPS with real-time traffic and optimal routes.</p>
            </div>
            <div className="providers-benefit-card">
              <div className="providers-benefit-icon">🛡</div>
              <h3>Full Support</h3>
              <p>24/7 customer support and job dispute resolution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline */}
      <section className="providers-timeline-section">
        <div className="providers-container">
          <h2 className="providers-section-title">Start Earning in 3 Simple Steps</h2>
          <div className="providers-timeline">
            <div className="providers-timeline-item">
              <div className="providers-timeline-number">01</div>
              <div className="providers-timeline-content">
                <h3>Apply & Verify</h3>
                <p>Submit your documents and get verified within 24 hours</p>
              </div>
            </div>
            <div className="providers-timeline-item">
              <div className="providers-timeline-number">02</div>
              <div className="providers-timeline-content">
                <h3>Get Jobs</h3>
                <p>Receive nearby job alerts based on your skills and location</p>
              </div>
            </div>
            <div className="providers-timeline-item">
              <div className="providers-timeline-number">03</div>
              <div className="providers-timeline-content">
                <h3>Earn & Grow</h3>
                <p>Build your reputation and unlock premium job opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="providers-cta-section">
        <div className="providers-cta-background">
          <div className="providers-cta-content">
            <h2>Ready to Join Kenya's Leading Automotive Network?</h2>
            <p>Start your application today and get approved within 24 hours</p>
            <div className="providers-cta-buttons">
              <Link to="/apply" className="providers-btn-primary">Apply Now</Link>
              <button className="providers-btn-secondary">Download Provider App</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Providers;