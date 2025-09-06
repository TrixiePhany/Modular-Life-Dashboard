import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  date: { type: String, required: true }, 
  completed: { type: Boolean, default: false },
});

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    frequency: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }],
    startDate: {
      type: Date,
      default: Date.now,
    },
    color: {
      type: String,
      default: '#f9a8d4',
    },
    icon: {
      type: String,
      default: '🌱',
    },
    progress: [progressSchema],
  },
  { timestamps: true }
);

export const Habit = mongoose.model('Habit', habitSchema);
