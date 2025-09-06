import { Affirmation } from '../models/Affirmation.js';

export const getAffirmations = async (req, res) => {
  try {
    const affirmations = await Affirmation.find({ user: req.user._id });
    res.status(200).json(affirmations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch affirmations" });
  }
};

export const createAffirmation = async (req, res) => {
  const { quote, times, day, color } = req.body;
  if (!quote || !times || !day || !color) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const affirmation = new Affirmation({
      user: req.user._id,
      quote,
      times,
      day,
      color
    });

    const saved = await affirmation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create affirmation" });
  }
};

export const deleteAffirmation = async (req, res) => {
  try {
    const affirmation = await Affirmation.findById(req.params.id);
    if (!affirmation || affirmation.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Affirmation not found' });
    }

    await affirmation.remove();
    res.status(200).json({ message: 'Affirmation deleted' });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete affirmation" });
  }
};
