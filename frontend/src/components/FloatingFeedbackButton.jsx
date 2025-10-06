import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FloatingFeedbackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/feedback')}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-full font-semibold shadow-2xl hover:shadow-3xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-3 group hover:scale-105"
      aria-label="Give Feedback"
    >
      <i className="fa-solid fa-comment text-xl group-hover:scale-110 transition-transform"></i>
      <span className="hidden sm:inline">Give Feedback</span>
      <span className="sm:hidden">Feedback</span>
    </button>
  );
}
