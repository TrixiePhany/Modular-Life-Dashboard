import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import RegisterCard from '../assets/KuromiVerification/2.png'

export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', {
        username,
        email,
        password
      })

      // Save token + redirect to dashboard
      localStorage.setItem('token', res.data.token)
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center px-4">
      <div className="bg-cover bg-center rounded-xl shadow-lg max-w-md p-5 w-[420px] h-[540px]"
        style={{ backgroundImage: `url(${RegisterCard})` }}
      >
        <p className="text-sm text-white font-medium text-center mb-6 pt-35">Create your account on Pastel Plans</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white font-bold block mb-1">Username</label>
            <input
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="text-sm text-white font-bold block mb-1">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="text-sm text-white font-bold block mb-1">Password</label>
            <input
              type="password"
              value={password}
              required
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-400 text-white py-2 shadow-lg rounded-md font-semibold hover:bg-rose-500 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-100">
          Already have an account?{' '}
          <Link to="/login" className="text-rose-400 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}
