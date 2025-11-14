import { supabase } from './supabaseClient';

/**
 * Upload a file to Supabase Storage
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadFile = async (file) => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('provider-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('provider-documents')
      .getPublicUrl(filePath);

    return urlData.publicUrl;

  } catch (error) {
    console.error('File upload error:', error);
    throw new Error('Failed to upload file');
  }
};

/**
 * Submit provider application
 * @param {Object} formData - Application form data
 * @returns {Promise<Object>} - {success: boolean, data/error}
 */
export const submitApplication = async (formData) => {
  try {
    const applicationData = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      id_number: formData.idNumber,
      address: formData.address,
      service_type: formData.serviceType,
      years_experience: formData.yearsExperience,
      certifications: formData.certifications,
      specialization: formData.specialization,
      vehicle_type: formData.vehicleType,
      vehicle_registration: formData.vehicleRegistration,
      vehicle_capacity: formData.vehicleCapacity,
      id_document_url: formData.idDocumentUrl,
      certification_document_url: formData.certificationDocumentUrl,
      vehicle_document_url: formData.vehicleDocumentUrl,
      business_license_url: formData.businessLicenseUrl,
      operating_areas: formData.operatingAreas,
      availability: formData.availability,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('provider_applications')
      .insert([applicationData])
      .select();

    if (error) throw error;

    return { success: true, data };

  } catch (error) {
    console.error('Application submission error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all applications (Admin only)
 * @param {string} status - Filter by status (optional)
 * @returns {Promise<Object>}
 */
export const getApplications = async (status = null) => {
  try {
    let query = supabase
      .from('provider_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { success: true, data };

  } catch (error) {
    console.error('Error fetching applications:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get single application by ID
 * @param {string} applicationId
 * @returns {Promise<Object>}
 */
export const getApplicationById = async (applicationId) => {
  try {
    const { data, error } = await supabase
      .from('provider_applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (error) throw error;

    return { success: true, data };

  } catch (error) {
    console.error('Error fetching application:', error);
    return { success: false, error: error.message };
  }
};

// connecting this with dashboard
export const getProviders = async () => {
  try {
    const { data, error } = await supabase
      .from('provider_applications')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching providers:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update application status (Admin only)
 * @param {string} applicationId
 * @param {string} status - 'approved', 'rejected', 'under_review'
 * @param {string} rejectionReason - Optional reason for rejection
 * @returns {Promise<Object>}
 */
export const updateApplicationStatus = async (applicationId, status, rejectionReason = null) => {
  try {
    const updateData = {
      status,
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (rejectionReason) {
      updateData.rejection_reason = rejectionReason;
    }

    const { data, error } = await supabase
      .from('provider_applications')
      .update(updateData)
      .eq('id', applicationId)
      .select();

    if (error) throw error;

    return { success: true, data };

  } catch (error) {
    console.error('Error updating application:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user's own applications by email
 * @param {string} email
 * @returns {Promise<Object>}
 */
export const getUserApplications = async (email) => {
  try {
    const { data, error } = await supabase
      .from('provider_applications')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };

  } catch (error) {
    console.error('Error fetching user applications:', error);
    return { success: false, error: error.message };
  }
};