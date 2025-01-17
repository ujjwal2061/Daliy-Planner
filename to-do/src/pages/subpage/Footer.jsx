// import { FaTwitter } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
// import { FaDiscord } from "react-icons/fa6";
 import { ThemeContext } from "../../theme/ThemeContext";
 import {NavLink} from "react-router-dom"
// import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useContext } from "react";
const Footer=()=>{
 
 const {theme} = useContext(ThemeContext)
  return (
        <section className={` ${theme === 'dark' ? "bg-zinc-900 text-white":"bg-white"}  right-1 left-2 p-5 border-t-2   flex-col justify-center md:flex-row `}>
        <div className="grid grid-cols-1 md:grid-cols-12 ">
            <div className=" flex justify-start  col-span-12 m-1 md:col-span-7">
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
            <div className=" border-t-2 md:border-t-0 md:border-l-2 m-2 flex-col  justify-center items-center col-span-12 md:col-span-3">
              <p className="items-center justify-center flex  font-semibold font-serif text-xl  m-2 ">Features</p>
              <div className="flex flex-col justify-center items-center gap-2 font-mono font-semibold ">
                <a href="#" className={`hover:bg-slate-200 px-2 py-1 rounded-md ${theme==="dark" ? "hover:text-black":""}`}>How it Work</a>
                <a href="#" className={`hover:bg-slate-200 px-2 py-1 rounded-md ${theme==="dark" ? "hover:text-black":""}`}>For Teams</a>
                <a href="#" className={`hover:bg-slate-200 px-2 py-1 rounded-md ${theme==="dark" ? "hover:text-black":""}`}>Pricing</a>
                <a href="#" className={`hover:bg-slate-200 px-2 py-1 rounded-md ${theme==="dark" ? "hover:text-black":""}`} >Templates</a>
              </div>
            </div>
            <div className="bg-yellow-400 flex justify-center items-center col-span-12 md:col-span-2">Third</div>
        </div>
     </section>
    )
}
export default  Footer;