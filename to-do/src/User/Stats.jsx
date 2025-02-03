import React from 'react'
import { ThemeContext } from '../theme/ThemeContext';
import { useContext } from 'react';
const Stats=()=>{
  const {theme} =useContext(ThemeContext)
  return (
    <section className={` min-h-screen  ${theme==="dark" ? "bg-[#18191A] text-white":"bg-[#F0F2F5] text-black"}`}>
    <p>Hello Home</p>
  </section>
  )
}
export default Stats;