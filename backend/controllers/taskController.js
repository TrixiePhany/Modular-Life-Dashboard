import { Task } from '../models/Task.js';
import jwt from "jsonwebtoken";
//  Get all
export const getTasks = async (req, res) => {
  try {
    const { date, completed } = req.query;
    const filter = { user: req.user._id };
    if (date) filter.date = date;
    if (completed) filter.completed = completed === 'true';

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};
// new task
export const createTask = async (req, res) => {
  try {
    const { title, note, time, date, color } = req.body;
    if (!title || !time || !date) {
      return res.status(400).json({ message: 'Title, time and date are required' });
    }

    const task = new Task({
      user: req.user._id,
      title,
      note,
      time,
      date,
      color: color || 'bg-blue-100',
    });

    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    Object.assign(task, req.body);
    const updated = await task.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

//delete 
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};