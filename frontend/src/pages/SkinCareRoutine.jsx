import React, { useEffect, useState } from 'react';
import axios from 'axios';
import skingbg from '../assets/skinbg.png'
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const colorTags = ['pink', 'ellow', 'blue', 'green', 'purple'];

export default function SkinCareRoutine() {
  const [activeDay, setActiveDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [routineData, setRoutineData] = useState({});
  const [formData, setFormData] = useState({ name: '', type: '', color: 'pink' });
  const [editIndex, setEditIndex] = useState(null);
  const [editingSection, setEditingSection] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch routine 
  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/skinroutine', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const organized = {};
        res.data.forEach(item => {
          organized[item.day] = {
            dayRoutine: item.dayRoutine,
            nightRoutine: item.nightRoutine,
            _id: item._id
          };
        });

        setRoutineData(organized);
      } catch (err) {
        console.error('Error fetching routine:', err);
      }
    };

    fetchRoutine();
  }, [token]);

  const handleOpenModal = (day) => {
    setActiveDay(day);
    setModalOpen(true);
    setFormData({ name: '', type: '', color: 'pink' });
    setEditIndex(null);
    setEditingSection(null);
  };

  const handleAddOrUpdateProduct = (section) => {
    const updated = { ...routineData };
    const currentDay = updated[activeDay] || { dayRoutine: [], nightRoutine: [] };
    const list = [...currentDay[section]];

    if (editIndex !== null) {
      list[editIndex] = { ...formData };
    } else {
      list.push({ ...formData });
    }

    currentDay[section] = list;
    updated[activeDay] = currentDay;

    setRoutineData(updated);
    setFormData({ name: '', type: '', color: 'pink' });
    setEditIndex(null);
    setEditingSection(null);
  };

  const handleSaveToDB = async () => {
    const current = routineData[activeDay];
    try {
      await axios.post('http://localhost:8000/api/skinroutine', {
        day: activeDay,
        dayRoutine: current.dayRoutine,
        nightRoutine: current.nightRoutine
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setModalOpen(false);
    } catch (err) {
      console.error('Error saving routine:', err);
    }
  };

  const handleEdit = (section, idx) => {
    const item = routineData[activeDay][section][idx];
    setFormData(item);
    setEditIndex(idx);
    setEditingSection(section);
  };

  const handleDelete = (section, idx) => {
    const updated = { ...routineData };
    const list = [...routineData[activeDay][section]];
    list.splice(idx, 1);
    updated[activeDay][section] = list;
    setRoutineData(updated);
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-purple-100">
      <h2 className="text-5xl font-luckiestGuy text-left mb-6 text-purple-500">Skin Care Routine</h2>

      <div className="grid gap-3 px-7">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => handleOpenModal(day)}
            className="bg-white border-3 border-purple-300 hover:bg-purple-100 text-purple-700 font-semibold py-7 px-3 rounded-xl shadow"
          >
            {day}
          </button>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0  bg-purple-100 bg-opacity-40 flex items-center justify-center z-50">
          <div className=" rounded-lg h-180 w-300  bg-cover shadow-xl p-6  "
           style={{
                            backgroundImage: `url(${skingbg})`
                          }}>
            <div className="flex justify-between mb-4">
              <h3 className="text-3xl font-luckiestGuy text-purple-600">{activeDay}'s Routine</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-600 hover:text-red-500">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['dayRoutine', 'nightRoutine'].map((section) => (
                <div key={section}>
                  <h4 className="text-2xl font-luckiestGuy mb-2 text-purple-600">
                    {section === 'dayRoutine' ? 'Day' : 'Night'} Routine
                  </h4>

                  <ul className="mb-4 space-y-1 text-sm">
                    {(routineData[activeDay]?.[section] || []).map((item, idx) => (
                      <li key={idx} className={`flex justify-between items-center border-l-4 p-2 rounded border-${item.color}-400 bg-${item.color}-100`}>
                        <span>{item.name} — <em>{item.type}</em></span>
                        <div className="space-x-2">
                          <button onClick={() => handleEdit(section, idx)} className="text-purple-500 hover:underline">Edit</button>
                          <button onClick={() => handleDelete(section, idx)} className="text-red-500 hover:underline">Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {editingSection === section || editingSection === null ? (
                    <div className="space-y-2 text-white ">
                      <input
                        type="text"
                        placeholder="Product name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-3 px-3 py-2 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Product type (e.g. Cleanser)"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full border-3 px-3 py-2 text-white rounded"
                      />
                      <select
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full border-3 px-3 py-2 rounded"
                      >
                        {colorTags.map((color) => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAddOrUpdateProduct(section)}
                        className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500"
                      >
                        {editIndex !== null ? 'Update' : `Add to ${section === 'dayRoutine' ? 'Day' : 'Night'}`}
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSaveToDB}
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
              >
                Save All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
