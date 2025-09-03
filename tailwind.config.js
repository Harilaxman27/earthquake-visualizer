/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earthquake: {
          low: '#ffeb3b',
          medium: '#ff9800',
          high: '#f44336',
          severe: '#9c27b0'
        }
      }
    },
  },
  plugins: [],
}