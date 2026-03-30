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
          light: '#4a7c23',
        },
        'moss': {
          light: '#a3b18a',
          DEFAULT: '#588157',
          dark: '#3a5a40',
          pale: '#dad7cd',
        },
        'sage': {
          light: '#dad7cd',
          DEFAULT: '#a3b18a',
          dark: '#8b9a6b',
        },
        'earth': {
          light: '#e9edc9',
          DEFAULT: '#8B4513',
          dark: '#582f0e',
          warm: '#d4a373',
        },
        'sky': '#87CEEB',
        'ocean': {
          DEFAULT: '#006994',
          light: '#4fc3f7',
          deep: '#004D40',
        },
        'teal-deep': '#004D40',
        'bronze': {
          light: '#e6ccb2',
          DEFAULT: '#CD7F32',
          dark: '#7f5539',
          warm: '#d4a373',
        },
        'off-white': '#FAF9F6',
        'accent-emerald': '#10b981',
        'accent-teal': '#14b8a6',
        'accent-gold': '#fbbf24',
        'accent-coral': '#f43f5e',
        'accent-violet': '#8b5cf6',
        'accent-rose': '#fb7185',
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'display': ['Fraunces', 'serif'],
        'poetic': ['Fraunces', 'serif'],
        'soft': ['Fraunces', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift': 'drift 20s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'wave': 'wave 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
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
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(16, 185, 129, 0.5), 0 0 80px rgba(16, 185, 129, 0.2)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.1)',
        'glow-gold': '0 0 30px rgba(251, 191, 36, 0.3), 0 0 60px rgba(251, 191, 36, 0.1)',
        'glow-coral': '0 0 30px rgba(244, 63, 94, 0.3), 0 0 60px rgba(244, 63, 94, 0.1)',
        'glow-violet': '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)',
        'inner-glow': 'inset 0 0 30px rgba(16, 185, 129, 0.1)',
        'card': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 30px 60px -20px rgba(16, 185, 129, 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}