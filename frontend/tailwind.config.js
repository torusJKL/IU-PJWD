const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
        'xs': '475px'
      },
      colors: {
        'vintage-red': '#540202',
        'vintage-beige': '#ede0a6',
        'vintage-green': '#799163'
      }
    },
  },
  plugins: [],
}

