const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // If there are specific validation errors, format them nicely
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessage = data.errors.join('\n');
        const error = new Error(errorMessage);
        error.errors = data.errors;
        throw error;
      }
      throw new Error(data.message || 'API call failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Contact API
export const contactAPI = {
  submit: (formData) => apiCall('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
};

// Booking API
export const bookingAPI = {
  submit: (formData) => apiCall('/booking', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
  getAll: () => apiCall('/bookings'),
  updateStatus: (id, status) => apiCall(`/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
};

// Portfolio API
export const portfolioAPI = {
  getAll: () => apiCall('/portfolio'),
  add: (formData) => apiCall('/portfolio', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
  delete: (id) => apiCall(`/portfolio/${id}`, {
    method: 'DELETE',
  }),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiCall('/testimonials'),
  add: (formData) => apiCall('/testimonials', {
    method: 'POST',
    body: JSON.stringify(formData),
  }),
  update: (id, updates) => apiCall(`/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
  delete: (id) => apiCall(`/testimonials/${id}`, {
    method: 'DELETE',
  }),
};

// Services API
export const servicesAPI = {
  getAll: () => apiCall('/services'),
  update: (id, updates) => apiCall(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
};

// Health check
export const healthAPI = {
  check: () => apiCall('/health'),
};

export default {
  contactAPI,
  bookingAPI,
  portfolioAPI,
  testimonialsAPI,
  servicesAPI,
  healthAPI,
};