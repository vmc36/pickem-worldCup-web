/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '18px'],
        'base': ['16px', '24px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['32px', '40px'],
        '4xl': ['48px', '56px'],
      },
      colors: {
        'primary': '#AF053F',
        'on-primary': '#F4F6FF',
        'primary-dark': '#300219',
        'primary-light': '#BB2E57',
        'background': '#F4F6FF',
        'body-text': '#0B0E16',
        'body-text-2': '#696C74',
        'border': '#B1B4BD'
      },
      fontFamily: {
        'sans': ['Cairo', 'sans-serif']
      }
    },
  },
  plugins: [],
}