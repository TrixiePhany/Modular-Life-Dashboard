import React, { useState, useEffect } from 'react';
import axios from 'axios';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [color, setColor] = useState('#fca5a5');
  const [icon, setIcon] = useState('🍊');
  const [selectedDays, setSelectedDays] = useState([]);
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

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleAddHabit = async () => {
    if (!newHabit.trim()) return;
    try {
      await axios.post(
        'http://localhost:8000/api/habits',
        {
          title: newHabit,
          color,
          icon,
          frequency: selectedDays
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewHabit('');
      setSelectedDays([]);
      fetchHabits();
    } catch (err) {
      console.error('Error adding habit:', err);
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
    <div className="min-h-screen px-6 py-10 bg-orange-100">
      <h2 className="text-5xl font-luckiestGuy text-left mb-8 text-orange-500">Habit Tracker:</h2>

      {/* form er Section */}
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter new habit (e.g., Read 20 mins)"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <div className="flex gap-4 items-center">
          <label className="font-medium">Color Tag:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>

        <div className="flex gap-4 items-center">
          <label className="font-medium">Icon:</label>
          <input
            type="text"
            value={icon}
            maxLength={2}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="e.g., ✅"
            className="px-2 py-1 border rounded-md"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {weekdays.map((day) => (
            <button
              key={day}
              onClick={() => handleDayToggle(day)}
              className={`px-3 py-1 rounded-full border ${selectedDays.includes(day) ? 'bg-orange-400 text-white' : 'bg-white text-gray-600'}`}
            >
              {day}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddHabit}
          className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600"
        >
          Add Habit
        </button>
      </div>

      {/* Habit ka List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map(habit => (
          <div key={habit._id} className="p-4 rounded-xl shadow-md" style={{ backgroundColor: habit.color }}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-white">{habit.icon} {habit.title}</h3>
              <button onClick={() => handleDelete(habit._id)} className="text-white text-sm hover:underline">Delete</button>
            </div>
            <div className="flex flex-wrap gap-2 text-white">
              {habit.frequency.map(day => (
                <span key={day} className="bg-white text-orange-500 text-xs px-2 py-1 rounded-full">{day}</span>
              ))}
            </div>
          </div>
        ))}
        {habits.length === 0 && (
          <p className="text-gray-500 text-sm col-span-full">No habits added yet.</p>
        )}
      </div>
    </div>
  );
}
