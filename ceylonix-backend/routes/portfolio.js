// ========================================
// PORTFOLIO ROUTES
// Handle portfolio item management and image uploads
// Security features: Input validation, file upload security, XSS protection
// ========================================

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();

// Import shared utilities
const { readData, writeData } = require('../utils/shared');

// Security utility function to escape HTML
const escapeHtml = (text) => {
  if (!text) return text;
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
};

// Validation middleware for portfolio inputs
const validatePortfolioInput = [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('category').trim().isLength({ min: 1, max: 50 }).withMessage('Category must be between 1 and 50 characters'),
  body('description').trim().isLength({ max: 500 }).withMessage('Description must not exceed 500 characters'),
  body('embedUrl').optional().trim().isURL().withMessage('Invalid URL format for embedUrl'),
  body('platform').optional().trim().isLength({ max: 50 }).withMessage('Platform must not exceed 50 characters'),
  body('type').optional().isIn(['photo', 'video', 'embed']).withMessage('Invalid type value')
];

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
    // Sanitize filename to prevent path traversal
    const sanitizedName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(sanitizedName);
    cb(null, uniqueName);
  }
});

// Enhanced file upload security
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1 // Only allow 1 file
  },
  fileFilter: (req, file, cb) => {
    // Whitelist file types and MIME types
    const allowedExtensions = /\.(jpeg|jpg|png|gif|webp|mp4|mov)$/i;
    const allowedMimeTypes = /^(image\/(jpeg|png|gif|webp)|video\/(mp4|quicktime))$/;
    
    const extname = allowedExtensions.test(path.extname(file.originalname));
    const mimetype = allowedMimeTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF, WebP) and videos (MP4, MOV) are allowed.'));
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
    console.error('Get portfolio error:', error);
    res.status(500).json({ success: false, message: 'Error fetching portfolio' });
  }
});

// ========================================
// ADD PORTFOLIO ITEM (with image upload OR embed JSON)
// ========================================
router.post('/portfolio', 
  upload.single('image'), 
  validatePortfolioInput,
  (req, res) => {
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

      const { title, category, type, description, embedUrl, thumbnailImage } = req.body;

      // Accept either an uploaded image or an embedUrl (for embeds)
      if (!req.file && !embedUrl) {
        return res.status(400).json({
          success: false,
          message: 'Image or embedUrl is required'
        });
      }

      // Validate embedUrl if provided
      if (embedUrl) {
        try {
          new URL(embedUrl); // Validate URL format
        } catch {
          return res.status(400).json({
            success: false,
            message: 'Invalid embedUrl format'
          });
        }
      }

      const portfolio = readData('portfolio.json');
      const newItem = {
        id: Date.now(),
        title: escapeHtml(title) || 'Untitled',
        category: escapeHtml(category) || 'general',
        type: type || (embedUrl ? 'embed' : 'photo'),
        description: escapeHtml(description) || '',
        image: req.file ? `/uploads/portfolio/${req.file.filename}` : '',
        thumbnailImage: req.file ? `/uploads/portfolio/${req.file.filename}` : (thumbnailImage || ''),
        platform: req.body.platform || (embedUrl ? 'instagram' : ''),
        embedUrl: escapeHtml(embedUrl) || '',
        isEmbed: !!embedUrl,
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
  }
);

// ========================================
// DELETE PORTFOLIO ITEM
// ========================================
router.delete('/portfolio/:id',
  param('id').isNumeric().withMessage('Invalid portfolio ID'),
  (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Invalid request',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      let portfolio = readData('portfolio.json');

      // Handle both string and number IDs
      const itemIndex = portfolio.findIndex(p => String(p.id) === String(id));
      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Portfolio item not found'
        });
      }

      const item = portfolio[itemIndex];

      // Delete image file if it exists and is a local file (prevent path traversal)
      if (item.image && !item.image.startsWith('http') && item.image.startsWith('/uploads/')) {
        const imagePath = path.join(__dirname, '..', item.image);
        // Ensure the file is in the uploads directory
        const resolvedPath = path.resolve(imagePath);
        const uploadsDir = path.resolve(path.join(__dirname, '..', 'uploads'));
        
        if (resolvedPath.startsWith(uploadsDir) && fs.existsSync(resolvedPath)) {
          try {
            fs.unlinkSync(resolvedPath);
          } catch (fileError) {
            console.warn('Could not delete file:', fileError);
          }
        }
      }

      portfolio.splice(itemIndex, 1);
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
  }
);

module.exports = router;