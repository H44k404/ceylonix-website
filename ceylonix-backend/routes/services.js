// ========================================
// SERVICES ROUTES
// Handle services management and updates
// ========================================

const express = require('express');
const router = express.Router();

// Import shared utilities
const { readData, writeData } = require('../utils/shared');

// ========================================
// GET ALL SERVICES
// ========================================
router.get('/services', (req, res) => {
  try {
    const services = readData('services.json');
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching services' });
  }
});

// ========================================
// UPDATE SERVICE
// ========================================
router.put('/services/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    let services = readData('services.json');
    const index = services.findIndex(s => s.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    services[index] = {
      ...services[index],
      title: title || services[index].title,
      description: description || services[index].description,
      updatedAt: new Date().toISOString()
    };

    writeData('services.json', services);

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: services[index]
    });

  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating service'
    });
  }
});

module.exports = router;