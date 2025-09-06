import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'
import bcrypt from 'bcryptjs';
import taskRoutes from './routes/taskRoutes.js'
import noteRoutes from './routes/notesRoutes.js'
import skinRoutineRoutes from './routes/skinRoutineRoutes.js';
import affirmationRoutes from './routes/affirmationsRoutes.js';
import habitRoutes from './routes/habitRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

connectDB()
//no pretection
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/skinroutine', skinRoutineRoutes);
app.use('/api/affirmations', affirmationRoutes);
app.use('/api/habits', habitRoutes)

//protected
app.use('/api/protected', protectedRoutes);



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
