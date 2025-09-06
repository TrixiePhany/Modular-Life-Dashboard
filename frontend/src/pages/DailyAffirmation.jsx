import React, { useEffect, useState } from 'react';
import axios from 'axios';
import affirmationbg from '../assets/affirmation.png'
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const pastelColors = ['bg-pink-100', 'bg-amber-200', 'bg-purple-100', 'bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-rose-100', 'bg-cyan-200', 'bg-indigo-100'];

export default function DailyAffirmations() {
  const [affirmations, setAffirmations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    quote: '',
    times: '',
    day: 'Monday',
  });

  const fetchAffirmations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8000/api/affirmations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAffirmations(res.data);
    } catch (err) {
      console.error('Error fetching affirmations:', err);
    }
  };

  const handleAddAffirmation = async () => {
    try {
      const token = localStorage.getItem('token');
      const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      const res = await axios.post('http://localhost:8000/api/affirmations', {
        ...formData,
        color: randomColor,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAffirmations((prev) => [...prev, res.data]);
      setFormData({ quote: '', times: '', day: 'Monday' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding affirmation:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/affirmations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAffirmations((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error('Error deleting affirmation:', err);
    }
  };

  useEffect(() => {
    fetchAffirmations();
  }, []);

  return (
    <div className="min-h-screen px-6 py-8 bg-yellow-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl font-luckiestGuy text-yellow-400">Daily Affirmations:</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
        >
          + Add Affirmation
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {affirmations.map((a) => (
          <div
            key={a._id}
            className={`p-4 rounded shadow-md ${a.color} text-gray-800 relative`}
          >
            <h3 className="font-semibold mb-1">{a.quote}</h3>
            <p className="text-sm">Chant: {a.times}</p>
            <p className="text-sm italic">Day: {a.day}</p>
            <button
              onClick={() => handleDelete(a._id)}
              className="absolute top-2 right-3 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-yellow-100/60 bg-opacity-40 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg shadow-lg bg-cover h-2/3 w-1/3"
          style={{
                  backgroundImage: `url(${affirmationbg})`
                }}>
            <h3 className="text-3xl font-luckiestGuy mb-4 text-yellow-500">Adding New Affirmation</h3>
            <textarea
              placeholder="Your affirmation quote..."
              className="w-full mb-3 px-3 py-2 border rounded"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            />
            <input
              placeholder="Number of times (e.g., 3 times AM)"
              className="w-full mb-3 px-3 py-2 border rounded"
              value={formData.times}
              onChange={(e) => setFormData({ ...formData, times: e.target.value })}
            />
            <select
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded"
            >
              {daysOfWeek.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAffirmation}
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
