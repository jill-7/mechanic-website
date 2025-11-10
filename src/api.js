// Mock function to simulate API call
const simulateAPICall = (data, success = true, delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({
          success: true,
          data: {
            id: 'mock-' + Date.now(),
            ...data,
            status: 'pending',
            createdAt: new Date().toISOString()
          }
        });
      } else {
        reject(new Error('Mock API error - something went wrong'));
      }
    }, delay);
  });
};

// Mock file upload function
export const uploadFile = async (file) => {
  console.log('Mock uploading file:', file.name);
  await simulateAPICall(null, true, 500);
  
  // Return a mock file URL 
  return `https://mock-storage.com/files/${Date.now()}-${file.name}`;
};

// Submit application to backend
export const submitApplication = async (applicationData) => {
  console.log('Submitting application:', applicationData);
  
  // simulate API call
  return await simulateAPICall(applicationData);
};

// application status 
export const getApplicationStatus = async (applicationId) => {
  return await simulateAPICall({ status: 'under_review' });
};