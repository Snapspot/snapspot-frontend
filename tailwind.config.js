/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: '#f2eae2',
        primary: '#d1a982',
        accent: '#a67c52',
        'text-light': '#fdf6ec',
        'text-muted': '#b5a893',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
