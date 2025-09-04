import React, { useState, useEffect } from 'react'
import topbar from '../assets/footer.png'
export default function DashboardTopbar() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <div className="sticky top-0 z-50 w-full border-t bg-cover shadow px-6 py-4 flex justify-between items-center"
    style={{
                      backgroundImage: `url(${topbar})` 
                    }}>
      <h1 className="text-xl font-bold text-rose-50 ">Dashboard</h1>
      <div className="flex items-center gap-4">
        {/* Dark mode toggle */}
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="sr-only"
          />
          <div className="w-10 h-5 bg-gray-300 rounded-full p-1 flex items-center dark:bg-gray-600">
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
                darkMode ? 'translate-x-5' : ''
              }`}
            />
          </div>
        </label>

        <button
          onClick={handleLogout}
          className="bg-rose-50 text-rose-400 font-bold px-4 py-2 rounded-full hover:bg-rose-500 transition text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
