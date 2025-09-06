import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Habit Tracker',
    description:
      'Build routines and track daily progress with visual and color-coded tracking. Supports filtering and toggle completion per day.',
    color: 'bg-orange-100',
  },
  {
    title: 'Daily Affirmations',
    description:
      'Create, view, and chant powerful affirmations with pastel-colored cards, chant counters, and day-wise filters.',
    color: 'bg-yellow-100',
  },
  {
    title: 'To-Do List',
    description:
      'Plan your tasks, assign time slots, calendar view, and real-time filters for active/completed tasks. Editable with smooth UI.',
    color: 'bg-blue-100',
  },
  {
    title: 'Notes',
    description:
      'Quick notes with support for color tags and pinning. Minimal design to boost idea capture and journaling.',
    color: 'bg-green-100',
  },
  {
    title: 'Skin-Care Routine',
    description:
      'Weekly planner with Day/Night routines for your skincare products. Editable, colorful, and perfect for self-care lovers.',
    color: 'bg-violet-100',
  },
  {
    title: 'Personal Journal',
    description:
      'Reflect and write your daily thoughts, mood, and activities in a calming pink-themed journaling space.',
    color: 'bg-pink-100',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen px-4 py-16 bg-pink-50 font-sans">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-400 font-merienda mb-4">
          Features of Pastel Plans ✨
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          A gentle productivity and wellness dashboard built with love. Pastel Plans helps you manage your habits, thoughts, tasks, and self-care — all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`p-6 rounded-xl shadow-md ${feat.color} hover:scale-105 transition-transform`}
          >
            <div className="flex items-start gap-3 mb-2">
              <CheckCircle className="text-rose-400 mt-1" />
              <h3 className="text-xl font-semibold text-gray-800">
                {feat.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm">{feat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <Link
          to="/dashboard"
          className="inline-block bg-rose-300 hover:bg-rose-400 text-white px-6 py-2 rounded-full text-lg font-semibold shadow"
        >
          Explore Dashboard →
        </Link>
      </div>
    </div>
  );
}
