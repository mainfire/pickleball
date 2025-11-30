/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a472a', // Deep Forest Green
          light: '#2d6a40',
          dark: '#0f2b19',
        },
        secondary: {
          DEFAULT: '#ffd700', // Electric Gold
          light: '#ffe44d',
          dark: '#b39700',
        },
        accent: {
          DEFAULT: '#e63946', // Smashpoint Red
          light: '#ff6b76',
          dark: '#a8001d',
        },
        background: '#f8f9fa',
        surface: '#ffffff',
        text: {
          DEFAULT: '#2d3436',
          muted: '#636e72',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
