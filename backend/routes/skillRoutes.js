const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/', skillController.getSkills);

// Protected routes (admin only)
router.post('/', authenticate, skillController.createSkill);
router.get('/:id', authenticate, skillController.getSkill);
router.put('/:id', authenticate, skillController.updateSkill);
router.delete('/:id', authenticate, skillController.deleteSkill);
router.post('/seed', authenticate, skillController.seedSkills);

module.exports = router;