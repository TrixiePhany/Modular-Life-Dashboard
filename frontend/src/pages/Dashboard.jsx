import React from 'react'
import { Link } from 'react-router-dom'
import habit from '../assets/HabitTracker.png'
import affirm from '../assets/DailAffirm.png'
import todo from '../assets/todoList.png'
import notes from '../assets/Notes.png'
import journal from '../assets/journal.png'
import skin from '../assets/SkinCare.png'
import DashboardTopbar from '../components/DashboardTopbar'

const cards = [
  {
    title: 'Habit Tracker',
    link: '/habit-tracker',
    image: habit,
    description: 'Build routines and track progress daily.',
    buttonColor: 'bg-orange-400 hover:bg-orange-500'
  },
  {
    title: 'Daily Affirmations',
    link: '/affirmations',
    image: affirm,
    description: 'Positive thoughts to brighten your day.',
    buttonColor: 'bg-amber-300 hover:bg-amber-400'
  },
  {
    title: 'To-Do List',
    link: '/todo',
    image: todo,
    description: 'Plan tasks and stay productive.',
    buttonColor: 'bg-sky-300 hover:bg-sky-400'
  },
  {
    title: 'Notes',
    link: '/notes',
    image: notes,
    description: 'Capture quick ideas and important info.',
    buttonColor: 'bg-green-300 hover:bg-green-500'
  },
  {
    title:'Skin-Care Routine',
    link:'/skincare',
    image: skin,
    description:'Keep a regular check on your skin ',
    buttonColor: 'bg-violet-300 hover:bg-violet-400'
  },
  {
    title: 'Journal',
    link: '/journal',
    image: journal,
    description: 'Reflect and write your daily thoughts.',
    buttonColor: 'bg-pink-300 hover:bg-pink-400'
  },
]

export default function Dashboard() {
  return (
        <div className="min-h-screen bg-pink-50 dark:bg-gray-900 transition-colors duration-300"
        >
      <DashboardTopbar />
    <div className="min-h-screen bg-pink-50 px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`
              bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105
              ${index >= 3 ? 'sm:col-span-1 lg:col-span-1' : ''}
            `}
          >
            {/* Card Image */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-80 object-cover"
            />

            {/* Card Body */}
            <div className="p-3">
              <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
              <p className="text-sm text-gray-600 my-3">{card.description}</p>
              <Link
                to={card.link}
                className={` px-4 py-2 text-white rounded-full text-sm font-medium transition ${card.buttonColor}`}
              >
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
