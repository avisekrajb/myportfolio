const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '.env.production') });
} else {
  dotenv.config({ path: path.join(__dirname, '.env') });
}

// Import routes
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const learningRoutes = require('./routes/learningRoutes');

// Import database connection
const connectDB = require('./config/database');
const { initializeAdmin } = require('./controllers/adminController');

// Initialize app
const app = express();

// Security middleware - optimized for production
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
}));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CORS_ORIGIN,
      'http://localhost:3000',
      'http://localhost:5000',
      'https://portfolio-frontend.onrender.com',
      'https://portfolio-backend.onrender.com'
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Rate limiting - stricter in production
const limiter = rateLimit({
  windowMs: process.env.NODE_ENV === 'production' ? 15 * 60 * 1000 : 60 * 1000, // 15 minutes in prod, 1 min in dev
  max: process.env.NODE_ENV === 'production' ? 50 : 100, // limit each IP
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parser middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect to database with retry logic
connectDB();

// Initialize admin account
initializeAdmin();

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/learning', learningRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Portfolio API',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version
  });
});

// API Documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Portfolio API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: {
        POST: '/api/contact - Submit contact form',
        GET: '/api/contact - Get all contacts (admin)',
        GET: '/api/contact/:id - Get single contact (admin)',
        PUT: '/api/contact/:id - Update contact status (admin)',
        DELETE: '/api/contact/:id - Delete contact (admin)',
        GET: '/api/contact/stats - Get contact statistics (admin)'
      },
      admin: {
        POST: '/api/admin/login - Admin login',
        GET: '/api/admin/profile - Get admin profile',
        POST: '/api/admin/create - Create new admin (superadmin)'
      },
      projects: {
        GET: '/api/projects - Get all projects',
        GET: '/api/projects/:id - Get single project',
        POST: '/api/projects - Create project (admin)',
        PUT: '/api/projects/:id - Update project (admin)',
        DELETE: '/api/projects/:id - Delete project (admin)'
      },
      skills: {
        GET: '/api/skills - Get all skills',
        GET: '/api/skills/:id - Get single skill',
        POST: '/api/skills - Create skill (admin)',
        PUT: '/api/skills/:id - Update skill (admin)',
        DELETE: '/api/skills/:id - Delete skill (admin)'
      },
      learning: {
        GET: '/api/learning - Get all learning resources',
        GET: '/api/learning/:id - Get single resource',
        POST: '/api/learning - Create resource (admin)',
        PUT: '/api/learning/:id - Update resource (admin)',
        DELETE: '/api/learning/:id - Delete resource (admin)'
      }
    }
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }
  
  // Default error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// 404 handler for all other routes (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
      path: req.originalUrl,
      method: req.method
    });
  });
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, closing server...');
  server.close(() => {
    console.log('💤 Server closed');
    mongoose.connection.close(false, () => {
      console.log('📁 Database connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, closing server...');
  server.close(() => {
    console.log('💤 Server closed');
    mongoose.connection.close(false, () => {
      console.log('📁 Database connection closed');
      process.exit(0);
    });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('\n🚀 ===================================');
  console.log(`   Server running on port ${PORT}`);
  console.log(`   📁 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`   💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log('====================================\n');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err.stack);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('❌ UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

module.exports = server;