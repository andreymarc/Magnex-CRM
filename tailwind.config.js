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
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#7B42F6',
          600: '#6B2EE8',
          700: '#5A1FD9',
        },
        purple: {
          dark: '#3A2D6B',
          darker: '#2A1F4F',
        },
        gradient: {
          start: '#00C6FF',
          end: '#7B42F6',
        },
      },
    },
  },
  plugins: [],
}

