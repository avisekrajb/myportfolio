const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/', contactController.createContact);

// Protected routes (admin only)
router.get('/', authenticate, contactController.getAllContacts);
router.get('/stats', authenticate, contactController.getContactStats);
router.get('/:id', authenticate, contactController.getContact);
router.put('/:id', authenticate, contactController.updateContact);
router.delete('/:id', authenticate, contactController.deleteContact);

module.exports = router;