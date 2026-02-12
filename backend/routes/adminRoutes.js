const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, isSuperAdmin } = require('../middleware/auth');

// Public routes
router.post('/login', adminController.adminLogin);

// Protected routes
router.get('/profile', authenticate, adminController.getAdminProfile);
router.post('/create', authenticate, isSuperAdmin, adminController.createAdmin);

module.exports = router;