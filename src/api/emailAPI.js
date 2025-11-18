const API_URL = 'http://localhost:5000/api';

/**
 * Send approval email
 */
export const sendApprovalEmail = async (template, applicantData) => {
  try {
    const response = await fetch(`${API_URL}/send-approval-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        template,
        applicantData 
      })
    });

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error calling approval email API:', error);
    return { 
      success: false, 
      error: 'Failed to connect to email service. Make sure backend is running.' 
    };
  }
};

/**
 * Send rejection email
 */
export const sendRejectionEmail = async (template, applicantData, rejectionReason) => {
  try {
    const response = await fetch(`${API_URL}/send-rejection-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        template,
        applicantData, 
        rejectionReason 
      })
    });

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error calling rejection email API:', error);
    return { 
      success: false, 
      error: 'Failed to connect to email service. Make sure backend is running.' 
    };
  }
};