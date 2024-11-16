const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
        'xs': '475px'
      }
    },
  },
  plugins: [],
}

