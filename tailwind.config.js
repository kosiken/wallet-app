/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#174AFF',
        badgeColor: '#FFCB67',
        badgeTextColor: '#1D2A65',
        secondary: 'rgba(255, 255, 255, 0.4);',
        lightColor: '#7798ff',
        success:'#00D9AC',
      }
    },
  },
  plugins: [],
}
