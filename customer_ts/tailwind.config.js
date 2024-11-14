/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      colors: {
        'white-10': 'rgba(255,255,255,0.1)',
        'white': '#ffffff'
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}