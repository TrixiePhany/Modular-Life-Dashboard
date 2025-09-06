// src/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-pink-50 shadow-md backdrop-blur-md border-b border-rose-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo + Name */}
          <div className="flex items-center space-x-2">
            <img
              src="/src/assets/Logo1.png"
              alt="Pastel Plans Logo"
              className="w-12 h-12"
            />
            <span className="text-xl font-extrabold text-rose-400 tracking-wide font-merienda">
              Pastel Plans
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-rose-500 hover:text-fuchsia-400 transition-all font-bold">
              Home
            </Link>
            <Link to="/features" className="text-rose-500 hover:text-fuchsia-400 hover:underline font-bold transition-all ease-in-out duration-500">
            Features
          </Link>
            <Link to="/about" className="text-rose-500 hover:text-fuchsia-400 hover:underline font-bold transition-all ease-in-out duration-500">
  About
</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="bg-rose-300 text-white font-semibold px-4 py-1.5 rounded-full hover:bg-rose-400 transition-all text-sm shadow-sm"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-pink-100 text-rose-500 border border-rose-300 font-semibold px-4 py-1.5 rounded-full hover:bg-pink-200 transition-all text-sm shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-rose-500 focus:outline-none">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-pink-100 px-6 py-4 space-y-4 shadow-inner">
          <Link to="/" className="block text-rose-400 font-medium hover:text-fuchsia-400" onClick={toggleMobileMenu}>
            Home
          </Link>
         <Link to="/features" className="text-rose-400 hover:text-fuchsia-400 hover:underline font-medium transition-all ease-in-out duration-500">
            Features
          </Link>
          <Link to="/about" className="text-rose-400 hover:text-fuchsia-400 hover:underline font-medium transition-all ease-in-out duration-500">
  About
</Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/login"
              className="bg-rose-300 text-white text-center font-semibold px-4 py-2 rounded-full hover:bg-rose-400 transition-all"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-pink-200 text-rose-600 text-center font-semibold px-4 py-2 rounded-full hover:bg-pink-300 transition-all"
              onClick={toggleMobileMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
