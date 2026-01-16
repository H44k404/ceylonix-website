// ========================================
// CONTACT ROUTES
// Handle contact form submissions and contact management
// ========================================

const express = require('express');
const router = express.Router();

// Import shared utilities
const { readData, writeData, EMAIL_CONFIG, transporter } = require('../utils/shared');

// ========================================
// CONTACT FORM - Handle Contact Form Submissions
// ========================================
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Detailed validation with specific error messages
    const errors = [];

    if (!name || name.trim().length === 0) {
      errors.push('Full Name is required');
    } else if (name.trim().length < 2) {
      errors.push('Full Name must be at least 2 characters');
    }

    if (!email || email.trim().length === 0) {
      errors.push('Email Address is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Please provide a valid Email Address');
      }
    }

    if (!message || message.trim().length === 0) {
      errors.push('Message is required');
    } else if (message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    // Return errors if any validation failed
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the following errors:',
        errors: errors
      });
    }

    // Email options
    const mailOptions = {
      from: EMAIL_CONFIG.user,
      to: EMAIL_CONFIG.recipient,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Sent from Ceylonix.CMB Website</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Save to database (JSON file)
    const contacts = readData('contacts.json');
    contacts.push({
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString(),
      status: 'new'
    });
    writeData('contacts.json', contacts);

    res.json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
});

// ========================================
// GET ALL CONTACTS - Admin endpoint to view all contacts
// ========================================
router.get('/contacts', (req, res) => {
  try {
    const contacts = readData('contacts.json');
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
});

module.exports = router;