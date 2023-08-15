/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#2f3d4e",
        'dark-blue': "#263648",
        'light-red': "#ac9292",
        'lighter-red': "#ccb0b0",
        'lightest-red': "#cbb0b033",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}