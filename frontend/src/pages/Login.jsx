import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginCard from '../assets/KuromiVerification/1.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password
      });

      const { token, username, email: userEmail } = response.data;

      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('email', userEmail);

      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center px-4">
      <div
        className="bg-cover bg-center rounded-xl shadow-lg max-w-md p-5 w-[420px] h-[520px]"
        style={{
          backgroundImage: `url(${LoginCard})`
        }}
      >
        <p className="text-sm text-sky-50 font-medium text-center mb-6 pt-35">
          Welcome back to Pastel Plans!
        </p>

        {error && (
          <p className="text-center text-red-200 font-semibold mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-sky-50 font-bold block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-sky-50 font-bold block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-300 text-white py-2 shadow-lg rounded-md font-semibold hover:bg-sky-400 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-sky-500 font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
