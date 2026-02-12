const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/', learningController.getLearningTopics);

// Protected routes (admin only)
router.get('/all', authenticate, learningController.getAllTopics);
router.post('/', authenticate, learningController.createTopic);
router.get('/:id', authenticate, learningController.getTopic);
router.put('/:id', authenticate, learningController.updateTopic);
router.delete('/:id', authenticate, learningController.deleteTopic);
router.post('/seed', authenticate, learningController.seedTopics);

module.exports = router;