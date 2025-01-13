/** @type {import('tailwindcss').Config} */
export default {
  content: [  
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
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
        
      }
  },
  plugins: [],
}
}
