import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FloatingFeedbackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/feedback')}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 sm:px-6 sm:py-4 rounded-full font-semibold shadow-lg sm:shadow-2xl hover:shadow-xl sm:hover:shadow-3xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 sm:gap-3 group hover:scale-105 text-sm sm:text-base"
      aria-label="Give Feedback"
    >
      <i className="fa-solid fa-comment text-base sm:text-xl group-hover:scale-110 transition-transform"></i>
      <span className="hidden sm:inline">Give Feedback</span>
      <span className="sm:hidden">Feedback</span>
    </button>
  );
}
