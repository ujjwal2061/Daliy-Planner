import React, { useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext"
import { IoSunny } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
export default function Sidebar({className}) {
  const [isScrolled,setScrolled]=useState(false)
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
        name:"Stats",
        link:'stats',
        icons:"📊"
      },
      {
        id:3,
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
     useEffect(() => {
      const handleScroll = () => {
        if (window.innerWidth < 768) { 
          setScrolled(window.scrollY > 50); 
        }
      };
       localStorage.getItem('usertheme')
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
  return (
    <div className={`h-12 md:fixed   md:top-0 md:left-0 md:h-full md:w-auto w-full
             fixed bottom-0 flex  flex-row left-0 
             transition-all ease-in-out duration-300 
            ${sidebarShow ? "w-16" : ""}
             ${theme ==="dark" ?"bg-zinc-900 text-white" : "bg-white text-black"}
             border-t md:border-r border-gray-200 dark:border-gray-700
             z-50
             ${isScrolled ? "hidden md:flex" : "flex"}`}>
   
   <button  onClick={toggle}
       className={`absolute text-xl  hidden md:block px-2  rounded-lg sm:${sidebarShow} `}  >
       {sidebarShow ?  (<IoIosArrowBack  size={25} strokeWidth={1.5} />) : (<FiArrowRight   size={25} strokeWidth={1.5}/>) }
    </button>
  <nav className="space-y-2    md:ml-0   justify-between mr-auto w-full   md:justify-start py-2 h-full md:flex-col flex-row md:gap-10 px-2 flex">
   <div className='flex flex-row w-full   md:flex-col justify-between'>
     {links.map((link) => (
      <NavLink
      key={link.id}
      to={link.link}
      className={`flex md:flex-row mr-2 md:mt-20 items-center  ${ sidebarShow ? "w-auto" : "w-8" } px-1 py-1  rounded-md  ${theme ==="dark" ?" bg-zinc-800 hover:bg-zinc-600":"bg-slate-200 hover:bg-slate-400"}`} >
          <span className='text-sm '>{link.icons}</span>
           {sidebarShow && <span className={` font-sans md:block hidden font-semibold `}>{link.name}</span>}
         </NavLink>
        ))}
     <div className= {`space-y-2 justify-center   md:absolute md:bottom-1 items-center   md:left-1   flex flex-row lg:items-center  lg:justify-center  rounded-lg    ${sidebarShow ? "w-20 ml-3 ":"w-8 ml-0 " }  ${theme ==="dark" ?" hover:bg-zinc-700":" hover:bg-slate-400"}` }>
          <button onClick={ThemeToggle} className='flex items-center justify-center px-4 py-2 rounded-md'>
          {theme === "light" ? <IoSunny size={18}  /> : <LuSunMoon size={18} />}</button>
      </div>
   </div>
</nav>

    
  </div>
);
}
