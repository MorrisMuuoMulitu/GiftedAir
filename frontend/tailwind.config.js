/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'forest': {
          DEFAULT: '#2D5016',
          dark: '#1a2f0d',
          deep: '#0a1a05',
        },
        'moss': {
          light: '#a3b18a',
          DEFAULT: '#588157',
          dark: '#3a5a40',
        },
        'sage': {
          light: '#dad7cd',
          DEFAULT: '#a3b18a',
        },
        'earth': {
          light: '#e9edc9',
          DEFAULT: '#8B4513',
          dark: '#582f0e',
        },
        'sky': '#87CEEB',
        'ocean': '#006994',
        'teal-deep': '#004D40',
        'bronze': {
          light: '#e6ccb2',
          DEFAULT: '#CD7F32',
          dark: '#7f5539',
        },
        'off-white': '#FAF9F6',
        'accent-emerald': '#10b981',
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'display': ['Fraunces', 'serif'],
        'poetic': ['Fraunces', 'serif'],
        'soft': ['Fraunces', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift': 'drift 20s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10%) translateY(0)' },
          '50%': { transform: 'translateX(10%) translateY(5%)' },
          '100%': { transform: 'translateX(-10%) translateY(0)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
    },
  },
  plugins: [],
}
