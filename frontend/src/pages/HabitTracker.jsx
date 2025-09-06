import React, { useState, useEffect } from 'react';
import axios from 'axios';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  const token = localStorage.getItem('token');

  const fetchHabits = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/habits', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(res.data);
    } catch (err) {
      console.error('Failed to fetch habits', err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async () => {
    if (!newHabit.trim()) return;
    try {
      const res =  await axios.post(
        'http://localhost:8000/api/habits',
        { name: newHabit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewHabit(res.data);
      fetchHabits();
    } catch (err) {
      console.error('Error adding habit:', err);
    }
  };

  const toggleCompletion = async (habitId, day) => {
    try {
      await axios.put(
        `http://localhost:8000/api/habits/${habitId}/toggle`,
        { day },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchHabits();
    } catch (err) {
      console.error('Error toggling habit:', err);
    }
  };

  const handleDelete = async (habitId) => {
    try {
      await axios.delete(`http://localhost:8000/api/habits/${habitId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHabits();
    } catch (err) {
      console.error('Error deleting habit:', err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-indigo-50">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Habit Tracker</h2>

      {/* Add New Habit */}
      <div className="flex items-center space-x-3 mb-6">
        <input
          type="text"
          placeholder="New habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={handleAddHabit}
          className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-600"
        >
          Add
        </button>
      </div>

      {/* Habit Grid */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Habit</th>
              {weekdays.map((day) => (
                <th key={day} className="px-2 py-2 text-center">{day}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit._id} className="border-t">
                <td className="px-4 py-2 font-medium">{habit.title}</td>
                {weekdays.map((day) => (
                  <td key={day} className="text-center">
                    <input
                      type="checkbox"
                      checked={habit.completed?.includes(day)}
                      onChange={() => toggleCompletion(habit._id, day)}
                    />
                  </td>
                ))}
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

