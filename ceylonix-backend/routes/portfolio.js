// ========================================
// PORTFOLIO ROUTES
// Handle portfolio item management and image uploads
// ========================================

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Import shared utilities
const { readData, writeData } = require('../utils/shared');

// ========================================
// FILE UPLOAD CONFIGURATION
// ========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/portfolio';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and videos are allowed.'));
    }
  }
});

// ========================================
// GET ALL PORTFOLIO ITEMS
// ========================================
router.get('/portfolio', (req, res) => {
  try {
    const portfolio = readData('portfolio.json');
    res.json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching portfolio' });
  }
});

// ========================================
// ADD PORTFOLIO ITEM (with image upload)
// ========================================
router.post('/portfolio', upload.single('image'), (req, res) => {
  try {
    const { title, category, type, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required'
      });
    }

    const portfolio = readData('portfolio.json');
    const newItem = {
      id: Date.now(),
      title,
      category,
      type: type || 'photo',
      description: description || '',
      image: `/uploads/portfolio/${req.file.filename}`,
      createdAt: new Date().toISOString()
    };

    portfolio.push(newItem);
    writeData('portfolio.json', portfolio);

    res.json({
      success: true,
      message: 'Portfolio item added successfully',
      data: newItem
    });

  } catch (error) {
    console.error('Add portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding portfolio item'
    });
  }
});

// ========================================
// DELETE PORTFOLIO ITEM
// ========================================
router.delete('/portfolio/:id', (req, res) => {
  try {
    const { id } = req.params;
    let portfolio = readData('portfolio.json');

    const item = portfolio.find(p => p.id === parseInt(id));
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    // Delete image file
    const imagePath = path.join(__dirname, '..', item.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    portfolio = portfolio.filter(p => p.id !== parseInt(id));
    writeData('portfolio.json', portfolio);

    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });

  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting portfolio item'
    });
  }
});

module.exports = router;