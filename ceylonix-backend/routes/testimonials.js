// ========================================
// TESTIMONIALS ROUTES
// Handle testimonials management and approval
// Security features: Input validation, XSS protection, parameter validation
// ========================================

const express = require('express');
const { validationResult, param, body } = require('express-validator');
const router = express.Router();

// Import shared utilities
const { readData, writeData } = require('../utils/shared');
const { escapeHtml, testimonialValidation } = require('../utils/validators');

// ========================================
// GET ALL TESTIMONIALS
// ========================================
router.get('/testimonials', (req, res) => {
  try {
    const testimonials = readData('testimonials.json');
    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ success: false, message: 'Error fetching testimonials' });
  }
});

// ========================================
// ADD TESTIMONIAL
// ========================================
router.post('/testimonials', testimonialValidation, (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
      });
    }

    const { name, role, text, rating } = req.body;

    const testimonials = readData('testimonials.json');
    const newTestimonial = {
      id: Date.now(),
      name: escapeHtml(name),
      role: escapeHtml(role) || 'Client',
      text: escapeHtml(text),
      rating: parseInt(rating),
      createdAt: new Date().toISOString(),
      approved: false // Needs admin approval
    };

    testimonials.push(newTestimonial);
    writeData('testimonials.json', testimonials);

    res.json({
      success: true,
      message: 'Testimonial submitted successfully',
      data: newTestimonial
    });

  } catch (error) {
    console.error('Add testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding testimonial'
    });
  }
});

// ========================================
// UPDATE TESTIMONIAL (Admin update / approval)
// Accepts updates to name, role, text, rating, and/or approved flag
// ========================================
router.put('/testimonials/:id',
  param('id').isNumeric().withMessage('Invalid testimonial ID'),
  (req, res) => {
    try {
      // Basic param validation
      const errors = validationResult(req);
      // Debug logging to help diagnose 400 responses from admin edits
      console.log('Update testimonial request body:', req.body);
      if (!errors.isEmpty()) {
        console.warn('Validation errors on testimonial update:', errors.array());
      }
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const updates = req.body || {};

      let testimonials = readData('testimonials.json');
      const index = testimonials.findIndex(t => t.id === parseInt(id));

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Testimonial not found'
        });
      }

      // Prepare allowed updates and sanitize
      const allowed = {};
      if (typeof updates.approved !== 'undefined') {
        allowed.approved = !!updates.approved;
      }
      if (typeof updates.name === 'string') {
        allowed.name = escapeHtml(updates.name.trim());
      }
      if (typeof updates.role === 'string') {
        allowed.role = escapeHtml(updates.role.trim());
      }
      if (typeof updates.text === 'string') {
        allowed.text = escapeHtml(updates.text.trim());
      }
      if (typeof updates.rating !== 'undefined') {
        const r = parseInt(updates.rating, 10);
        if (!Number.isNaN(r) && r >= 1 && r <= 5) {
          allowed.rating = r;
        }
      }

      // Apply updates
      testimonials[index] = { ...testimonials[index], ...allowed };
      writeData('testimonials.json', testimonials);

      res.json({
        success: true,
        message: 'Testimonial updated successfully',
        data: testimonials[index]
      });

    } catch (error) {
      console.error('Update testimonial error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating testimonial'
      });
    }
  }
);

// ========================================
// DELETE TESTIMONIAL
// ========================================
router.delete('/testimonials/:id',
  param('id').isNumeric().withMessage('Invalid testimonial ID'),
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
      let testimonials = readData('testimonials.json');

      testimonials = testimonials.filter(t => t.id !== parseInt(id));
      writeData('testimonials.json', testimonials);

      res.json({
        success: true,
        message: 'Testimonial deleted successfully'
      });

    } catch (error) {
      console.error('Delete testimonial error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting testimonial'
      });
    }
  }
);

module.exports = router;