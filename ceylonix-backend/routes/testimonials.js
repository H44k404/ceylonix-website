// ========================================
// TESTIMONIALS ROUTES
// Handle testimonials management and approval
// ========================================

const express = require('express');
const router = express.Router();

// Import shared utilities
const { readData, writeData } = require('../utils/shared');

// ========================================
// GET ALL TESTIMONIALS
// ========================================
router.get('/testimonials', (req, res) => {
  try {
    const testimonials = readData('testimonials.json');
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching testimonials' });
  }
});

// ========================================
// ADD TESTIMONIAL
// ========================================
router.post('/testimonials', (req, res) => {
  try {
    const { name, role, text, rating } = req.body;

    if (!name || !text || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Name, text, and rating are required'
      });
    }

    const testimonials = readData('testimonials.json');
    const newTestimonial = {
      id: Date.now(),
      name,
      role: role || 'Client',
      text,
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
// UPDATE TESTIMONIAL (Admin approval)
// ========================================
router.put('/testimonials/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    let testimonials = readData('testimonials.json');
    const index = testimonials.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    testimonials[index].approved = approved;
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
});

// ========================================
// DELETE TESTIMONIAL
// ========================================
router.delete('/testimonials/:id', (req, res) => {
  try {
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
});

module.exports = router;