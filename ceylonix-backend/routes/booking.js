// ========================================
// BOOKING ROUTES
// Handle booking form submissions and booking management
// ========================================

const express = require('express');
const router = express.Router();

// Import shared utilities
const { readData, writeData, EMAIL_CONFIG, transporter } = require('../utils/shared');

// ========================================
// BOOKING FORM - Handle Booking Form Submissions
// ========================================
router.post('/booking', async (req, res) => {
  try {
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

    if (!phone || phone.trim().length === 0) {
      errors.push('Phone Number is required');
    } else {
      const phoneRegex = /\d{7,}/;
      if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        errors.push('Please provide a valid Phone Number');
      }
    }

    if (!serviceType) {
      errors.push('Service Type is required');
    }

    if (!eventDate) {
      errors.push('Event Date is required');
    } else {
      const selectedDate = new Date(eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.push('Event Date must be in the future');
      }
    }

    if (guestCount && isNaN(guestCount)) {
      errors.push('Guest Count must be a valid number');
    }

    // Return errors if any validation failed
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the following errors:',
        errors: errors
      });
    }

    // Email options for booking notification
    const mailOptions = {
      from: EMAIL_CONFIG.user,
      to: EMAIL_CONFIG.recipient,
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Event Time:</strong> ${eventTime || 'Not specified'}</p>
        <p><strong>Duration:</strong> ${duration || 'Not specified'}</p>
        <p><strong>Location:</strong> ${location || 'Not specified'}</p>
        <p><strong>Guest Count:</strong> ${guestCount || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Special Requests:</strong></p>
        <p>${specialRequests || 'None'}</p>
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
      specialRequests,
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
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
});

// ========================================
// UPDATE BOOKING STATUS - Admin endpoint to update booking status
// ========================================
router.put('/bookings/:id', (req, res) => {
  try {
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

    bookings[index].status = status;
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
});

module.exports = router;