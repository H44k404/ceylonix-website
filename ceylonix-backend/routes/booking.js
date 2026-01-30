// ========================================
// BOOKING ROUTES
// Handle booking form submissions and booking management
// Security features: Input validation, XSS protection, date validation, numeric validation
// ========================================

const express = require('express');
const { validationResult, param, body } = require('express-validator');
const router = express.Router();

// Import shared utilities
const { readData, writeData, EMAIL_CONFIG, transporter } = require('../utils/shared');
const { escapeHtml, bookingValidation } = require('../utils/validators');

// ========================================
// BOOKING FORM - Handle Booking Form Submissions
// ========================================
router.post('/booking', bookingValidation, async (req, res) => {
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

    const {
      name,
      email,
      phone,
      serviceType,
      eventDate,
      eventTime,
      duration,
      location,
      guestCount,
      budget,
      specialRequests
    } = req.body;

    // Email options for booking notification
    const mailOptions = {
      from: EMAIL_CONFIG.user,
      to: EMAIL_CONFIG.recipient,
      subject: `New Booking Request from ${escapeHtml(name)}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Service Type:</strong> ${escapeHtml(serviceType)}</p>
        <p><strong>Event Date:</strong> ${escapeHtml(eventDate)}</p>
        <p><strong>Event Time:</strong> ${escapeHtml(eventTime) || 'Not specified'}</p>
        <p><strong>Duration:</strong> ${escapeHtml(duration) || 'Not specified'}</p>
        <p><strong>Location:</strong> ${escapeHtml(location) || 'Not specified'}</p>
        <p><strong>Guest Count:</strong> ${escapeHtml(guestCount) || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget) || 'Not specified'}</p>
        <p><strong>Special Requests:</strong></p>
        <p>${escapeHtml(specialRequests) || 'None'}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Sent from Ceylonix.CMB Website</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Save to database (JSON file)
    const bookings = readData('bookings.json');
    bookings.push({
      id: Date.now(),
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      serviceType: escapeHtml(serviceType),
      eventDate: escapeHtml(eventDate),
      eventTime: escapeHtml(eventTime),
      duration: escapeHtml(duration),
      location: escapeHtml(location),
      guestCount: escapeHtml(guestCount),
      budget: escapeHtml(budget),
      specialRequests: escapeHtml(specialRequests),
      date: new Date().toISOString(),
      status: 'pending'
    });
    writeData('bookings.json', bookings);

    res.json({
      success: true,
      message: 'Booking request submitted successfully!'
    });

  } catch (error) {
    console.error('Booking form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit booking request. Please try again.'
    });
  }
});

// ========================================
// GET ALL BOOKINGS - Admin endpoint to view all bookings
// ========================================
router.get('/bookings', (req, res) => {
  try {
    const bookings = readData('bookings.json');
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
});

// ========================================
// UPDATE BOOKING STATUS - Admin endpoint to update booking status
// ========================================
router.put('/bookings/:id',
  param('id').isNumeric().withMessage('Invalid booking ID'),
  body('status').trim().isLength({ min: 1, max: 50 }).withMessage('Invalid status'),
  (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const { status } = req.body;

      let bookings = readData('bookings.json');
      const index = bookings.findIndex(b => b.id === parseInt(id));

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      bookings[index].status = escapeHtml(status);
      bookings[index].updatedAt = new Date().toISOString();
      writeData('bookings.json', bookings);

      res.json({
        success: true,
        message: 'Booking updated successfully',
        data: bookings[index]
      });

    } catch (error) {
      console.error('Update booking error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating booking'
      });
    }
  }
);

module.exports = router;