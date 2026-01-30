// ========================================
// SECURITY UTILITIES
// Input validation, sanitization, and protection
// ========================================

import DOMPurify from 'dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML brackets
    .substring(0, 500); // Limit length
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format and protocol
 * @param {string} url - URL to validate
 * @returns {boolean} - Is valid URL
 */
export const validateUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // Only allow http and https
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Escape HTML entities for safe display
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
export const escapeHtml = (text) => {
  if (typeof text !== 'string') {
    return '';
  }
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (char) => map[char]);
};

/**
 * Sanitize HTML content (removes dangerous scripts/styles)
 * @param {string} dirty - Potentially unsafe HTML
 * @returns {string} - Clean HTML
 */
export const sanitizeHtml = (dirty) => {
  if (typeof dirty !== 'string') {
    return '';
  }
  
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title']
  });
};

/**
 * Validate form data object
 * @param {object} data - Form data to validate
 * @param {object} rules - Validation rules
 * @returns {object} - Validation result { isValid: boolean, errors: object }
 */
export const validateFormData = (data, rules) => {
  const errors = {};
  let isValid = true;

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];

    // Required field
    if (rule.required && (!value || value.trim() === '')) {
      errors[field] = `${rule.label || field} is required`;
      isValid = false;
      continue;
    }

    // Min length
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
      isValid = false;
    }

    // Max length
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} must not exceed ${rule.maxLength} characters`;
      isValid = false;
    }

    // Custom validator function
    if (rule.validator && !rule.validator(value)) {
      errors[field] = rule.message || `${rule.label || field} is invalid`;
      isValid = false;
    }
  }

  return { isValid, errors };
};

/**
 * Create safe API headers with CSRF protection if needed
 * @returns {object} - Request headers
 */
export const getSecureHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };

  // Add token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Sanitize API response data
 * @param {object} data - Response data
 * @param {array} stringFields - Fields that should be strings (auto-escaped)
 * @returns {object} - Sanitized data
 */
export const sanitizeApiResponse = (data, stringFields = []) => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const sanitized = { ...data };

  // Escape string fields to prevent XSS
  stringFields.forEach((field) => {
    if (sanitized[field] && typeof sanitized[field] === 'string') {
      sanitized[field] = escapeHtml(sanitized[field]);
    }
  });

  return sanitized;
};

export default {
  sanitizeInput,
  validateEmail,
  validateUrl,
  escapeHtml,
  sanitizeHtml,
  validateFormData,
  getSecureHeaders,
  sanitizeApiResponse
};
