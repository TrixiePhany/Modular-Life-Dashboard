import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'
import bcrypt from 'bcryptjs';
import { User } from './models/User.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

connectDB()
//no pretection
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

//protected
app.use('/api/protected', protectedRoutes);



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
