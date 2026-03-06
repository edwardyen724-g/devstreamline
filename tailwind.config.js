const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Custom primary color
        secondary: '#1D4ED8', // Custom secondary color
        accent: '#FBBF24', // Custom accent color
      },
      spacing: {
        '128': '32rem', // Custom spacing
        '144': '36rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans], // Custom font
      },
    },
  },
  plugins: [],
};