const Learning = require('../models/Learning');

// @desc    Get all learning topics
// @route   GET /api/learning
// @access  Public
exports.getLearningTopics = async (req, res) => {
  try {
    const topics = await Learning.find({ category: 'learning' }).sort({ order: 1, name: 1 });
    
    res.json({
      success: true,
      count: topics.length,
      data: topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching learning topics',
      error: error.message
    });
  }
};

// @desc    Get all topics (admin)
// @route   GET /api/learning/all
// @access  Private
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Learning.find().sort({ category: 1, order: 1, name: 1 });
    
    res.json({
      success: true,
      count: topics.length,
      data: topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching topics',
      error: error.message
    });
  }
};

// @desc    Get single topic
// @route   GET /api/learning/:id
// @access  Private
exports.getTopic = async (req, res) => {
  try {
    const topic = await Learning.findById(req.params.id);
    
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }
    
    res.json({
      success: true,
      data: topic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching topic',
      error: error.message
    });
  }
};

// @desc    Create new learning topic
// @route   POST /api/learning
// @access  Private
exports.createTopic = async (req, res) => {
  try {
    const topic = await Learning.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Learning topic created successfully',
      data: topic
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Topic with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating learning topic',
      error: error.message
    });
  }
};

// @desc    Update learning topic
// @route   PUT /api/learning/:id
// @access  Private
exports.updateTopic = async (req, res) => {
  try {
    const topic = await Learning.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Learning topic updated successfully',
      data: topic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating learning topic',
      error: error.message
    });
  }
};

// @desc    Delete learning topic
// @route   DELETE /api/learning/:id
// @access  Private
exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Learning.findByIdAndDelete(req.params.id);
    
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Learning topic deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting learning topic',
      error: error.message
    });
  }
};

// @desc    Seed default learning topics
// @route   POST /api/learning/seed
// @access  Private (admin only)
exports.seedTopics = async (req, res) => {
  try {
    const defaultTopics = [
      { name: "React Native", category: "learning", progress: 65, order: 1 },
      { name: "GraphQL", category: "learning", progress: 40, order: 2 },
      { name: "Microservices", category: "learning", progress: 30, order: 3 },
      { name: "Web3", category: "learning", progress: 25, order: 4 },
      { name: "Machine Learning", category: "learning", progress: 20, order: 5 }
    ];

    await Learning.deleteMany({});
    const topics = await Learning.insertMany(defaultTopics);

    res.json({
      success: true,
      message: 'Default learning topics seeded successfully',
      count: topics.length,
      data: topics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding learning topics',
      error: error.message
    });
  }
};