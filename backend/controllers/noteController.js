import { Notes } from '../models/Notes.js'

// GET /api/notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes of the user" })
  }
}

// POST /api/notes
export const createNote = async (req, res) => {
  const { title, content } = req.body
  if (!content) {
    return res.status(400).json({ message: 'Note content is required' })
  }

  try {
    const note = new Notes({
      user: req.user._id,
      title,
      content
    })
    const createdNote = await note.save()
    res.status(201).json(createdNote)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note' })
  }
}

// PUT /api/notes/:id
export const updateNote = async (req, res) => {
  const { title, content } = req.body
  const note = await Notes.findById(req.params.id)

  if (!note || note.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Note not found' })
  }

  note.title = title || note.title
  note.content = content || note.content

  const updated = await note.save()
  res.status(200).json(updated)
}

// DELETE /api/notes/:id
export const deleteNote = async (req, res) => {
  const note = await Notes.findById(req.params.id)

  if (!note || note.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Note not found' })
  }

  await note.remove()
  res.status(200).json({ message: 'Note deleted successfully' })
}
