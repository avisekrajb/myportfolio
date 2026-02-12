const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, name: 1 });
    
    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills',
      error: error.message
    });
  }
};

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Private
exports.getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skill',
      error: error.message
    });
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Skill with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error creating skill',
      error: error.message
    });
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating skill',
      error: error.message
    });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting skill',
      error: error.message
    });
  }
};

// @desc    Seed default skills
// @route   POST /api/skills/seed
// @access  Private (admin only)
exports.seedSkills = async (req, res) => {
  try {
    const defaultSkills = [
      { name: "React.js / Next.js", pct: 88, color: "#61dafb", icon: "Layout", order: 1, category: "frontend" },
      { name: "JavaScript / TypeScript", pct: 85, color: "#f9ca24", icon: "Code", order: 2, category: "frontend" },
      { name: "Python", pct: 82, color: "#4584b6", icon: "Terminal", order: 3, category: "backend" },
      { name: "Node.js / Express", pct: 76, color: "#68a063", icon: "Server", order: 4, category: "backend" },
      { name: "SQL / MongoDB", pct: 73, color: "#ff6b9d", icon: "Database", order: 5, category: "database" },
      { name: "Git / Linux / DevOps", pct: 78, color: "#f05133", icon: "GitBranch", order: 6, category: "devops" }
    ];

    await Skill.deleteMany({});
    const skills = await Skill.insertMany(defaultSkills);

    res.json({
      success: true,
      message: 'Default skills seeded successfully',
      count: skills.length,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding skills',
      error: error.message
    });
  }
};