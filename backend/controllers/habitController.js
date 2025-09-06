import {Habit} from '../models/Habit.js'

export const createHabit = async (req, res) => {
  const { name, days } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Habit name is required' });
  }

  try {
    const habit = new Habit({
      title: name,
      user: req.user._id,   // If you're using protect middleware
      days: days || []      // Optional default to []
    });
    console.log("habit", habit)
    const savedHabit = await habit.save();
    console.log({savedHabit})
    res.status(201).json(savedHabit);
  } catch (error) {
    console.error('Error creating habit:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id })
    res.status(200).json(habits)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch habits', error: err.message })
  }
}

export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id)

    if (!habit || habit.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Habit not found' })
    }

    Object.assign(habit, req.body)
    const updated = await habit.save()
    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update habit', error: err.message })
  }
}

export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id)
    console.log(req.body)
    console.log(req.params.id)
    if (!habit ) {
      return res.status(404).json({ message: 'Habit not found' })
    }
    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    await habit.deleteOne();

    res.status(200).json({ message: 'Habit deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete habit', error: err.message })
  }
}

export const toggleCompletion = async (req, res) => {
  const { date } = req.body

  try {
    const habit = await Habit.findById(req.params.id)
    if (!habit || habit.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Habit not found' })
    }

    const exists = habit.progress.includes(date)
    if (exists) {
      habit.progress = habit.progress.filter(d => d !== date)
    } else {
      habit.progress.push(date)
    }

    const updated = await habit.save()
    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update progress', error: err.message })
  }
}