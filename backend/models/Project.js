const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  ti: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  desc: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  c: {
    type: String,
    default: '#7c6fff'
  },
  grad: {
    type: String,
    default: 'linear-gradient(135deg,#667eea,#764ba2)'
  },
  stars: {
    type: Number,
    default: 0
  },
  img: {
    type: String,
    default: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80'
  },
  live: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['fullstack', 'frontend', 'mobile', 'tools', 'ai'],
    default: 'fullstack'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);