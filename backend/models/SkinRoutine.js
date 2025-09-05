import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },  
  color: { type: String, default: 'white' }
});

const dayRoutineSchema = new mongoose.Schema({
  day: { type: String, required: true },  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dayRoutine: [productSchema],
  nightRoutine: [productSchema]
}, { timestamps: true });

export const SkinRoutine = mongoose.model('SkinRoutine', dayRoutineSchema);