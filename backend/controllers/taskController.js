import { Task } from '../models/Task.js';
import jwt from "jsonwebtoken";
//  Get all
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ date: 1, time: 1 })
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error })
  }
}

// new task
export const createTask = async (req, res) => {
  const { title, note, date, time } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: 'Title and date are required' });
  }

  const task = new Task({
    user: req.user._id,
    title,
    note,
    date,
    time
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

// Update task
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).json(updatedTask);
};

//delete 
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    await task.deleteOne() 

    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (err) {
    console.error('Delete Task Error:', err)
    res.status(500).json({ message: 'Error deleting task', error: err.message })
  }
}