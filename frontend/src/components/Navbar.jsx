// src/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed w-full h-16 top-0 z-50 bg-red-50 shadow-md items-center px-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className=" flex items-center gap-1">
            <img
              src='src/assets/Logo1.png'
              alt="Kuromi Logo"
              className="w-20 h-20"
            />
            <span className="text-lg uppercase font-bold text-rose-300">Pastel Plans</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/#hero">
            <a className="text-rose-400 hover:text-fuchsia-400 hover:underline font-medium transition-all ease-in-out duration-500">
            Home</a> 
            </Link>
            <a href="#features" className="text-rose-400 hover:text-fuchsia-400 hover:underline font-medium transition-all ease-in-out duration-500">Features</a>
            <a href="#about" className="text-rose-400 hover:text-fuchsia-400 hover:underline font-medium transition-all ease-in-out duration-500">About</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-3">
            <a
              href="/login"
              className="bg-rose-300 font-bold  text-shadow-lg text-white px-4 py-1.5 rounded-full text-sm hover:bg-rose-400">
              Login
            </a>
            <a
              href="/register"
              className="bg-rose-300 font-bold text-shadow-lg text-white px-4 py-1.5 rounded-full text-sm hover:bg-rose-400"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
