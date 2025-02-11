import { useEffect ,useState } from "react"
import { NavLink } from "react-router-dom"
import { TiThMenu } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { TbCone } from "react-icons/tb";
import { ThemeContext } from "../../theme/ThemeContext";
import { useContext } from "react";
const Home=()=>{
  const {theme ,setTheme}=useContext(ThemeContext);
  const [isshow ,setIsshow]=useState(false)
  const [isScrolled,setIsScrolled]=useState(false);
  useEffect(()=>{
    const handleScroll=()=>{
      if(window.scrollY>10){
        setIsScrolled(true)
      }else{
        setIsScrolled(false)
      }
    };
    window.addEventListener('scroll',handleScroll);
      return ()=> window.removeEventListener('scroll',handleScroll);
    
  },[]);
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
        name:"About",
        link:"/about"
      },
    ]
    const toogle=()=>{
      setIsshow((prevState)=>!prevState)
    }
   const ThemeToggle=()=>{
    setTheme((prevtheme)=>(prevtheme==="light"?"dark":"light"))
   }
    return(
<section className={` min-h-screen ${theme === "dark" ? "bg-black  text-white" : "bg-mainbackground text-black"}`}>
  <nav className={` 
   ${theme==='dark' ? isScrolled ?  
   "bg-zinc-900 backdrop-blur-sm text-white" : "bg-black text-white":isScrolled ? "bg-mainbackground text-black backdrop-blur-sm"
   : "bg-transparent text-black "}    flex justify-between items-center sm:px-5 py-2   fixed  top-0  left-0 right-0   transition-all duration-300 ease-in-out   `}>
      <div className="flex items-center ml-2 ">
        <NavLink to="/" className="text-2xl sm:text-3xl"><TbCone /></NavLink>
          <NavLink to="/" className="ml-1   text-xl sm:hidden font-mono font-semibold md:block hidden ">Daliy Planner</NavLink>
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
         <div className={`${theme=="dark" ?"text-black":"text-black"} absolute w-1/2  border  bg-white text-black md:hidden transition-all duration-300  rounded-md  top-11  z-10 right-0  flex-col ${isshow ?' flex flex-col':"hidden"}`}>
          {links.map((items)=>(
            <NavLink key={items.id} to={items.link} className="px-5 py-2 font-semibold font-mono hover:bg-gray-400 hover:text-black" >{items.name}</NavLink>
            ))}
          </div>
       )}
  </nav>
          
<div className=" flex flex-col lg:flex-row lg:justify-between items-center py-4 px-10 mt-12">
  <div className=" lg:w-1/2 w-full flex flex-col gap-3 justify-center p-4 bg-gradient-to-r">
  <div className="absolute lg:top-60 top-24 left-8 w-40 h-16 bg-white opacity-50 blur-3xl"></div>
    <h1 className="font-myfont selection:bg-highlight  selection:text-black font-semibold text-4xl text-center lg:text-left">
        Organize your work and life, <br /> with help of your <br /> <span className="lg:block md:block  hidden">Daily Planner.</span></h1>
        <p className="font-myfont text-xl font-semibold text-gray-600 text-center selection:bg-highlight  selection:text-black  lg:text-left">
        Simplify your life & be more productive.
       </p>
    <div className="flex justify-center lg:justify-start lg:mt-5 ">
        <NavLink to="/signup">
          <p
            className={`w-24 rounded-md px-2 py-1 font-medium cursor-pointer ${
              theme === "dark"
              ? "bg-white text-black"
              : "bg-zinc-950 text-white hover:bg-zinc-800"
            }`} >Start Now </p>
        </NavLink>
      </div>
      </div>
      <div className="lg:w-1/2 w-full flex justify-center p-4">
      <img
        src="Font.jpeg"
        alt="Main Display"
        className="object-cover w-full max-w-[550px] max-h-[350px] sm:max-h-[450px] md:max-h-[550px] rounded-xl" />
    </div>
  </div>      
    <div className="  px-6  flex flex-col gap-5 ">
      <h1 className="font-myfont  font-semibold text-6xl lg:text-left text-center "> How it Work</h1>
      <p className="font-myfont text-[18px] lg:text-left text-center">Daliy Plnner help you make the most of each day</p>
    </div>
</section>
    )
}
export default Home;









