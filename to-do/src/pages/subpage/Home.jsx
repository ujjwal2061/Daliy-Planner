import { useState } from "react"
import { NavLink } from "react-router-dom"
import { TiThMenu } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { TbCone } from "react-icons/tb";
import { ThemeContext } from "../../theme/ThemeContext";
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

    const sectiion=[
      {
        id:1,
        name:"Features",
        link:"/feature"
      },
      {
        id:2,
        name:"Pricing",
        link:"/pricing"
      },
      {
        id:3,
        name:"About Us",
        link:"/about"
      },
    ]
    const toogle=()=>{
      setIsshow(prevState=>!prevState)
    }
   const ThemeToggle=()=>{
    setTheme((prevtheme)=>(prevtheme==="light"?"dark":"light"))
   }
    return(
      <section className={` min-h-screen ${theme === "dark" ? "bg-black  text-white" : "bg-white text-black"}`}>
        <nav className={`  ${theme==='dark' ? "bg-zince-900 text-white":""}      flex justify-between items-center sm:px-5 py-2  border-b-2  left-0 right-0 z-50   transition-all duration-300 ease-in-out `}>
          <div className="flex items-center ml-2 ">
            <NavLink to="/" className="text-2xl sm:text-3xl"><TbCone /></NavLink>
             <NavLink to="/" className="ml-1 mt-1  text-xl sm:hidden font-mono font-semibold md:block hidden ">Daliy Planner</NavLink>
            </div>
          <div className=" items-center ml-auto   justify-center gap-6  hidden md:flex ">
            {sectiion.map((items)=>(
              <NavLink key={items.id} to={items.link} className=" font-semibold text-[17px] rounded-md px-3 hover:px-3 " >{items.name}</NavLink>
            ))}
          </div>
         
        
          <div className="flex  items-center md:gap-6 gap-4">
           <NavLink key={links[0]} to={links[0].link}  className="font-semibold font-mono border-l-2 px-1.5">{links[0].name}</NavLink>
           <spna onClick={ThemeToggle} className="text-2xl cursor-pointer rounded-md" > {theme === "light" ? "☀️" : "🌙"}</spna>
           <div className="p-1">
            <NavLink to="/signup" ><p className={`md:block hidden rounded-md px-2 py-1 b border-2  font-medium  cursor-pointer   ${theme==="dark" ?"bg-white text-black":"bg-zinc-950 text-white hover:bg-zinc-800"}`}>Start Now</p></NavLink>
           </div>
           
           <div className="md:hidden mr-2">
           <button  onClick={toogle}>
            {isshow ? (
              <IoIosArrowBack size={24}/>
            ):(
              <TiThMenu />
            )}
          </button>
            </div>
            </div>
          {isshow && (
            <div className={`${theme=="dark" ?"text-black":"text-white"} absolute w-1/2 mt-2 border transition-all duration-300 md:hidden rounded-md  top-full right-0  flex-col ${isshow ?' flex flex-col bg-white':"hidden"}`}>
               {links.map((items)=>(
                 <NavLink key={items.id} to={items.link} className="px-5 py-2 font-semibold font-mono hover:bg-gray-100 hover:text-black" >{items.name}</NavLink>
                ))}
            </div>
          )}
        </nav>
        
        <div className="relative flex mt-2 justify-center items-center">
        <div className="px-3 py-2 w-full sm:w-[90%] md:w-[80%] flex justify-center">
          <img  src="Font.jpeg"   alt="Main Display"  className="object-cover w-full max-h-[350px] sm:max-h-[450px] md:max-h-[550px] rounded-xl" />
        </div>

        <div className="absolute inset-x-0 bottom-4 sm:bottom-8 md:bottom-16 flex flex-col justify-center items-center text-center text-white px-4">
          <h5 className="text-lg sm:text-xl md:text-2xl font-semibold font-mono mb-2">   Plan your day, every day </h5>
          <p className="text-sm sm:block hidden  md:text-xl font-semibold font-mono max-w-2xl"> Make time for what&#39;s important. Get started with Daily Planner.  </p>
        </div>
      </div>

      <div className="mt-6 p-2 flex flex-row  justify-start md:ml-36 ml-11  w-[80%] items-center">
        <div  className="flex-col  px-2 " >
        <h1 className="text-3xl font-sans font-bold ">How it Work</h1>
        <p className="font-mono  tracking-tight text-[18px] font-semibold">Daily Planner helps you make the most of the each day </p>
        </div>
      </div>
  
      <div className=" ml-5 sm:ml-10 md:ml-16 lg:ml-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[90%] lg:w-[80%] mx-auto md:gap-6 gap-2">
       <div className="text-center col-span-1 py-4 w-full flex  flex-col justify-center  p-1">
        <div className="aspect-w-4 aspect-h-3 w-[95%] flex px-2  ">
         <img src="one.jpeg" className="object-cover   sm:w-[80%] md:w-full lg:w-full h-auto rounded-xl cursor-pointer shadow-xl  transition-transform duration-500 ease-in-out hover:scale-105" />
        </div>
          <h3 className="font-serif text-left mt-4 ">Set a new Plan every day </h3>
          <p className="font-mono font-semibold text-left text-sm text-gray-500 ml-2 ">Based on Your Schedule and Goals </p>
       </div>
       <div className="text-center py-4 col-span-1 flex flex-col  justify-center p-1">
       <div className="aspect-w-4 aspect-h-3 w-[95%] flex  px-2  ">
         <img src="work.jpeg" className=" object-cover sm:w-[80%] md:w-full lg:w-full  h-auto rounded-xl cursor-pointer shadow-xl transition-transform duration-500 ease-in-out hover:scale-105" />
        </div>
         <h3 className="font-serif text-left mt-2">Set a new Plan every day </h3>
          <p className="font-mono font-semibold text-left text-sm text-gray-500  ml-2 ">Based on Your Schedule and Goals </p>
       </div>
       <div className="md:hidden flex-col  flex   lg:block  col-span-1 py-4  justify-center ">
       <div className="aspect-w-4 aspect-h-3 w-[95%] flex px-2 ">
         <img src="third.jpeg" className="  object-cover sm:w-[80%] md:w-full lg:w-full  h-auto rounded-xl cursor-pointer shadow-xl transition-transform duration-500 ease-in-out hover:scale-105" />
          </div>
       </div>
    </div>
        </section>
    )
}

export default Home;