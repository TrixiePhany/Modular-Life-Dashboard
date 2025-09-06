import {Habit} from '../models/Habit.js'

export const createHabit = async (req, res) => {
  const { title, color, icon, frequency } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Habit title is required' });
  }

  try {
    const habit = new Habit({
      user: req.user._id,
      title,
      color: color || 'pink',
      icon: icon || '',
      frequency: frequency || [],
    });

    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
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
  const { date } = req.body;

  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const isoDate = new Date(date).toISOString().split('T')[0];

    const existingEntryIndex = habit.progress.findIndex((p) => {
      const progressDate = new Date(p.date).toISOString().split('T')[0];
      return progressDate === isoDate;
    });

    if (existingEntryIndex !== -1) {
      habit.progress.splice(existingEntryIndex, 1);
    } else {
      habit.progress.push({ date: new Date(date), completed: true });
    }

    const updated = await habit.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error in toggleCompletion:', err.message);
    res.status(500).json({ message: 'Failed to update progress', error: err.message });
  }
};