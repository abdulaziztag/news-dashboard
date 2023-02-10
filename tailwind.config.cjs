/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        error: '#dc2626',
        success: '#65a30d',
        info: '#2563eb'
      }
    },
  },
  plugins: [],
}
