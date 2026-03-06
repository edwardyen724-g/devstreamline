const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Custom primary color
        secondary: '#FBBF24', // Custom secondary color
        accent: '#4F46E5', // Custom accent color
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['Fira Code', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};