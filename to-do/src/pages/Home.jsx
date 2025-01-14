import { useState } from "react"
import { NavLink } from "react-router-dom"
import {Menu} from 'lucide-react'
import { CircleChevronRight } from 'lucide-react';
import { ThemeContext } from "../theme/Theme";
import { useContext } from "react";
const Home=()=>{
  const {theme ,setTheme}=useContext(ThemeContext);
  const [isshow ,setIsshow]=useState(false)
    const links=[
      {
        id:1,
        name:"Login"  ,
        link:"/login"
      },
      {
        id:2,
        name: "Signup",
        link:"/signup"
      }
    ]
    const toogle=()=>{
      setIsshow(prevState=>!prevState)
    }
   const ThemeToggle=()=>{
    setTheme((prevtheme)=>(prevtheme==="light"?"dark":"light"))
   }
    return(
      <section className={`min-h-screen ${theme === "dark" ? "bg-zinc-900" : "bg-background"}`}>
        <nav className={`  ${theme==='dark' ? "bg-background":"bg-white"}  ml-6 md:ml-11 mt-2  w-[90%] flex justify-between  items-center px-5 bg-zinc-800   py-2  border-2  rounded-lg fixed left-0 right-0 z-50   transition-all duration-300 ease-in-out shadow-md`}>
          <NavLink to="/" className="text-xl font-atma font-semibold text-white "> Daliy Planner</NavLink>
          <div className=" items-center text-white gap-20  hidden md:flex  w-32 ">
            {links.map((items)=>(
              <NavLink key={items.id} to={items.link} className=" font-semibold text-[17px] rounded-md px-3 hover:px-3 " >{items.name}</NavLink>
            ))}
          </div>
          {/* Theme Section */}
          <div className="flex  items-center md:gap-6 gap-2">
           <spna onClick={ThemeToggle} className="text-2xl cursor-pointer rounded-md" > {theme === "light" ? "☀️" : "🌙"}</spna>
           <div className="p-1">
            <NavLink to="/content" ><p className="md:block hidden rounded-md px-2 py-1 b border-2 bg-zinc-100 text-black font-medium  cursor-pointer">Start Now</p></NavLink>
           </div>
            {/*Toggle section*/}
          <div className="md:hidden mr-2 text-white">
          <button  onClick={toogle}>
            {isshow ? (
              <CircleChevronRight />
            ):(
              <Menu />
            )}
          </button>
            </div>
            </div>
          {isshow && (
            <div className={`absolute w-1/2 mt-2 border transition-all duration-300 md:hidden rounded-md  top-full right-0  flex-col ${isshow ?' flex flex-col bg-white':"hidden"}`}>
               {links.map((items)=>(
                 <NavLink key={items.id} to={items.link} className="px-5 py-2 font-semibold font-mono hover:bg-gray-100 hover:text-black" >{items.name}</NavLink>
                ))}
            </div>
          )}
         
        </nav>
        </section>
    )
}

export default Home;