import React from 'react'
import Background from '../assets/Background.png' 
import MobileBackground from '../assets/MobileBG.png'
export default function HeroSection() {
  return (
    <section
    id="hero"
      className="w-full min-h-screen pt-60 px-4 flex flex-col items-center justify-center bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `url(${window.innerWidth < 768 ? MobileBackground : Background})`
      }}
    >
      <div className="absolute bottom-26 text-center left-15  gap-2"
        style={{ zIndex: 10 }}>
        <p className="text-lg sm:text-2xl line-clamp-4 capitalize text-white mt-7 max-w-xl drop-shadow-md">
            An adorable dashboard for to-dos, notes, habits, journaling, and more!
            Your messy mind, beautifully organized. To know more, click the button below 
        </p>
     <div className="mt-4">
        <button className=" bg-white text-pink-500 font-semibold px-6 py-2 rounded-full shadow hover:bg-purple-100 transition">
          Let's Start !
        </button>
        </div>
      </div>

    </section>
  )
}

