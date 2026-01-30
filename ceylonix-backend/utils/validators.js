// ========================================
// INPUT VALIDATION UTILITIES
// Centralized validation rules for security
// ========================================

const { body } = require('express-validator');

// Escape HTML to prevent XSS
const escapeHtml = (text) => {
  if (!text) return text;
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
};

// Sanitize input string
const sanitizeString = (str, maxLength = 255) => {
  return str
    .trim()
    .substring(0, maxLength)
    .replace(/[^\w\s\-.,!?@'()&]/g, '');
};

// Contact form validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// Booking form validation rules
const bookingValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .matches(/^[\d\s\-+()]{7,}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('serviceType')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Service type is required'),
  
  body('eventDate')
    .trim()
    .isISO8601()
    .withMessage('Invalid date format'),
  
  body('eventTime')
    .optional()
    .trim()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid time format'),
  
  body('duration')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 }),
  
  body('guestCount')
    .optional()
    .isNumeric()
    .withMessage('Guest count must be a number'),
  
  body('budget')
    .optional()
    .trim()
    .isLength({ max: 100 }),
  
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Special requests must not exceed 500 characters')
];

// Testimonial validation rules
const testimonialValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('role')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Role must not exceed 100 characters'),
  
  body('text')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Testimonial must be between 10 and 500 characters'),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
];

// Portfolio validation rules
const portfolioValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  
  body('category')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Category must be between 1 and 50 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  body('embedUrl')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid URL format for embedUrl'),
  
  body('platform')
    .optional()
    .trim()
    .isLength({ max: 50 }),
  
  body('type')
    .optional()
    .isIn(['photo', 'video', 'embed'])
    .withMessage('Invalid type value')
];

module.exports = {
  escapeHtml,
  sanitizeString,
  contactValidation,
  bookingValidation,
  testimonialValidation,
  portfolioValidation
};
