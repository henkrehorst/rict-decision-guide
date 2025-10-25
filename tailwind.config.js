/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        lightgreen: '#E2EEE0',
        green: '#3D8F2C',
        blue: '#233fff',
        bluehover: '#243FFF'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        source: ['Source Serif Pro', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

