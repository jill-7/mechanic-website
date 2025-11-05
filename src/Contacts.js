import React, { useState } from 'react';
import './Contacts.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "How quickly do mechanics arrive?",
      answer: "Our average response time is under 30 minutes in urban areas. For remote locations, it may take up to 45-60 minutes depending on traffic and distance."
    },
    {
      question: "Are your mechanics certified and verified?",
      answer: "Yes, all our mechanics undergo strict verification including background checks, certification validation, and skill assessment before joining our platform."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept mobile money (M-Pesa, Airtel Money), credit/debit cards, and in-app wallet payments for your convenience."
    },
    {
      question: "Can I choose my preferred mechanic?",
      answer: "While we automatically match you with the nearest available mechanic, you can view mechanic profiles and ratings before confirming service requests."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We have a 100% satisfaction guarantee. If you're not happy with the service, contact our support team within 24 hours for a resolution."
    }
  ];

  return (
    <div className="contact-page">
      {/* Interactive Hero */}
      <section className="contact-hero-section">
        <div className="contact-hero-container">
          <div className="contact-hero-text">
            <h1>Get In Touch</h1>
            <p>We're here to help and answer any questions you might have</p>
          </div>
          <div className="contact-hero-visual">
            <div className="contact-floating-shapes">
              <div className="contact-shape contact-circle"></div>
              <div className="contact-shape contact-triangle"></div>
              <div className="contact-shape contact-square"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="contact-methods-section">
        <div className="contact-container">
          <div className="contact-methods-grid">
            <div className="contact-method-card">
              <div className="contact-method-icon">📧</div>
              <h3>Email Us</h3>
              <p>Send us an email anytime</p>
              <a href="mailto:support@mechaniconcall.com">support@mechaniconcall.com</a>
            </div>
            <div className="contact-method-card">
              <div className="contact-method-icon">📞</div>
              <h3>Call Us</h3>
              <p>Mon - Sun, 24/7 Support</p>
              <a href="tel:+254700000000">+254 700 000 000</a>
            </div>
            <div className="contact-method-card">
              <div className="contact-method-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Instant messaging support</p>
              <button className="contact-chat-btn">Start Chat</button>
            </div>
            <div className="contact-method-card">
              <div className="contact-method-icon">📍</div>
              <h3>Visit Us</h3>
              <p>Our headquarters</p>
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-content-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="contact-submit-btn">
                  Send Message →
                </button>
              </form>
            </div>

            {/* Interactive Map */}
            <div className="contact-map-section">
              <h2>Find Us Here</h2>
              <div className="contact-map-container">
                <div className="contact-interactive-map">
                  <div className="contact-map-pin">
                    <div className="contact-pin"></div>
                    <div className="contact-pulse"></div>
                  </div>
                  <div className="contact-map-overlay">
                    <h4>Mechanic On Call HQ</h4>
                    <p>Nairobi, Kenya</p>
                    <button className="contact-directions-btn">Get Directions</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Dropdown */}
      <section className="contact-faq-section">
        <div className="contact-container">
          <h2 className="contact-faq-title">Frequently Asked Questions</h2>
          <div className="contact-faq-container">
            {faqData.map((faq, index) => (
              <div key={index} className="contact-faq-item">
                <div 
                  className="contact-faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{faq.question}</h3>
                  <span className={`contact-faq-icon ${activeFAQ === index ? 'active' : ''}`}>
                    {activeFAQ === index ? '−' : '+'}
                  </span>
                </div>
                <div className={`contact-faq-answer ${activeFAQ === index ? 'active' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;