// import { FaTwitter } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
// import { FaDiscord } from "react-icons/fa6";
 import { ThemeContext } from "../../theme/ThemeContext";
 import {NavLink} from "react-router-dom"
// import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";
const Footer=()=>{
 
 const {theme} = useContext(ThemeContext)
  return (
        <section className={` ${theme === 'dark' ? "bg-black text-white":"bg-white"}  right-1 left-2 p-5 border-t-2   flex-col justify-center md:flex-row `}>
        <div className="grid grid-cols-1 md:grid-cols-12 ">
            <div className=" flex justify-start  col-span-12 m-1 md:col-span-6">
              <div className="flex-col justify-start items-center">
              <span className="font-semibold font-mono tracking-tight ">
                <NavLink to="/">
                {/*img to add there*/}
                  Daily Planner
                </NavLink>
              </span>
                <p className="font-semibold  font-mono mt-2">Join millions of people who organize work and life with Daliy Planner.</p>
              </div>
            </div>
            <div className=" border-t-2 md:border-t-0  m-2 flex  flex-col  justify-center items-center col-span-12 md:col-span-3">
              <p className="items-center justify-center flex  font-semibold font-serif text-xl  m-2 ">Features</p>
              <div className= "px-2 flex flex-col justify-center items-center gap-2 font-mono font-semibold w-[80%] rounded-lg  transform perspective-1000 rotate-x-12 ">
                <a href="#" className={` ${theme==="dark"? "hover:bg-slate-700" :"hover:bg-slate-200"} px-2 py-1 w-full flex flex-row  items-center justify-between  rounded-md`} >How it Work<span><IoIosArrowForward /></span></a>
                <a href="#" className={` ${theme==="dark"? "hover:bg-slate-700" :"hover:bg-slate-200"} px-2 py-1 w-full flex flex-row  items-center justify-between  rounded-md `}>For Teams <span><IoIosArrowForward /></span></a>
                <a href="#" className={` ${theme==="dark"? "hover:bg-slate-700" :"hover:bg-slate-200"} px-2 py-1 w-full flex flex-row  items-center justify-between  rounded-md  `}>Pricing<span><IoIosArrowForward /></span></a>
                <a href="#" className={`${theme==="dark"? "hover:bg-slate-700" :"hover:bg-slate-200"} px-2 py-1 w-full flex flex-row  items-center justify-between  rounded-md  `} >Templates<span><IoIosArrowForward /></span></a>
            </div>
            </div>
            <div className="bg-yellow-400 flex justify-center items-center col-span-12 md:col-span-3">Third</div>
        </div>
       
     </section>
    )
}
export default  Footer;