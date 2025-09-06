import mongoose from 'mongoose';

const affirmationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  times: {
    type: String, 
    required: true,
  },
  day: {
    type: String, 
    required: true,
  },
  color: {
    type: String, 
    required: true,
  }
}, { timestamps: true });

export const Affirmation = mongoose.model('Affirmation', affirmationSchema);