/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.pug',
    './public/**/*.html',
    './src/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        secondaryColor: '#18181B', 
        primaryForeground: '#E4E4E7', 
        secondaryFont: '#717175',
        fontWhite: '#FFFFFF', 
        thirdFont: '#1a1a1a',
        background: '#F9FAFB', 
        input: '#D1D5DB', 
        ring: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

