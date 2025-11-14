import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { getApplications, updateApplicationStatus, getProviders } from './providerAPI';

// Predefined rejection reasons
const REJECTION_REASONS = [
  'Incomplete documentation submitted',
  'Insufficient professional experience',
  'Safety and background verification concerns', 
  'Service area currently at capacity',
  'Professional certification requirements not met',
  'Other (please specify below)'
];

// Email templates
const DEFAULT_EMAIL_TEMPLATES = {
  approval: `Dear {name},

Congratulations! Your application to join Mechanic On Call as a {service} provider has been approved.

Welcome to our professional network! You can now start accepting service requests through our platform.

Best regards,
Mechanic On Call Team`,

  rejection: `Dear {name},

Thank you for your interest in joining Mechanic On Call. After careful review, we regret to inform you that your application cannot be approved at this time.

Reason: {reason}

We encourage you to gain more experience and reapply in the future.

Best regards,
Mechanic On Call Team`
};

const DashboardHome = ({ stats, applications, onReviewApplication }) => {
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
          
          {applications.slice(0, 5).map(app => (
            <div key={app.id} className="table-row">
              <div>
                <strong>{app.fullName}</strong>
                <br />
                <small>{app.email}</small>
              </div>
              <div>
                {app.serviceType && app.serviceType.map(service => (
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
                <button 
                  className="btn-primary small"
                  onClick={() => onReviewApplication(app)}
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ApplicationsPage = ({ applications, onReviewApplication }) => {
  return (
    <div className="applications-page">
      <div className="page-header">
        <h1>Provider Applications</h1>
        <p>Review and manage all provider applications</p>
      </div>

      <div className="applications-table full">
        <div className="table-header">
          <div>Name</div>
          <div>Service</div>
          <div>Experience</div>
          <div>Status</div>
          <div>Applied</div>
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
              {app.serviceType && app.serviceType.map(service => (
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
            <div>{new Date(app.appliedDate).toLocaleDateString()}</div>
            <div>
              <button 
                className="btn-primary small"
                onClick={() => onReviewApplication(app)}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProvidersPage = ({ providers, onViewProviderDetails }) => {
  if (!providers || !Array.isArray(providers)) {
    return (
      <div className="providers-page">
        <div className="page-header">
          <h1>Approved Providers</h1>
          <p>Manage your service providers</p>
        </div>
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No Approved Providers Yet</h3>
          <p>Approved providers will appear here after review</p>
        </div>
      </div>
    );
  }

  return (
    <div className="providers-page">
      <div className="page-header">
        <h1>Approved Providers</h1>
        <p>Manage your service providers</p>
      </div>

      {providers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No Approved Providers Yet</h3>
          <p>Approved providers will appear here after review</p>
        </div>
      ) : (
        <div className="providers-table">
          <div className="table-header">
            <div>Name</div>
            <div>Service</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Approval Date</div>
            <div>Actions</div>
          </div>
          
          {providers.map(provider => (
            <div key={provider.id} className="table-row">
              <div>
                <strong>{provider.fullName}</strong>
              </div>
              <div>
                {provider.serviceType && provider.serviceType.map(service => (
                  <span key={service} className="service-tag">
                    {service === 'car-repair' ? 'Car Repair' : 
                     service === 'towing' ? 'Towing' : 'Machinery'}
                  </span>
                ))}
              </div>
              <div>{provider.email}</div>
              <div>{provider.phone}</div>
              <div>{provider.approvalDate ? new Date(provider.approvalDate).toLocaleDateString() : 'N/A'}</div>
              <div>
                <button 
                  className="btn-primary small"
                  onClick={() => onViewProviderDetails(provider)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsPage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('email');
  const [emailTemplates, setEmailTemplates] = useState(DEFAULT_EMAIL_TEMPLATES);
  const [admins, setAdmins] = useState([
    { id: 1, email: 'admin@mechaniconcall.com', role: 'Owner' },
    { id: 2, email: 'jill@mechaniconcall.com', role: 'Admin' }
  ]);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  const handleAddAdmin = () => {
    if (newAdminEmail && !admins.find(admin => admin.email === newAdminEmail)) {
      setAdmins(prev => [...prev, { 
        id: Date.now(), 
        email: newAdminEmail, 
        role: 'Admin' 
      }]);
      setNewAdminEmail('');
    }
  };

  const handleRemoveAdmin = (adminId) => {
    setAdmins(prev => prev.filter(admin => admin.id !== adminId));
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Platform Settings</h1>
        <p>Manage your platform</p>
      </div>

      <div className="settings-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            Email Templates
          </button>
          <button 
            className={`tab-button ${activeTab === 'admins' ? 'active' : ''}`}
            onClick={() => setActiveTab('admins')}
          >
            Admin Users
          </button>
          <button 
            className={`tab-button ${activeTab === 'platform' ? 'active' : ''}`}
            onClick={() => setActiveTab('platform')}
          >
            Platform Info
          </button>
        </div>

        <div className="tab-content">
          {/* Email Templates Tab */}
          {activeTab === 'email' && (
            <div className="email-templates">
              <div className="template-section">
                <h3>Approval Email Template</h3>
                <textarea
                  value={emailTemplates.approval}
                  onChange={(e) => setEmailTemplates(prev => ({
                    ...prev,
                    approval: e.target.value
                  }))}
                  rows="8"
                  placeholder="Enter approval email template..."
                />
                <div className="template-variables">
                  <strong>Available variables:</strong> {'{name}'}, {'{service}'}
                </div>
              </div>

              <div className="template-section">
                <h3>Rejection Email Template</h3>
                <textarea
                  value={emailTemplates.rejection}
                  onChange={(e) => setEmailTemplates(prev => ({
                    ...prev,
                    rejection: e.target.value
                  }))}
                  rows="8"
                  placeholder="Enter rejection email template..."
                />
                <div className="template-variables">
                  <strong>Available variables:</strong> {'{name}'}, {'{service}'}, {'{reason}'}
                </div>
              </div>

              <button className="btn-primary">Save Templates</button>
            </div>
          )}

          {/* Admin Users Tab */}
          {activeTab === 'admins' && (
            <div className="admin-management">
              <div className="add-admin">
                <h3>Add New Admin</h3>
                <div className="add-admin-form">
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="Enter admin email address"
                  />
                  <button onClick={handleAddAdmin} className="btn-primary">
                    Send Invite
                  </button>
                </div>
              </div>

              <div className="admins-list">
                <h3>Current Admins</h3>
                <div className="admins-table">
                  {admins.map(admin => (
                    <div key={admin.id} className="admin-item">
                      <div className="admin-info">
                        <strong>{admin.email}</strong>
                        <span className="admin-role">{admin.role}</span>
                      </div>
                      {admin.role !== 'Owner' && (
                        <button 
                          onClick={() => handleRemoveAdmin(admin.id)}
                          className="btn-danger small"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Platform Info Tab */}
          {activeTab === 'platform' && (
            <div className="platform-settings">
              <div className="setting-group">
                <label>Platform Name</label>
                <input 
                  type="text" 
                  defaultValue="Mechanic On Call"
                  placeholder="Enter platform name"
                />
              </div>

              <div className="setting-group">
                <label>Platform Logo</label>
                <div className="logo-upload">
                  <input type="file" accept="image/*" />
                  <p>Upload your platform logo (PNG, JPG, max 2MB)</p>
                </div>
              </div>

              <div className="setting-group">
                <label>Contact Email</label>
                <input 
                  type="email" 
                  defaultValue="support@mechaniconcall.com"
                  placeholder="Support email address"
                />
              </div>

              <button className="btn-primary">Save Settings</button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Section */}
      <div className="logout-section">
        <button onClick={onLogout} className="btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

const ApplicationReviewModal = ({ application, isOpen, onClose, onApprove, onReject }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [activeDocument, setActiveDocument] = useState(null);

  const getFileType = (fileUrl) => {
    if (!fileUrl) return 'unknown';
    const extension = fileUrl.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return 'image';
    } else if (['pdf'].includes(extension)) {
      return 'pdf';
    } else if (['doc', 'docx'].includes(extension)) {
      return 'word';
    } else {
      return 'unknown';
    }
  };

  if (!isOpen || !application) return null;

  const handleApprove = () => {
    onApprove(application.id);
    onClose();
  };

  const handleReject = () => {
    const reason = selectedReason === 'Other (please specify below)' ? customNotes : selectedReason;
    onReject(application.id, reason);
    onClose();
  };

  const openDocument = (docUrl) => {
    setActiveDocument(docUrl);
  };

  const closeDocument = () => {
    setActiveDocument(null);
  };

  return (
    <>
      {/* Main Modal */}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Review Application - {application.fullName}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          <div className="modal-body">
            {/* Personal Information */}
            <div className="info-section">
              <h3>📋 Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Full Name:</strong> {application.fullName}
                </div>
                <div className="info-item">
                  <strong>Email:</strong> {application.email}
                </div>
                <div className="info-item">
                  <strong>Phone:</strong> {application.phone}
                </div>
                <div className="info-item">
                  <strong>ID Number:</strong> {application.idNumber}
                </div>
                <div className="info-item full-width">
                  <strong>Address:</strong> {application.address}
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="info-section">
              <h3>🔧 Professional Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Service Type:</strong> 
                  {application.serviceType && application.serviceType.map(service => (
                    <span key={service} className="service-tag">
                      {service === 'car-repair' ? 'Car Repair' : 
                       service === 'towing' ? 'Towing' : 'Machinery'}
                    </span>
                  ))}
                </div>
                <div className="info-item">
                  <strong>Experience:</strong> {application.yearsExperience} years
                </div>
                {application.specialization && (
                  <div className="info-item">
                    <strong>Specialization:</strong> {application.specialization}
                  </div>
                )}
                {application.certifications && (
                  <div className="info-item full-width">
                    <strong>Certifications:</strong> {application.certifications}
                  </div>
                )}
                
                {/* Vehicle Information for towing providers - FIXED FIELD NAMES */}
                {application.serviceType && application.serviceType.includes('towing') && (
                  <>
                    <div className="info-item">
                      <strong>Vehicle Type:</strong> {application.vehicleType || application.vehicle_type || 'Not provided'}
                    </div>
                    <div className="info-item">
                      <strong>Vehicle Registration:</strong> {application.vehicleRegistration || application.vehicle_registration || 'Not provided'}
                    </div>
                    <div className="info-item">
                      <strong>Vehicle Capacity:</strong> {application.vehicleCapacity || application.vehicle_capacity || 'Not provided'}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Documents */}
            <div className="info-section">
              <h3>📎 Documents</h3>
              <div className="documents-list">
                <div className="document-item">
                  <span>National ID</span>
                  <button 
                    className="btn-secondary small"
                    onClick={() => openDocument(application.documents?.idDocument || application.id_document_url)}
                  >
                    View Document
                  </button>
                </div>
                
                <div className="document-item">
                  <span>Professional Certificates</span>
                  <button 
                    className="btn-secondary small"
                    onClick={() => openDocument(application.documents?.certificationDocument || application.certification_document_url)}
                  >
                    View Document
                  </button>
                </div>
                
                {(application.documents?.vehicleDocument || application.vehicle_document_url) && (
                  <div className="document-item">
                    <span>Vehicle Documents</span>
                    <button 
                      className="btn-secondary small"
                      onClick={() => openDocument(application.documents?.vehicleDocument || application.vehicle_document_url)}
                    >
                      View Document
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Rejection Section */}
            <div className="rejection-section">
              <h3>Rejection Details (if applicable)</h3>
              <select 
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="reason-select"
              >
                <option value="">Select rejection reason</option>
                {REJECTION_REASONS.map(reason => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
              
              {selectedReason === 'Other (please specify below)' && (
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Please specify the reason for rejection..."
                  rows="3"
                  className="custom-notes"
                />
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button 
              onClick={handleApprove}
              className="btn-success"
            >
              Approve Application
            </button>
            <button 
              onClick={handleReject}
              className="btn-danger"
              disabled={!selectedReason || (selectedReason === 'Other (please specify below)' && !customNotes)}
            >
              Reject Application
            </button>
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {activeDocument && (
        <div className="modal-overlay document-preview" onClick={closeDocument}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Document Preview - {getFileType(activeDocument).toUpperCase()}</h3>
              <button className="modal-close" onClick={closeDocument}>×</button>
            </div>
            <div className="document-preview-content">
              {getFileType(activeDocument) === 'image' && (
                <img src={activeDocument} alt="Document preview" />
              )}

              {getFileType(activeDocument) === 'pdf' && (
                <div className="pdf-preview">
                  <div className="pdf-placeholder">
                    <div className="pdf-icon">📄</div>
                    <h4>PDF Document</h4>
                    <p>This document is ready for download</p>
                    <div className="file-info">
                      <span>File type: PDF</span>
                      <span>Click below to view full document</span>
                    </div>
                  </div>
                </div>
              )}
              
              {getFileType(activeDocument) === 'word' && (
                <div className="word-preview">
                  <div className="word-placeholder">
                    <div className="word-icon">📝</div>
                    <h4>Word Document</h4>
                    <p>This document requires download to view</p>
                    <div className="file-info">
                      <span>File type: Microsoft Word</span>
                      <span>Click below to download and view</span>
                    </div>
                  </div>
                </div>
              )}
              
              {getFileType(activeDocument) === 'unknown' && (
                <div className="unknown-preview">
                  <div className="unknown-icon">📎</div>
                  <h4>Document</h4>
                  <p>This file type cannot be previewed</p>
                </div>
              )}
              <div className="document-actions">
                <a href={activeDocument} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {getFileType(activeDocument) === 'image' ? 'Open Full Image' : 
                  getFileType(activeDocument) === 'pdf' ? 'View PDF' : 'Download File'}
                </a>
                <button onClick={closeDocument} className="btn-secondary">
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};



// Provider Details Modal Component
const ProviderDetailsModal = ({ provider, isOpen, onClose }) => {
  const [activeDocument, setActiveDocument] = useState(null);

  const getFileType = (fileUrl) => {
    if (!fileUrl) return 'unknown';
    const extension = fileUrl.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return 'image';
    } else if (['pdf'].includes(extension)) {
      return 'pdf';
    } else if (['doc', 'docx'].includes(extension)) {
      return 'word';
    } else {
      return 'unknown';
    }
  };

  if (!isOpen || !provider) return null;

  const openDocument = (docUrl) => {
    setActiveDocument(docUrl);
  };

  const closeDocument = () => {
    setActiveDocument(null);
  };

  return (
    <>
      {/* Main Modal */}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Provider Details - {provider.fullName}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>

          <div className="modal-body">
            {/* Personal Information */}
            <div className="info-section">
              <h3>📋 Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Full Name:</strong> {provider.fullName}
                </div>
                <div className="info-item">
                  <strong>Email:</strong> {provider.email}
                </div>
                <div className="info-item">
                  <strong>Phone:</strong> {provider.phone}
                </div>
                <div className="info-item">
                  <strong>ID Number:</strong> {provider.idNumber}
                </div>
                <div className="info-item full-width">
                  <strong>Address:</strong> {provider.address}
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="info-section">
              <h3>🔧 Professional Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Service Type:</strong> 
                  {provider.serviceType && provider.serviceType.map(service => (
                    <span key={service} className="service-tag">
                      {service === 'car-repair' ? 'Car Repair' : 
                       service === 'towing' ? 'Towing' : 'Machinery'}
                    </span>
                  ))}
                </div>
                <div className="info-item">
                  <strong>Experience:</strong> {provider.yearsExperience} years
                </div>
                {provider.specialization && (
                  <div className="info-item">
                    <strong>Specialization:</strong> {provider.specialization}
                  </div>
                )}
                {provider.certifications && (
                  <div className="info-item full-width">
                    <strong>Certifications:</strong> {provider.certifications}
                  </div>
                )}
                
                {/* Vehicle Information for towing providers */}
                {provider.serviceType && provider.serviceType.includes('towing') && (
                  <>
                    <div className="info-item">
                      <strong>Vehicle Type:</strong> {provider.vehicleType || provider.vehicle_type || 'Not provided'}
                    </div>
                    <div className="info-item">
                      <strong>Vehicle Registration:</strong> {provider.vehicleRegistration || provider.vehicle_registration || 'Not provided'}
                    </div>
                    <div className="info-item">
                      <strong>Vehicle Capacity:</strong> {provider.vehicleCapacity || provider.vehicle_capacity || 'Not provided'}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Documents */}
            <div className="info-section">
              <h3>📎 Documents</h3>
              <div className="documents-list">
                <div className="document-item">
                  <span>National ID</span>
                  <button 
                    className="btn-secondary small"
                    onClick={() => openDocument(provider.documents?.idDocument || provider.id_document_url)}
                    disabled={!provider.documents?.idDocument && !provider.id_document_url}
                  >
                    {provider.documents?.idDocument || provider.id_document_url ? 'View Document' : 'No Document'}
                  </button>
                </div>
                
                <div className="document-item">
                  <span>Professional Certificates</span>
                  <button 
                    className="btn-secondary small"
                    onClick={() => openDocument(provider.documents?.certificationDocument || provider.certification_document_url)}
                    disabled={!provider.documents?.certificationDocument && !provider.certification_document_url}
                  >
                    {provider.documents?.certificationDocument || provider.certification_document_url ? 'View Document' : 'No Document'}
                  </button>
                </div>
                
                {(provider.documents?.vehicleDocument || provider.vehicle_document_url) && (
                  <div className="document-item">
                    <span>Vehicle Documents</span>
                    <button 
                      className="btn-secondary small"
                      onClick={() => openDocument(provider.documents?.vehicleDocument || provider.vehicle_document_url)}
                    >
                      View Document
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {activeDocument && (
        <div className="modal-overlay document-preview" onClick={closeDocument}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Document Preview - {getFileType(activeDocument).toUpperCase()}</h3>
              <button className="modal-close" onClick={closeDocument}>×</button>
            </div>
            <div className="document-preview-content">
              {getFileType(activeDocument) === 'image' && (
                <img src={activeDocument} alt="Document preview" />
              )}

              {getFileType(activeDocument) === 'pdf' && (
                <div className="pdf-preview">
                  <div className="pdf-placeholder">
                    <div className="pdf-icon">📄</div>
                    <h4>PDF Document</h4>
                    <p>This document is ready for download</p>
                    <div className="file-info">
                      <span>File type: PDF</span>
                      <span>Click below to view full document</span>
                    </div>
                  </div>
                </div>
              )}
              
              {getFileType(activeDocument) === 'word' && (
                <div className="word-preview">
                  <div className="word-placeholder">
                    <div className="word-icon">📝</div>
                    <h4>Word Document</h4>
                    <p>This document requires download to view</p>
                    <div className="file-info">
                      <span>File type: Microsoft Word</span>
                      <span>Click below to download and view</span>
                    </div>
                  </div>
                </div>
              )}
              
              {getFileType(activeDocument) === 'unknown' && (
                <div className="unknown-preview">
                  <div className="unknown-icon">📎</div>
                  <h4>Document</h4>
                  <p>This file type cannot be previewed</p>
                </div>
              )}
              <div className="document-actions">
                <a href={activeDocument} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {getFileType(activeDocument) === 'image' ? 'Open Full Image' : 
                  getFileType(activeDocument) === 'pdf' ? 'View PDF' : 'Download File'}
                </a>
                <button onClick={closeDocument} className="btn-secondary">
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main AdminDashboard Component
function AdminDashboard({ admin, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [providerDetailsModalOpen, setProviderDetailsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [applications, setApplications] = useState([]);
  const [providers, setProviders] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedProviders: 0
  });
  const [loading, setLoading] = useState(true);

   const handleViewProviderDetails = (provider) => {
    setSelectedProvider(provider);
    setProviderDetailsModalOpen(true);
  };

  const closeProviderDetailsModal = () => {
    setProviderDetailsModalOpen(false);
    setSelectedProvider(null);
  };

  // Load real data from API
  useEffect(() => {
    loadApplications();
    loadProviders();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const result = await getApplications('pending');
      if (result.success) {
        // Map database fields to your frontend field names - FIXED VEHICLE FIELDS
        const mappedApplications = result.data.map(app => ({
          id: app.id,
          fullName: app.full_name,
          email: app.email,
          phone: app.phone,
          serviceType: app.service_type,
          yearsExperience: app.years_experience,
          specialization: app.specialization,
          certifications: app.certifications,
          status: app.status,
          appliedDate: app.created_at,
          address: app.address,
          idNumber: app.id_number,
          // Vehicle fields - check both naming conventions
          vehicleType: app.vehicle_type || app.vehicleType,
          vehicleRegistration: app.vehicle_registration || app.vehicleRegistration,
          vehicleCapacity: app.vehicle_capacity || app.vehicleCapacity,
          documents: {
            idDocument: app.id_document_url,
            certificationDocument: app.certification_document_url,
            vehicleDocument: app.vehicle_document_url,
            businessLicense: app.business_license_url
          },
          id_document_url: app.id_document_url,
          certification_document_url: app.certification_document_url,
          vehicle_document_url: app.vehicle_document_url,
          business_license_url: app.business_license_url
        
        }));
        console.log('Mapped applications: ', mappedApplications);
        setApplications(mappedApplications);
        
        // Update stats
        setStats(prev => ({
          ...prev,
          totalApplications: result.data.length,
          pendingApplications: result.data.filter(a => a.status === 'pending').length
        }));
      }
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProviders = async () => {
    try {
      const result = await getProviders();
      if (result.success) {
        // Map providers data with proper field names
        const mappedProviders = result.data.map(provider => ({
          id: provider.id,
          fullName: provider.full_name,
          email: provider.email,
          phone: provider.phone,
          serviceType: provider.service_type,
          yearsExperience: provider.years_experience,
          specialization: provider.specialization,
          status: provider.status,
          approvalDate: provider.reviewed_at || provider.created_at,
          // Include all original data as fallback
          ...provider
        }));
        setProviders(mappedProviders);
        setStats(prev => ({
          ...prev,
          approvedProviders: result.data.length
        }));
      }
    } catch (error) {
      console.error('Failed to load providers:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/admin');
  };

  const handleReviewApplication = (application) => {
    setSelectedApplication(application);
    setReviewModalOpen(true);
  };

  const handleApproveApplication = async (applicationId) => {
    try {
      const result = await updateApplicationStatus(applicationId, 'approved');
      if (result.success) {
        // Refresh the data
        await loadApplications();
        await loadProviders();
        console.log('Application approved:', applicationId);
      }
    } catch (error) {
      console.error('Failed to approve application:', error);
    }
  };

  const handleRejectApplication = async (applicationId, reason) => {
    try {
      const result = await updateApplicationStatus(applicationId, 'rejected', reason);
      if (result.success) {
        await loadApplications();
        console.log('Application rejected:', applicationId, 'Reason:', reason);
      }
    } catch (error) {
      console.error('Failed to reject application:', error);
    }
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setSelectedApplication(null);
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
            <span className="nav-badge">{stats.pendingApplications}</span>
          </Link>
          
          <Link 
            to="/admin/providers" 
            className={`nav-item ${location.pathname.includes('providers') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <img src="/provider.jpg" alt='provider-logo' className="nav-icon" />
            <span className="nav-text">Providers</span>
          </Link>
          
          <Link 
            to="/admin/settings" 
            className={`nav-item ${location.pathname.includes('settings') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
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
          {loading ? (
            <div className="loading-state">
              <p>Loading...</p>
            </div>
          ) : (
            <Routes>
              <Route 
                path="/" 
                element={
                  <DashboardHome 
                    stats={stats} 
                    applications={applications.filter(app => app.status === 'pending')}
                    onReviewApplication={handleReviewApplication}
                  />
                } 
              />
              <Route 
                path="/applications" 
                element={
                  <ApplicationsPage 
                    applications={applications.filter(app => app.status === 'pending')}
                    onReviewApplication={handleReviewApplication}
                  />
                } 
              />
              <Route 
                path="/providers" 
                element={<ProvidersPage providers={providers} onViewProviderDetails={handleViewProviderDetails} />} 
              />
              <Route 
                path="/settings" 
                element={<SettingsPage onLogout={handleLogout} />} 
              />
            </Routes>
          )}
        </main>
      </div>

      {/* Application Review Modal */}
      <ApplicationReviewModal
        application={selectedApplication}
        isOpen={reviewModalOpen}
        onClose={closeReviewModal}
        onApprove={handleApproveApplication}
        onReject={handleRejectApplication}
      />

      <ProviderDetailsModal
        provider={selectedProvider}
        isOpen={providerDetailsModalOpen}
        onClose={closeProviderDetailsModal}
      />
    </div>

  
  );
}

export default AdminDashboard;