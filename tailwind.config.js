/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tiktok: {
          DEFAULT: '#000000',
          pink: '#FE2C55',
          cyan: '#00F2EA',
        }
      }
    },
  },
  plugins: [],
}
