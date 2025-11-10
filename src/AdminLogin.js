import React, { useState } from 'react';
import './AdminLogin.css';

function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock authentication 
    if (credentials.email === 'admin@mechaniconcall.com' && credentials.password === 'admin123') {
      onLogin({ email: credentials.email, role: 'admin' });
    } else {
      setError('Invalid credentials');
    }
    
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>Mechanic On Call</h1>
          <p>Admin Dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              placeholder="admin@mechaniconcall.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Restricted access. Authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;