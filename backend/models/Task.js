import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  time: {
    type: String, 
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'bg-blue-100',
  },
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
