const mongoose = require('mongoose');

const learningSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Learning topic name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['learning', 'upcoming', 'completed'],
    default: 'learning'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
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

learningSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Learning', learningSchema);