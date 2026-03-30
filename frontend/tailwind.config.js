/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        'forest': '#2D5016',
        'sky': '#87CEEB',
        'earth': '#8B4513',
        'ocean': '#006994',
        'teal-deep': '#004D40',
        'bronze': '#CD7F32',
        'off-white': '#FAF9F6',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'poetic': ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
