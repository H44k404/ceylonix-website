// ========================================
// SHARED UTILITIES
// Common functions and configurations used across routes
// ========================================

const fs = require('fs');
const nodemailer = require('nodemailer');

// ========================================
// EMAIL CONFIGURATION
// ========================================
const EMAIL_CONFIG = {
  service: process.env.EMAIL_SERVICE,
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD,
  recipient: process.env.EMAIL_RECIPIENT
};

// Create email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.pass
  }
});

// ========================================
// DATA STORAGE UTILITIES
// ========================================

// Helper function to read JSON file
const readData = (filename) => {
  try {
    if (!fs.existsSync(`data/${filename}`)) {
      fs.mkdirSync('data', { recursive: true });
      fs.writeFileSync(`data/${filename}`, JSON.stringify([]));
    }
    const data = fs.readFileSync(`data/${filename}`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

// Helper function to write JSON file
const writeData = (filename, data) => {
  try {
    fs.mkdirSync('data', { recursive: true });
    fs.writeFileSync(`data/${filename}`, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};

module.exports = {
  EMAIL_CONFIG,
  transporter,
  readData,
  writeData
};