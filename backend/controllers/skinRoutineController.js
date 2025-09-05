import { SkinRoutine } from '../models/SkinRoutine.js';

export const getRoutine = async (req, res) => {
  try {
    const routine = await SkinRoutine.find({ user: req.user._id });
    res.status(200).json(routine);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch routines.' });
  }
};

export const saveRoutine = async (req, res) => {
  const { day, dayRoutine, nightRoutine } = req.body;

  if (!day) return res.status(400).json({ message: 'Day is required' });

  try {
    const existing = await SkinRoutine.findOne({ user: req.user._id, day });

    if (existing) {
      existing.dayRoutine = dayRoutine;
      existing.nightRoutine = nightRoutine;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newRoutine = new SkinRoutine({
      user: req.user._id,
      day,
      dayRoutine,
      nightRoutine
    });

    const saved = await newRoutine.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save routine.' });
  }
};
