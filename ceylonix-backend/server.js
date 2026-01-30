// ========================================
// CEYLONIX.CMB BACKEND SERVER
// Modular Express Server with Organized Routes
// Security Hardened with Helmet, Rate Limiting, Input Validation
// ========================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// CORS CONFIGURATION
// ========================================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:3005',
  'http://localhost:5000',
  process.env.FRONTEND_URL || 'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// ========================================
// SECURITY MIDDLEWARE SETUP
// ========================================

// Helmet.js for HTTP headers security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// CORS Configuration
app.use(cors(corsOptions));

// Rate limiting middleware - Prevent DoS attacks
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false // Disable `X-RateLimit-*` headers
});

// Stricter rate limiting for sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests to this endpoint, please try again later.',
  skipSuccessfulRequests: true // Don't count successful requests
});

// Apply general rate limiting to all routes
app.use(generalLimiter);

// Body parser middleware with size limits
app.use(express.json({ limit: '10kb' })); // Limit JSON payload to 10kb
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // Limit URL-encoded payloads

// Serve static files (uploaded images) - with security headers
app.use('/uploads', express.static('uploads', {
  maxAge: 86400000, // 24 hours cache
  etag: false // Disable ETag to prevent cache attacks
}));

// ========================================
// ROUTE MODULES
// ========================================
console.log('Loading route modules...');
const contactRoutes = require('./routes/contact');
const bookingRoutes = require('./routes/booking');
const portfolioRoutes = require('./routes/portfolio');
const testimonialsRoutes = require('./routes/testimonials');
const servicesRoutes = require('./routes/services');
console.log('Route modules loaded successfully');

// ========================================
// API ROUTES
// ========================================
app.use('/api', contactRoutes);
app.use('/api', bookingRoutes);
app.use('/api', portfolioRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', servicesRoutes);

// ========================================
// HEALTH CHECK
// ========================================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ========================================
// ERROR HANDLING
// ========================================
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Don't expose error stack in production
  const message = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message;
  
  res.status(err.status || 500).json({
    success: false,
    message: message
  });
});

// ========================================
// 404 HANDLER
// ========================================
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
  console.log(`
  ========================================
  🚀 Ceylonix.CMB Backend Server Running
  ========================================
  🔒 Security Features Enabled:
     ✅ Helmet.js (HTTP headers)
     ✅ CORS protection
     ✅ Rate limiting
     ✅ Input validation
     ✅ XSS protection
     ✅ CSP headers
  📍 Server: http://localhost:${PORT}
  📧 Email: ${process.env.EMAIL_USER || 'Not configured'}
  📁 Uploads: ./uploads
  📊 Data: ./data
  ========================================
  `);
});

module.exports = app;