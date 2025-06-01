/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B4C9A',
          '100': '#F4F1F8',
          dark: '#8A63C9', // Lighter version for dark mode
        },
        secondary: '#5A3F82',
        'light-gray': '#F5F5F7',
        'dark-text': '#1A1A1A',
        'light-purple': '#F4F1F8',
        dark: {
          'bg-primary': '#1a1a1a',
          'bg-secondary': '#2d2d2d',
          'text-primary': '#ffffff',
          'text-secondary': '#a0a0a0',
        },
      },
    },
  },
  plugins: [],
}


