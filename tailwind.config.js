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
        cyan: "#083344",
        'light-cyan': "#164e63",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}