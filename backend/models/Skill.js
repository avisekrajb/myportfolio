const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true
  },
  pct: {
    type: Number,
    required: [true, 'Proficiency percentage is required'],
    min: 0,
    max: 100,
    default: 50
  },
  color: {
    type: String,
    default: '#61dafb'
  },
  icon: {
    type: String,
    default: 'Code'
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops', 'tools'],
    default: 'frontend'
  },
  order: {
    type: Number,
    default: 0
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

skillSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Skill', skillSchema);