import React, { useEffect, useState } from 'react'
import axios from 'axios'
import notesbg from '../assets/notesbg.png'
export default function Notes() {
  const [notes, setNotes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [formData, setFormData] = useState({ title: '', content: '', color: '', pinned: false })

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:8000/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNotes(res.data)
    } catch (err) {
      console.error('Error fetching notes:', err)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      if (editingNoteId) {
        await axios.put(`http://localhost:8000/api/notes/${editingNoteId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post('http://localhost:8000/api/notes', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }

      fetchNotes()
      setFormData({ title: '', content: '', color: '', pinned: false })
      setShowForm(false)
      setEditingNoteId(null)
    } catch (err) {
      console.error('Error saving note:', err)
    }
  }

  const handleEdit = (note) => {
    setFormData({ title: note.title, content: note.content, color: note.color || '', pinned: note.pinned || false })
    setEditingNoteId(note._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:8000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchNotes()
    } catch (err) {
      console.error('Error deleting note:', err)
    }
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-green-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Notes</h2>
        <button
          onClick={() => {
            setShowForm(true)
            setFormData({ title: '', content: '', color: '', pinned: false })
            setEditingNoteId(null)
          }}
          className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          + Add Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.sort((a, b) => b.pinned - a.pinned).map((note) => (
          <div
            key={note._id}
            className={`relative bg-white shadow rounded-lg p-4 border-t-4 ${note.color ? `border-${note.color}-400` : 'border-green-400'}`}
          >
            {note.pinned && <div className="absolute top-2 right-2 text-green-500">📌</div>}
            {note.title && <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>}
            <p className="mt-2 text-gray-600 whitespace-pre-wrap">{note.content}</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => handleEdit(note)} className="text-white bg-green-500 rounded-full px-3 hover:underline">Edit</button>
              <button onClick={() => handleDelete(note._id)} className="text-white bg-red-400 rounded-full px-3 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-green-100/60  flex items-center justify-center z-50">
          <div className=" h-180 rounded-xl p-6 w-1/2 max-w-xl mx-4 shadow-xl"
           style={{
                            backgroundImage: `url(${notesbg})`
                          }}>
            <h3 className="text-xl font-bold mb-4 text-gray-700">{editingNoteId ? 'Edit Note' : 'New Note'}</h3>
            <input
              placeholder="Title (optional)"
              className="w-full mb-3 px-4 py-2 border rounded"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Write your note here..."
              className="w-full h-120 mb-4 px-4 py-2 border rounded"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {['rose', 'blue', 'green', 'yellow', 'purple'].map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={`h-6 w-6 rounded-full border-2 ${formData.color === color ? 'border-black' : 'border-white'} bg-${color}-400`}
                />
              ))}
              <label className="flex items-center gap-2 text-sm ml-4">
                <input
                  type="checkbox"
                  checked={formData.pinned}
                  onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                />
                Pin note
              </label>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingNoteId(null)
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500"
              >
                {editingNoteId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
