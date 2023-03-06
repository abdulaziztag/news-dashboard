/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0891b2',
        error: '#dc2626',
        success: '#16a34a',
        info: '#2563eb'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
