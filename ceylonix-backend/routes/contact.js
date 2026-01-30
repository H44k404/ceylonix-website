// ========================================
// CONTACT ROUTES
// Handle contact form submissions and contact management
// Security features: Input validation, XSS protection, email validation
// ========================================

const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

// Import shared utilities
const { readData, writeData, EMAIL_CONFIG, transporter } = require('../utils/shared');
const { escapeHtml, contactValidation } = require('../utils/validators');

// ========================================
// CONTACT FORM - Handle Contact Form Submissions
// ========================================
router.post('/contact', contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the following errors:',
        errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
      });
    }

    const { name, email, message } = req.body;

    // Email options - sanitize for email body
    const mailOptions = {
      from: EMAIL_CONFIG.user,
      to: EMAIL_CONFIG.recipient,
      subject: `New Contact Form Submission from ${escapeHtml(name)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
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
      name: escapeHtml(name),
      email: escapeHtml(email),
      message: escapeHtml(message),
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
    console.error('Get contacts error:', error);
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
});

module.exports = router;