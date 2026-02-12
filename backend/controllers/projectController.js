const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public/Private (admin only for all, public for live only)
exports.getProjects = async (req, res) => {
  try {
    const { admin } = req.query;
    let query = {};
    
    // If not admin request, only show live projects
    if (admin !== 'true') {
      query.live = true;
    }
    
    const projects = await Project.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

// @desc    Seed default projects
// @route   POST /api/projects/seed
// @access  Private (admin only)
exports.seedProjects = async (req, res) => {
  try {
    const defaultProjects = [
      {
        ti: "EduNepal Platform",
        desc: "Full-stack e-learning platform for Nepali students with video courses, quizzes, progress tracking & bilingual UI.",
        tags: ["React", "Node.js", "MongoDB", "JWT"],
        c: "#7c6fff",
        grad: "linear-gradient(135deg,#667eea,#764ba2)",
        stars: 142,
        img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
        live: true,
        category: "fullstack"
      },
      {
        ti: "CodeTrack CLI",
        desc: "Open-source CLI tool for tracking daily coding streaks, syncing with GitHub activity, and sending motivational alerts.",
        tags: ["Python", "CLI", "GitHub API", "SQLite"],
        c: "#00d4aa",
        grad: "linear-gradient(135deg,#00d4aa,#0096c7)",
        stars: 387,
        img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        live: false,
        category: "tools"
      },
      {
        ti: "NepalWeather PWA",
        desc: "Beautiful weather PWA with hyper-local Nepali city data, 7-day forecasts, dynamic animations & offline support.",
        tags: ["React", "PWA", "OpenWeather", "Workbox"],
        c: "#ff6b9d",
        grad: "linear-gradient(135deg,#f093fb,#f5576c)",
        stars: 98,
        img: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&q=80",
        live: true,
        category: "frontend"
      },
      {
        ti: "Kanban Pro",
        desc: "Real-time collaborative kanban board with drag-and-drop, team assignments, priority labels & live cursor tracking.",
        tags: ["Next.js", "WebSockets", "Prisma", "Redis"],
        c: "#ffb547",
        grad: "linear-gradient(135deg,#f9ca24,#f0932b)",
        stars: 215,
        img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
        live: true,
        category: "fullstack"
      },
      {
        ti: "Bhasa Translator",
        desc: "AI-powered Nepali ↔ English translator with custom fine-tuned model & idiomatic expression handling.",
        tags: ["Python", "FastAPI", "ML", "React"],
        c: "#7c6fff",
        grad: "linear-gradient(135deg,#4facfe,#00f2fe)",
        stars: 174,
        img: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
        live: false,
        category: "ai"
      },
      {
        ti: "FinTrack Mobile",
        desc: "Cross-platform mobile finance tracker with expense categorization, budget alerts & beautiful insight visualizations.",
        tags: ["React Native", "Firebase", "Charts", "AI"],
        c: "#ff6b9d",
        grad: "linear-gradient(135deg,#a18cd1,#fbc2eb)",
        stars: 203,
        img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
        live: false,
        category: "mobile"
      }
    ];

    await Project.deleteMany({});
    const projects = await Project.insertMany(defaultProjects);

    res.json({
      success: true,
      message: 'Default projects seeded successfully',
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error seeding projects',
      error: error.message
    });
  }
};