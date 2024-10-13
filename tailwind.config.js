/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#121481",
        secondary:"#e68c8c",
        pink:"#FFCBCB"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

