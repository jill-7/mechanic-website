import React, { useState } from 'react';
import { uploadFile, submitApplication } from './api';
import './ProviderApplication.css';

function ProviderApplication() {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    
    // Professional Information
    serviceType: [],
    yearsExperience: '',
    certifications: '',
    specialization: '',
    
    // Vehicle Information
    vehicleType: '',
    vehicleRegistration: '',
    vehicleCapacity: '',
    
    // Documents which will store file URLs after upload
    idDocumentUrl: '',
    certificationDocumentUrl: '',
    vehicleDocumentUrl: '',
    businessLicenseUrl: '',
    
    // Service Area
    operatingAreas: [],
    availability: 'full-time'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState({});

  // select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    
    if (error) setError('');
  };

  // Handles the checkbox arrays 
  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  // Handles file uploads
  const handleFileUpload = async (file, fieldName) => {
    if (!file) return;
    
    setUploadProgress(prev => ({ ...prev, [fieldName]: 'uploading' }));
    
    try {
      const fileUrl = await uploadFile(file);
      
      setFormData(prev => ({
        ...prev,
        [fieldName + 'Url']: fileUrl
      }));
      
      setUploadProgress(prev => ({ ...prev, [fieldName]: 'success' }));
      
    } catch (error) {
      console.error('File upload failed:', error);
      setUploadProgress(prev => ({ ...prev, [fieldName]: 'error' }));
      setError(`Failed to upload ${fieldName}. Please try again.`);
    }
  };

  // Form navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Basic step validation
  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone || !formData.idNumber) {
          setError('Please fill all required fields');
          return false;
        }
        return true;
      
      case 2:
        if (formData.serviceType.length === 0 || !formData.yearsExperience) {
          setError('Please select at least one service type and experience level');
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  // Final form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Submit to backend which is currently a mock version
      const result = await submitApplication(formData);
      
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error('Submission failed');
      }
      
    } catch (error) {
      console.error('Application submission error:', error);
      setError('Failed to submit application. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  // Success page after submission
  if (submitted) {
    return (
      <div className="application-success">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h1>Application Submitted Successfully!</h1>
          <p>
            Your application has been received and is under review. 
            We'll contact you at <strong>{formData.email}</strong> within 24-48 hours.
          </p>
          <div className="next-steps">
            <h3>What happens next?</h3>
            <ul>
              <li>✓ Background check and document verification</li>
              <li>✓ Skills assessment (if required)</li>
              <li>✓ Platform onboarding and training</li>
            </ul>
          </div>
          <div className="success-actions">
            <button onClick={() => window.location.href = '/'} className="btn-primary">
              Return to Home
            </button>
            <button onClick={() => window.location.href = '/contact'} className="btn-secondary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="provider-application">
      <div className="application-header">
        <h1>Join Our Professional Network</h1>
        <p>Become a verified service provider and start earning today</p>
        
        {/* Progress Bar */}
        <div className="progress-bar">
          {[1, 2, 3, 4].map(step => (
            <React.Fragment key={step}>
              <div className="progress-step">
                <div className={`step-number ${currentStep >= step ? 'active' : ''}`}>
                  {step}
                </div>
                <span>
                  {step === 1 && 'Personal Info'}
                  {step === 2 && 'Professional'}
                  {step === 3 && 'Documents'}
                  {step === 4 && 'Review'}
                </span>
              </div>
              {step < 4 && <div className="progress-line"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          ⚠ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="application-form">
        {/* Personal Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <h2>Personal Information</h2>
            <p className="step-description">Tell us about yourself</p>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+254 700 000 000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="idNumber">National ID Number *</label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your ID number"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Physical Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Your complete physical address"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={nextStep} className="btn-next">
                Next: Professional Details →
              </button>
            </div>
          </div>
        )}

        {/* Professional Information */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2>Professional Details</h2>
            <p className="step-description">Tell us about your skills and experience</p>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Service Types *</label>
                <div className="checkbox-group">
                  {['car-repair', 'towing', 'machinery-lifting'].map(service => (
                    <label key={service} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.serviceType.includes(service)}
                        onChange={() => handleArrayChange('serviceType', service)}
                      />
                      {service === 'car-repair' && 'Car Repair & Maintenance'}
                      {service === 'towing' && 'Vehicle Towing'}
                      {service === 'machinery-lifting' && 'Heavy Machinery Lifting'}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="yearsExperience">Years of Experience *</label>
                <select
                  id="yearsExperience"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="specialization">Specialization</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g., Engine Specialist, Electrical Systems"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="certifications">Certifications & Training</label>
                <textarea
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  placeholder="List your certifications, training programs completed, workshops attended..."
                  rows="3"
                />
              </div>

              {/* Vehicle Information that only show if towing is selected */}
              {formData.serviceType.includes('towing') && (
                <>
                  <div className="form-group">
                    <label htmlFor="vehicleType">Vehicle Type *</label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select vehicle type</option>
                      <option value="light-truck">Light Tow Truck</option>
                      <option value="heavy-truck">Heavy Duty Tow Truck</option>
                      <option value="flatbed">Flatbed Truck</option>
                      <option value="recovery">Recovery Vehicle</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vehicleRegistration">Vehicle Registration *</label>
                    <input
                      type="text"
                      id="vehicleRegistration"
                      name="vehicleRegistration"
                      value={formData.vehicleRegistration}
                      onChange={handleChange}
                      placeholder="e.g., KAA 123A"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="vehicleCapacity">Vehicle Capacity *</label>
                    <input
                      type="text"
                      id="vehicleCapacity"
                      name="vehicleCapacity"
                      value={formData.vehicleCapacity}
                      onChange={handleChange}
                      placeholder="e.g., 3.5 tons, 10 tons"
                      required
                    />
                  </div>
                </>
              )}
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn-prev">
                ← Previous
              </button>
              <button type="button" onClick={nextStep} className="btn-next">
                Next: Documents →
              </button>
            </div>
          </div>
        )}

        {/* Documents Upload */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2>Required Documents</h2>
            <p className="step-description">Upload clear photos or scans of your documents</p>
            
            <div className="documents-grid">
              <DocumentUpload
                title="National ID"
                description="Front and back of your government-issued ID"
                onFileUpload={(file) => handleFileUpload(file, 'idDocument')}
                uploadStatus={uploadProgress.idDocument}
              />

              <DocumentUpload
                title="Professional Certificates"
                description="Mechanic certifications or training documents"
                onFileUpload={(file) => handleFileUpload(file, 'certificationDocument')}
                uploadStatus={uploadProgress.certificationDocument}
              />

              {formData.serviceType.includes('towing') && (
                <DocumentUpload
                  title="Vehicle Documents"
                  description="Vehicle registration and insurance"
                  onFileUpload={(file) => handleFileUpload(file, 'vehicleDocument')}
                  uploadStatus={uploadProgress.vehicleDocument}
                />
              )}

              <DocumentUpload
                title="Business License (Optional)"
                description="If operating as a registered business"
                onFileUpload={(file) => handleFileUpload(file, 'businessLicense')}
                uploadStatus={uploadProgress.businessLicense}
                required={false}
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn-prev">
                ← Previous
              </button>
              <button type="button" onClick={nextStep} className="btn-next">
                Next: Review & Submit →
              </button>
            </div>
          </div>
        )}

        {/* Review and Submit */}
        {currentStep === 4 && (
          <div className="form-step">
            <h2>Review Your Application</h2>
            <p className="step-description">Please verify all information before submitting</p>
            
            <div className="review-sections">
              <ReviewSection title="Personal Information" data={formData} fields={[
                { label: 'Full Name', key: 'fullName' },
                { label: 'Email', key: 'email' },
                { label: 'Phone', key: 'phone' },
                { label: 'ID Number', key: 'idNumber' },
                { label: 'Address', key: 'address' }
              ]} />

              <ReviewSection title="Professional Details" data={formData} fields={[
                { label: 'Service Types', key: 'serviceType', format: (val) => val.join(', ') },
                { label: 'Years of Experience', key: 'yearsExperience' },
                { label: 'Specialization', key: 'specialization' },
                { label: 'Certifications', key: 'certifications' },
                ...(formData.serviceType.includes('towing') ? [
                  { label: 'Vehicle Type', key: 'vehicleType' },
                  { label: 'Vehicle Registration', key: 'vehicleRegistration' },
                  { label: 'Vehicle Capacity', key: 'vehicleCapacity' }
                ] : [])
              ]} />

              <div className="review-section">
                <h3>Documents Uploaded</h3>
                <div className="review-grid">
                  <div className="review-item">
                    <strong>National ID:</strong> {formData.idDocumentUrl ? '✅ Uploaded' : '❌ Missing'}
                  </div>
                  <div className="review-item">
                    <strong>Certifications:</strong> {formData.certificationDocumentUrl ? '✅ Uploaded' : '❌ Missing'}
                  </div>
                  {formData.serviceType.includes('towing') && (
                    <div className="review-item">
                      <strong>Vehicle Documents:</strong> {formData.vehicleDocumentUrl ? '✅ Uploaded' : '❌ Missing'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="terms-agreement">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  I certify that all information provided is accurate and complete. 
                  I agree to the <a href="/terms" target="_blank">Terms of Service</a> and 
                  <a href="/privacy" target="_blank"> Privacy Policy</a>.
                </span>
              </label>
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="btn-prev">
                ← Previous
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={loading || !formData.idDocumentUrl || !formData.certificationDocumentUrl}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

// Document Upload Component
const DocumentUpload = ({ title, description, onFileUpload, uploadStatus, required = true }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="document-upload">
      <div className="upload-icon">
        {uploadStatus === 'success' ? '✅' : 
         uploadStatus === 'uploading' ? '⏳' : 
         uploadStatus === 'error' ? '❌' : '📄'}
      </div>
      <h3>{title} {required && '*'}</h3>
      <p>{description}</p>
      
      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileChange}
        className="file-input"
        id={`file-${title}`}
      />
      
      <label htmlFor={`file-${title}`} className="upload-btn">
        {uploadStatus === 'uploading' ? 'Uploading...' : 
         uploadStatus === 'success' ? 'Change File' : 
         uploadStatus === 'error' ? 'Try Again' : 'Choose File'}
      </label>
      
      {uploadStatus === 'error' && (
        <p className="upload-error">Upload failed. Please try again.</p>
      )}
    </div>
  );
};

// Review Section Component
const ReviewSection = ({ title, data, fields }) => (
  <div className="review-section">
    <h3>{title}</h3>
    <div className="review-grid">
      {fields.map(({ label, key, format }) => (
        <div key={key} className="review-item">
          <strong>{label}:</strong> {format ? format(data[key]) : data[key] || 'Not provided'}
        </div>
      ))}
    </div>
  </div>
);

export default ProviderApplication;