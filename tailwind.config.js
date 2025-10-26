import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        lightgreen: '#E2EEE0',
        green: '#3D8F2C',
        blue: '#233fff',
        bluehover: '#0018b3',
        red: '#e81b42',
        correctGreen: '#038a25'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        source: ['Source Serif Pro', 'sans-serif'],
      }
    },
  },
  plugins: [
  ],
}

