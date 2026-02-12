const express = require('express');
const router = express.Router();
const path = require('path');

// @desc    Download CV
// @route   GET /api/cv/download
// @access  Public
router.get('/download', (req, res) => {
  const cvPath = path.join(__dirname, '../uploads/abhishekresume.pdf');
  res.download(cvPath, 'abhishekresume.pdf', (err) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: 'CV not found'
      });
    }
  });
});

module.exports = router;