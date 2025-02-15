import { ThemeContext } from "../../theme/ThemeContext";
import React, { useContext } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { TbCone } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = React.forwardRef(({ scrollToSection, homeRef }, ref) => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer ref={ref}  className={`${  theme === "dark" ? "bg-black text-white" : "bg-white text-black"  } px-6 py-10 md:px-20 lg:px-32`}   >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="md:w-1/3 text-start flex flex-col  m-2 md:text-left">
            <NavLink to="/"  className="text-3xl font-bold flex items-center gap-2">
              <TbCone className="text-4xl" /> Daily-Planner
            </NavLink>
            <NavLink  to="/signup"   className={`mt-2 text-center font-lightfont text-[18px] 
            transition-all duration-300 ease-in-out   hover:rounded-md w-32 px-5 py-2 rounded-full shadow-md ${theme=== "dark" ? "bg-gray-800 hover:bg-slate-700 ":"bg-slate-300 hover:bg-slate-500"}`  }>
             Try Now
            </NavLink>
            <p className="mt-3 text-[16px] font-myfont ">   Make Your Day Easy and Productive with us</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-10 mt-6 md:mt-0">
           
          </div>
        </div>
        <div className="mt-10 border-t border-gray-600 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">&copy;  {new Date().getFullYear()} . All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://x.com/Ujjwal_2061" target="_blank" rel="noopener noreferrer">
              <FaXTwitter  className="text-xl hover:text-gray-300 transition" />
            </a>
            <a href="https://github.com/ujjwal2061" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-xl hover:text-gray-300 transition" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaDiscord className="text-xl hover:text-gray-300 transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
