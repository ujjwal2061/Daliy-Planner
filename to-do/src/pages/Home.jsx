// import Sigup from "../Route/Sigup"
// import Login from "../Route/Login"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import {Menu} from 'lucide-react'
import { CircleChevronRight } from 'lucide-react';
const Home=()=>{
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

    // Function add the To-Do

    return(
        <section className="min-h-screen bg-background">
        <nav className="  ml-6 md:ml-11 mt-2  w-[90%] flex justify-between  items-center px-5 bg-zinc-800   py-2  border-2  rounded-lg fixed left-0 right-0 z-50   transition-all duration-300 ease-in-out shadow-md">
          <NavLink to="/" className="text-xl font-atma font-semibold text-white "> Daliy Planner</NavLink>
          <div className=" items-center text-white gap-20  hidden md:flex  w-32 ">
            {links.map((items)=>(
              <NavLink key={items.id} to={items.link} className=" font-semibold text-[17px] rounded-md px-3 hover:px-3 " >{items.name}</NavLink>
            ))}
          </div>
          <NavLink to="/content" ><p className="rounded-md px-2 py-1 b border-2 bg-zinc-100 text-black font-medium  cursor-pointer">Start Now</p></NavLink>
          <div className="md:hidden mr-2 text-white">
          <button  onClick={toogle}>
            {isshow ? (<Menu />
            ):(
              <CircleChevronRight />
            )}
          </button>
            </div>
          {isshow && (
            <div className={`absolute w-1/2 mt-2 bg-white border transition-all duration-300 md:hidden rounded-md  top-full right-0  flex-col ${isshow ?' flex flex-col':"hidden"}`}>
               {links.map((items)=>(
                 <NavLink key={items.id} to={items.link} className="px-5 py-2 hover:bg-gray-100 hover:text-black" >{items.name}</NavLink>
                ))}
            </div>
          )}
         
        </nav>
        </section>
    )
}

export default Home;