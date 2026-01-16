// ========================================
// CEYLONIX.CMB BACKEND SERVER
// Modular Express Server with Organized Routes
// ========================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// CORS CONFIGURATION
// ========================================
const allowedOrigins = [
  'http://localhost:3000',
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
// MIDDLEWARE SETUP
// ========================================
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

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
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
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
  📍 Server: http://localhost:${PORT}
  📧 Email: ${process.env.EMAIL_USER || 'Not configured'}
  📁 Uploads: ./uploads
  📊 Data: ./data
  ========================================
  `);
});

module.exports = app;