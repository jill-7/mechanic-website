import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      
      {/* Animated Background */}
      <section className="about-hero">
        <div className="hero-video-background">
          <div className="video-overlay"></div>
          {/* Planning to replace with maybe a gif or video */}
          <div className="placeholder-animation">
            <div className="floating-cars">
              <div className="car car-1">🚗</div>
              <div className="car car-2">🚙</div>
              <div className="mechanic">🔧</div>
            </div>
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-part">Driving</span>
            <span className="title-part accent">Innovation</span>
            <span className="title-part">Forward</span>
          </h1>
          <p className="hero-subtitle">
            We're revolutionizing automotive assistance in Kenya, one rescue at a time.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mv-grid">
            <div className="mission-card">
              <div className="card-icon">🎯</div>
              <h2>Our Mission</h2>
              <p>
                To connect stranded motorists with verified, skilled mechanics instantly through 
                cutting-edge technology. We're eliminating the stress and uncertainty of roadside 
                emergencies across Kenya.
              </p>
              <div className="mission-stats">
                <div className="stat">
                  <span className="number">30min</span>
                  <span className="label">Avg. Response</span>
                </div>
                <div className="stat">
                  <span className="number">24/7</span>
                  <span className="label">Service</span>
                </div>
              </div>
            </div>

            <div className="vision-card">
              <div className="card-icon">🔭</div>
              <h2>Our Vision</h2>
              <p>
                To become East Africa's most trusted automotive assistance platform, where 
                every driver feels secure knowing help is just a tap away, and every skilled 
                mechanic finds rewarding work opportunities.
              </p>
              <div className="vision-image">
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      {/* Reminder to change these images */ }
      <section className="system-works-section">
        <div className="container">
          <h2 className="section-title">How Our Ecosystem Works</h2>
          <p className="section-subtitle">Seamless connection between those who need help and those who provide it</p>
          <h3 className='customers'>For Customers</h3>
          <div className="ecosystem-flow">
            <div className="flow-item">
              <div className="flow-icon">📱</div>
              <div className="flow-content">
                <p>User registers or logs in</p>
              </div>
              
            </div>
            <div className="flow-arrow">→</div>

            <div className="flow-item">
              <img src='/location.jpeg' className="flow-icon" alt='location' />
              <div className="flow-content">
                <p>Request a service and share location</p>
                
              </div>
              
            </div>
            <div className="flow-arrow">→</div>

            <div className="flow-item">
              <img src='/mech.jpeg' className="flow-icon" alt='mech'/>
              <div className="flow-content">
                <p>Track mechanic or tow truck</p>
                
              </div>
              
            </div>
            <div className="flow-arrow">→</div>

            <div className="flow-item">
              <img src='/rating.png' className="flow-icon" alt='rating' />
              <div className="flow-content">
                <p>Pay securely and rate service</p>
               
              </div>
             
              
            </div>
          </div>

          {/* Platform Visualization */}
          <div className="platform-visual">
            <div className="visual-container">
              <div className="phone-mockup customer-side">
                <div className="phone-screen">
                  <div className="app-interface">
                    <div className="app-header">Request Help</div>
                    <div className="app-content">
                      <div className="location-pin">📍</div>
                      <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="mechanic-coming">Mechanic arriving in 12min</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="connection-line">
                <div className="pulse-dot"></div>
              </div>

              <div className="phone-mockup mechanic-side">
                <div className="phone-screen">
                  <div className="app-interface">
                    <div className="app-header">New Job</div>
                    <div className="app-content">
                      <div className="job-alert">🚨 New Request</div>
                      <div className="distance">2.3km away</div>
                      <button className="accept-btn">Accept Job</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Speed</h3>
              <p>When you're stranded, every minute counts. We prioritize rapid response above all else.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡</div>
              <h3>Trust</h3>
              <p>Every mechanic is verified, certified, and rated. Your safety is our priority.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h3>Transparency</h3>
              <p>No hidden costs. Know the price upfront and track your help in real-time.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>Building a network that supports both drivers and automotive professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">The Minds Behind the Mission</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">👨‍💼</div>
              <h3>Leadership Team</h3>
              <p>Industry experts with decades of combined experience in automotive and tech sectors</p>
            </div>
            <div className="team-member">
              <div className="member-photo">👩‍💻</div>
              <h3>Tech Team</h3>
              <p>Innovators building robust, scalable solutions for Kenya's unique challenges</p>
            </div>
            <div className="team-member">
              <div className="member-photo">👨‍🔧</div>
              <h3>Mechanic Network</h3>
              <p>200+ verified professionals dedicated to keeping Kenya moving</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;