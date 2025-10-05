/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': '#2D5016',
        'sky': '#87CEEB',
        'earth': '#8B4513',
        'ocean': '#006994',
      },
      fontFamily: {
        'poetic': ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
