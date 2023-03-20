/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      white: '#fff',
      gray: '#d6def3',
      primary: '#0970e6',
      blue: '#2563EB',
    },
    fontFamily: {
      sans: ['Roboto', 'Helvetica Neue', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
