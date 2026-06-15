/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#2563EB',
        successGreen: '#22C55E',
        warningOrange: '#F59E0B',
        dangerRed: '#EF4444',
      },
    },
  },
  plugins: [],
}
