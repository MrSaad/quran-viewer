/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.html', './src/assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF7',
          100: '#FDF8E8',
          200: '#FAF0D7',
          300: '#F5E6C4',
          400: '#EBDAAF',
          500: '#D4C49A',
        },
        gold: {
          50: '#FBF7E9',
          100: '#F7EFD3',
          200: '#EFE0A7',
          300: '#E7D17B',
          400: '#DFC24F',
          500: '#B8860B',
          600: '#9A7209',
          700: '#7D5C07',
          800: '#5F4605',
          900: '#413003',
        }
      }
    }
  },
  plugins: [],
};
