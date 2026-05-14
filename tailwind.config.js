/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        sand: '#EFECE5',
        therapyRed: '#E84855',
        softCrimson: '#FFDADA',
        charcoal: '#2D2D2D',
        softText: '#5A5A5A',
        deepBlack: '#09050F',
        deepPurple: '#1A0B2E',
        neonPurple: '#6A0DAD',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
