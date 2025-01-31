/** @type {import('tailwindcss').Config} */
export default {
  content: [  
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ['JetBrains Mono', 'monospace'],
        handwriting: ['Caveat', 'sans-serif'],
        atma: ['Atma', 'serif']
    },fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
      colors:{
        background:'#f4f4e2',
        text:'#1e2d38',
        subtleText: '#5b6d78',
        boxBackground: '#d6e9f3',
        goalsBoxBackground: '#d6e9f3',
        highlight: '#fdd9c4',
        noteBackground: '#e3f1fc',
        paper: {
          100: '#F9F9F9',
          200: '#F5F5F5',
          300: '#F0F0F0',
          400: '#E6E6E6',
          500: '#D3D3D3',
          600: '#BFBFBF',
          700: '#A9A9A9',
          800: '#8A8A8A',
          900: '#696969',
        },
      }
  },
  plugins: [],
}
}
