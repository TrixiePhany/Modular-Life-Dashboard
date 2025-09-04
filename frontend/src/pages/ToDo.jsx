// src/pages/ToDoList.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import axios from 'axios'

export default function ToDoList() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

  const [newTask, setNewTask] = useState({
    title: '',
    note: '',
    time: '',
  })

  const generateMonthDays = () => {
    const today = dayjs()
    const startOfMonth = today.startOf('month')
    const endOfMonth = today.endOf('month')

    const daysInMonth = []
    for (let i = 0; i < endOfMonth.date(); i++) {
      const current = startOfMonth.add(i, 'day')
      daysInMonth.push({
        day: current.format('ddd'),
        date: current.format('D'),
        fullDate: current.format('YYYY-MM-DD'),
      })
    }
    return daysInMonth
  }

  const calendarDays = generateMonthDays()

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:8000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks(res.data)
    } catch (err) {
      console.error('Error fetching tasks:', err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.time) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        'http://localhost:8000/api/tasks',
        { ...newTask, date: selectedDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setTasks([...tasks, res.data])
    } catch (error) {
      console.error('Error adding task:', error)
    }
    setNewTask({ title: '', note: '', time: '' })
    setShowAddForm(false)
  }

  const handleEditTask = (idx) => {
    setEditingIndex(idx)
    setNewTask(tasks[idx])
    setShowAddForm(true)
  }

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token')
      const taskToUpdate = tasks[editingIndex]
      const res = await axios.put(
        `http://localhost:8000/api/tasks/${taskToUpdate._id}`,
        newTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      const updated = [...tasks]
      updated[editingIndex] = res.data
      setTasks(updated)
    } catch (error) {
      console.error('Error updating task:', error)
    }
    setEditingIndex(null)
    setNewTask({ title: '', note: '', time: '' })
    setShowAddForm(false)
  }

  const handleDeleteTask = async (taskId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this task?')
  if (!confirmDelete) return
    try {
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
        })
        setTasks(tasks.filter((task) => task._id !== taskId))
    } catch (err) {
        console.error('Failed to delete task:', err)
    }
}

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-6">
      {/* Date and Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">ToDo List</h2>
        <div className=" grid grid-cols-5 gap-1 space-x-3 mt-3 overflow-x-auto scrollbar-hide">
          {calendarDays.map((d, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDate(d.fullDate)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl text-sm font-medium cursor-pointer ${
                selectedDate === d.fullDate ? 'bg-purple-400 text-white' : 'bg-white text-gray-700 shadow'
              }`}
            >
              <span>{d.date}</span>
              <span>{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-around text-sm mb-4">
        {['All', 'Complete', 'Active'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full font-medium ${filter === f ? 'bg-purple-300 text-white' : 'bg-white text-gray-600 shadow'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task Cards */}
      {tasks.map((task, idx) => (
  <div key={idx} className="bg-white rounded-xl p-6 shadow flex  justify-between items-center">
    <div>
      <p className="text-xs text-gray-500 mb-1">{task.time}</p>
      <h4 className="font-semibold text-gray-800">{task.title}</h4>
      <p className="text-sm text-gray-500">{task.note}</p>
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => handleEditTask(idx)}
        className="text-sm text-blue-400 hover:underline"
      >
        Edit
      </button>
      <button
        onClick={() => handleDeleteTask(task._id)}
        className="text-sm text-red-400 hover:underline"
      >
        Delete
      </button>
    </div>
  </div>
))}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-purple-400 text-white text-3xl flex items-center justify-center shadow-lg hover:bg-purple-500"
      >
        +
      </button>

      {/* Add/Edit Task Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">{editingIndex !== null ? 'Edit Task' : 'Add New Task'}</h3>
            <input
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              placeholder="Note"
              value={newTask.note}
              onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={editingIndex !== null ? handleSaveEdit : handleAddTask}
                className="px-3 py-1 bg-purple-400 text-white rounded"
              >
                {editingIndex !== null ? 'Save' : 'Add'}
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
