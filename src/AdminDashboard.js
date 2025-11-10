import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// Mock data 
const mockApplications = [
  {
    id: 1,
    fullName: 'John Kamau',
    email: 'john@example.com',
    phone: '+254712345678',
    serviceType: ['car-repair'],
    yearsExperience: '3-5',
    status: 'pending',
    appliedDate: '2024-01-15',
    documents: { idDocument: true, certificationDocument: true }
  },
  {
    id: 2,
    fullName: 'Sarah Mwangi',
    email: 'sarah@example.com',
    phone: '+254723456789',
    serviceType: ['towing'],
    yearsExperience: '5+',
    status: 'pending',
    appliedDate: '2024-01-14',
    documents: { idDocument: true, certificationDocument: true, vehicleDocument: true }
  }
];

const mockStats = {
  totalApplications: 24,
  pendingApplications: 8,
  approvedProviders: 16,
  totalRevenue: 125000
};

function AdminDashboard({ admin, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Mechanic On Call</h2>
          <p>Admin Dashboard</p>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/admin" 
            className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/applications" 
            className={`nav-item ${location.pathname.includes('applications') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">Applications</span>
            <span className="nav-badge">{mockStats.pendingApplications}</span>
          </Link>
          
          <Link 
            to="/admin/providers" 
            className={`nav-item ${location.pathname.includes('providers') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-text">Providers</span>
          </Link>
          
          <Link 
            to="/admin/settings" 
            className={`nav-item ${location.pathname.includes('settings') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">⚙</span>
            <span className="nav-text">Settings</span>
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
        </div>
      </div>

      {/* main content */}
      <div className="admin-main">
        {/* top bar */}
        <header className="admin-header">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          
          <div className="header-title">
            <h1>
              {location.pathname === '/admin' && 'Dashboard'}
              {location.pathname.includes('applications') && 'Applications'}
              {location.pathname.includes('providers') && 'Providers'}
              {location.pathname.includes('settings') && 'Settings'}
            </h1>
            <p>Welcome back, {admin?.email}</p>
          </div>
          
          <div className="header-actions">
            <div className="admin-profile">
              <span className="admin-avatar">👨‍💼</span>
              <span className="admin-name">{admin?.email}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Routes>
            <Route path="/" element={<DashboardHome stats={mockStats} applications={mockApplications} />} />
            <Route path="/applications" element={<ApplicationsPage applications={mockApplications} />} />
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Dashboard Home Component
function DashboardHome({ stats, applications }) {
  return (
    <div className="dashboard-home">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>{stats.totalApplications}</h3>
            <p>Total Applications</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingApplications}</h3>
            <p>Pending Review</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.approvedProviders}</h3>
            <p>Active Providers</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Ksh {stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="recent-section">
        <div className="section-header">
          <h2>Recent Applications</h2>
          <Link to="/admin/applications" className="view-all">View All →</Link>
        </div>
        
        <div className="applications-table">
          <div className="table-header">
            <div>Name</div>
            <div>Service</div>
            <div>Experience</div>
            <div>Status</div>
            <div>Action</div>
          </div>
          
          {applications.map(app => (
            <div key={app.id} className="table-row">
              <div>
                <strong>{app.fullName}</strong>
                <br />
                <small>{app.email}</small>
              </div>
              <div>
                {app.serviceType.map(service => (
                  <span key={service} className="service-tag">
                    {service === 'car-repair' ? 'Car Repair' : 
                     service === 'towing' ? 'Towing' : 'Machinery'}
                  </span>
                ))}
              </div>
              <div>{app.yearsExperience} years</div>
              <div>
                <span className={`status-badge status-${app.status}`}>
                  {app.status}
                </span>
              </div>
              <div>
                <button className="btn-primary small">Review</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card">
            <span className="action-icon">👥</span>
            <span className="action-text">Manage Providers</span>
          </button>
          <button className="action-card">
            <span className="action-icon">⚙</span>
            <span className="action-text">Platform Settings</span>
          </button>
          <button className="action-card">
            <span className="action-icon">📊</span>
            <span className="action-text">View Reports</span>
          </button>
          <button className="action-card">
            <span className="action-icon">📧</span>
            <span className="action-text">Send Announcement</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Applications Page Component
function ApplicationsPage({ applications }) {
  return (
    <div className="applications-page">
      <div className="page-header">
        <h1>Provider Applications</h1>
        <p>Review and manage provider applications</p>
      </div>

      <div className="applications-table full">
        <div className="table-header">
          <div>Name</div>
          <div>Contact</div>
          <div>Service</div>
          <div>Experience</div>
          <div>Documents</div>
          <div>Applied</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        {applications.map(app => (
          <div key={app.id} className="table-row">
            <div>
              <strong>{app.fullName}</strong>
              <br />
              <small>ID: {app.id}</small>
            </div>
            <div>
              {app.email}
              <br />
              {app.phone}
            </div>
            <div>
              {app.serviceType.map(service => (
                <div key={service} className="service-tag">
                  {service === 'car-repair' ? 'Car Repair' : 
                   service === 'towing' ? 'Towing' : 'Machinery'}
                </div>
              ))}
            </div>
            <div>{app.yearsExperience} years</div>
            <div>
              {app.documents.idDocument && <span className="doc-badge">🆔</span>}
              {app.documents.certificationDocument && <span className="doc-badge">📜</span>}
              {app.documents.vehicleDocument && <span className="doc-badge">🚗</span>}
            </div>
            <div>{app.appliedDate}</div>
            <div>
              <span className={`status-badge status-${app.status}`}>
                {app.status}
              </span>
            </div>
            <div>
              <div className="action-buttons">
                <button className="btn-primary small">Review</button>
                <button className="btn-success small">Approve</button>
                <button className="btn-danger small">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Providers Page Component
function ProvidersPage() {
  return (
    <div className="providers-page">
      <div className="page-header">
        <h1>Active Providers</h1>
        <p>Manage your service provider network</p>
      </div>
      <div className="coming-soon">
        <div className="coming-soon-icon">👥</div>
        <h2>Providers Management</h2>
        <p>Coming soon</p>
      </div>
    </div>
  );
}

// Settings Page Component
function SettingsPage() {
  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Platform Settings</h1>
        <p>Configure your platform settings</p>
      </div>
      <div className="coming-soon">
        <div className="coming-soon-icon">⚙</div>
        <h2>Settings Panel</h2>
        <p>Coming soon</p>
      </div>
    </div>
  );
}

export default AdminDashboard;