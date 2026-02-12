const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/', projectController.getProjects);

// Protected routes (admin only)
router.post('/', authenticate, projectController.createProject);
router.get('/:id', authenticate, projectController.getProject);
router.put('/:id', authenticate, projectController.updateProject);
router.delete('/:id', authenticate, projectController.deleteProject);
router.post('/seed', authenticate, projectController.seedProjects);

module.exports = router;