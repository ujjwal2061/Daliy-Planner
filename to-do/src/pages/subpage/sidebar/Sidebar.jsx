import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext"
import { IoSunny } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
export default function Sidebar({className}) {
   const {theme ,setTheme}=useContext(ThemeContext);
    const links=[
      {
        id:1,
        name:"Home", 
        link:'workplace',
        icons:"🏘️"
    },
      {
        id:2,
        name:"Calendar",
        link:'calendar',
        icons:"📅"
      },
      {
        id:3,
        name:"Stats",
        link:'stats',
        icons:"📊"
      },
      {
        id:4,
        name:"Profile",
        link:'account',
        icons:"👤"
      },
    ]

    const [sidebarShow ,setSidebarShow]=useState(false)
    const toggle=()=>{
      setSidebarShow((prevState)=>!prevState)
    }
    const ThemeToggle=()=>{
      setTheme((prevtheme)=>(prevtheme==="light"?"dark":"light"))
     }
  return (
    <div className={` fixed top-0 left-0 h-full transition-all  ease-in-out    duration-75 ${ sidebarShow ? "w-" : "w-12" } flex flex-col ${className} 
    ${theme === "dark" ? "bg-zinc-900  text-white" : "bg-white text-black"}   `}  >
    <button
      onClick={toggle}
      className={`absolute text-xl p-2     px-2  rounded-lg sm:${sidebarShow} `}  >
      {sidebarShow ?  (<IoIosArrowBack  size={25} strokeWidth={1.5} />) : (<FiArrowRight   size={25} strokeWidth={1.5}/>) }
    </button>
    <nav className="space-y-2 py-2 h-full flex-col gap-10 px-2 flex">
      {links.map((link) => (
        <NavLink
          key={link.id}
          to={link.link}
          className={`flex mt-20 items-center  ${ sidebarShow ? "w-" : "w-8" } px-1 py-1  rounded-md  ${theme ==="dark" ?" bg-zinc-800 hover:bg-zinc-600":"bg-slate-200 hover:bg-slate-400"}`} >
          <span className='text-sm'>{link.icons}</span>
          {sidebarShow && <span className={` font-sans font-semibold `}>{link.name}</span>}
        </NavLink>
      ))}
      <div className= {`space-y-2  absolute bottom-6  flex flex-row items-center justify-center  rounded-lg    ${sidebarShow ? "w-20 ml-3 ":"w-8 ml-0 " }  ${theme ==="dark" ?"bg-gray-800 hover:bg-zinc-700":"bg-slate-200 hover:bg-slate-400"}` }>
         <button onClick={ThemeToggle} className='flex items-center justify-center px-4 py-2 rounded-md'>
         {theme === "light" ? <IoSunny size={20}  /> : <LuSunMoon size={20} />}
          </button>
      </div>
    </nav>
  </div>
);
}
