import React from 'react'
import { ThemeContext } from '../theme/ThemeContext';
import { useContext } from 'react';
 const Workplace=()=> {
  const {theme} =useContext(ThemeContext)
  return (
    <section className={` bg-slate-500  h-screen  ${theme==="dark" ? "bg-zinc-800 text-white":"bg-white text-black"}`}>
      <p>Hello Home</p>
    </section>
  )
}
export default Workplace;