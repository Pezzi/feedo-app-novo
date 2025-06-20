// tailwind.config.js
import tailwindcssAnimate from 'tailwindcss-animate'
import tailwindcssTypography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'lemon': '#D9ED14',
        'lemon-dark': '#A3B70E',
        'lemon-light': '#F2F9A7',
        'gray-dark': '#222222',
        'gray-medium': '#555555',
        'gray-light': '#CCCCCC',
        'lilas-1': '#5D557F',
        'lilas-2': '#ECE7FF',
        'lilas-3': '#BBAAFF',
        'lilas-4': '#625A7F',
        'lilas-5': '#9688CC',
        
        'white': '#FFFFFF',
        'black': '#000000',
      },
      
      fontFamily: {
        sans: ['Geologica', 'sans-serif'],
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    tailwindcssTypography,
  ],
}