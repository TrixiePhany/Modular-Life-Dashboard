import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import habit from '../assets/HabitTracker.png';
import affirm from '../assets/DailAffirm.png';
import todo from '../assets/todoList.png';
import notes from '../assets/Notes.png';
import journal from '../assets/journal.png';
import skin from '../assets/SkinCare.png';
import DashboardTopbar from '../components/DashboardTopbar';

const cards = [
  {
    title: 'Habit Tracker',
    link: '/habit-tracker',
    image: habit,
    description: 'Build routines and track your habits daily.',
    buttonColor: 'bg-orange-400 hover:bg-orange-500'
  },
  {
    title: 'Daily Affirmations',
    link: '/affirmations',
    image: affirm,
    description: 'Positive thoughts to brighten and empower your mindset.',
    buttonColor: 'bg-amber-300 hover:bg-amber-400'
  },
  {
    title: 'To-Do List',
    link: '/todo',
    image: todo,
    description: 'Organize tasks and boost productivity with ease.',
    buttonColor: 'bg-sky-300 hover:bg-sky-400'
  },
  {
    title: 'Notes',
    link: '/notes',
    image: notes,
    description: 'Capture thoughts, ideas, and reminders on the go.',
    buttonColor: 'bg-green-300 hover:bg-green-500'
  },
  {
    title: 'Skin-Care Routine',
    link: '/skincare',
    image: skin,
    description: 'Stay consistent with your morning and night skincare rituals.',
    buttonColor: 'bg-violet-300 hover:bg-violet-400'
  },
  {
    title: 'Journal',
    link: '/journal',
    image: journal,
    description: 'Reflect on your emotions, wins, and thoughts every day.',
    buttonColor: 'bg-pink-300 hover:bg-pink-400'
  },
];

// 🧠 Quotes array
const motivationalQuotes = [
  "🌟 You are stronger than you think.",
  "🚀 Small steps every day lead to big changes.",
  "✨ Progress, not perfection.",
  "🔥 Stay consistent. Results will follow.",
  "💖 Be proud of how far you’ve come.",
  "🌞 Your habits shape your future.",
  "📈 Don’t break the chain—show up for yourself today!",
  "🧘‍♀️ Calm mind. Strong soul. Kind heart.",
  "🌸 Grow through what you go through.",
  "🎯 Focus. Act. Repeat."
];

export default function Dashboard() {
  const [randomQuote, setRandomQuote] = useState('');
  const [streak, setStreak] = useState(4); // 💡 Replace with dynamic streak logic from backend later

  useEffect(() => {
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setRandomQuote(quote);
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 transition-colors duration-300">
      <DashboardTopbar />

      {/* Welcome Banner */}
      <div className="text-center mt-10">
        <h1 className="text-4xl font-luckiestGuy text-orange-400 animate-pulse">
          Welcome to Pastel Plans 🧁
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300 mt-1">
          Your daily productivity and self-care space. One tap at a time.
        </p>
      </div>

      {/* 🔥 Streak + 🧠 Quote */}
      <div className="mt-6 mb-8 px-6 flex flex-col items-center justify-center space-y-4">
        <div className="bg-orange-100 border border-orange-300 px-6 py-3 rounded-full text-orange-800 font-semibold shadow-sm">
          🔥 You’re on a <span className="font-bold">{streak}-day</span> streak! Keep going!
        </div>
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow text-center max-w-2xl">
          <p className="text-lg font-merienda text-gray-800 dark:text-gray-200 italic">
            {randomQuote}
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="px-6 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl relative"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-1 rounded-full shadow-md font-medium">
                🔧 Customizable
              </div>
              <div className="p-4 flex flex-col justify-between h-44">
                <h2 className="text-xl font-luckiestGuy text-gray-800 dark:text-white mb-1">
                  {card.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {card.description}
                </p>
                <Link
                  to={card.link}
                  className={`self-start px-4 py-2 text-white rounded-full text-sm font-semibold transition ${card.buttonColor}`}
                >
                  Open
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
