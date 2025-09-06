import React from 'react'
import { Link } from 'react-router-dom'
import Background from '../assets/Background.png'
import MobileBackground from '../assets/MobileBG.png'
import { FaCheckCircle } from 'react-icons/fa'

export default function HeroSection() {
  const isMobile = window.innerWidth < 768;

  return (
    <>
      {/* Hero Background Section */}
      <section
        id="hero"
        className="w-full min-h-screen pt-3 md:pt-52 px-4 flex flex-col items-left justify-left bg-cover bg-center transition-all duration-500 relative"
        style={{
          backgroundImage: `url(${isMobile ? MobileBackground : Background})`,
        }}
      >
        {/* Overlay */}
        <div className=" " />

        {/* Main Tagline */}
        <div className=" pt-90 pr-40 p-8 max-w-3xl ">
          <p className="text-md sm:text-xl text-white mt-4 mb-6 font-merienda">
            ✨ Your cute little mental wellness dashboard – organize habits, notes, to-dos, skincare & affirmations – all in one place!
          </p>

          {/* CTA Button */}
          <Link to="/dashboard">
            <button className="bg-white text-pink-500 font-bold px-6 py-2 rounded-full shadow hover:bg-fuchsia-100 transition">
              Let’s Start!
            </button>
          </Link>
        </div>
      </section>

      {/* Separate Features Section */}
      <section className="w-full px-6 py-10 bg-white">
        <div className="relative z-10 mt-4 rounded-xl shadow-md backdrop-blur-lg px-6 py-6 w-full md:w-[70%] mx-auto">
          <h3 className="text-xl font-bold text-pink-400 text-center mb-4 font-merienda">✨ Highlights of Your Dashboard</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm font-medium font-poppins">
            {[
              "✔ Habit Tracker – stay consistent",
              "✔ Daily Affirmations – boost your spirit",
              "✔ To-Do List – organize your day",
              "✔ Notes – jot down anything quickly",
              "✔ Skincare Routine – daily beauty log",
              "✔ Journaling – reflect and grow",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <FaCheckCircle className="text-pink-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
