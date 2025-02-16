/** @type {import('tailwindcss').Config} */
export default {
  content: [  
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        lightfont:"Itim",
        myfont:"Work Sans",
        jetbrains: ['JetBrains Mono', 'monospace'],
        handwriting: ['Caveat', 'sans-serif'],
        atma: ['Atma', 'serif']
    },
      colors:{
        mainbackground:"#fefdfc",
        background:'#f4f4e2',
        text:'#1e2d38',
        subtleText: '#5b6d78',
        boxBackground: '#d6e9f3',
        goalsBoxBackground: '#d6e9f3',
        highlight: '#00FFFF',
        noteBackground: '#e3f1fc',
      }
  },
 
  plugins: [],
}
}
