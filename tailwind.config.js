/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'garden-pink': '#FFB6C1',
        'garden-purple': '#E6E6FA',
        'garden-green': '#98FB98',
      },
      fontFamily: {
        'cute': ['Comic Sans MS', 'cursive'],
      },
    },
  },
  plugins: [],
}

