import React, { useEffect, useState } from 'react';
import axios from 'axios';
import affirmationbg from '../assets/affirmation.png';

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
    <div className="min-h-screen px-6 py-10 bg-yellow-50">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-5xl font-luckiestGuy text-yellow-400">Daily Affirmations</h2>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-5 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          + Add Affirmation
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {affirmations.map((a) => (
          <div
            key={a._id}
            className={`relative p-5 rounded-xl shadow-md ${a.color} text-gray-800 hover:shadow-2xl transition-all duration-200`}
          >
            <h3 className="font-semibold text-lg mb-1">💬 {a.quote}</h3>
            <p className="text-sm text-gray-700"> Chant: <strong>{a.times}</strong></p>
            <p className="text-sm italic text-gray-600"> Day: {a.day}</p>
            <button
              onClick={() => handleDelete(a._id)}
              className="absolute top-2 right-3 text-red-500 hover:text-red-700 text-lg"
              title="Delete affirmation"
            >
              ✕
            </button>
          </div>
        ))}
        {affirmations.length === 0 && (
          <div className="col-span-full text-center text-yellow-400 text-lg font-medium">
            🌤️ No affirmations yet. Add one and watch your mindset grow.
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-yellow-100/60 bg-opacity-30 flex items-center justify-center z-50
        ">
          <div
            className="p-6 rounded-2xl shadow-2xl bg-cover w-100 h-2/3 sm:w-2/3 md:w-1/2 lg:w-1/3 relative"
            style={{
              backgroundImage: `url(${affirmationbg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <h3 className="text-3xl font-luckiestGuy mb-4 text-yellow-500">Add New Affirmation</h3>

            <textarea
              placeholder="✨ Your affirmation quote..."
              className="w-full mb-3 px-4 py-7 border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            />
            <input
              placeholder="🔁 Number of times (e.g., 3 times AM)"
              className="w-full mb-3 px-4 py-2 border border-yellow-300 rounded"
              value={formData.times}
              onChange={(e) => setFormData({ ...formData, times: e.target.value })}
            />
            <select
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              className="w-full mb-4 px-4 py-2 border border-yellow-300 rounded"
            >
              {daysOfWeek.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAffirmation}
                className="px-5 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
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
