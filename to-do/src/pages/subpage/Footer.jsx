import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { ThemeContext } from "../../theme/ThemeContext";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useContext } from "react";
const Footer=()=>{
 const {theme} = useContext(ThemeContext)
  return (
        <section className={` ${theme === 'dark' ? "bg-zinc-900 text-white":"bg-white"} mt-2 right-1 left-2 p-5   flex-col justify-center md:flex-row `}>
        <div className="p-2 flex flex-col justify-center gap-2 ">
            <div className='flex flex-row justify-center items-center gap-6   px-5 py-1'>
             <a href='https://x.com/Ujjwal_2061' target='_blank' ><FaTwitter /></a>
             <a href='https://github.com/ujjwal2061' target='_blank' ><FaGithub /></a>
            </div>
             <div className='flex justify-center items-center  gap-2 '>
               <h3 className='font-mono font-semibold text-xl'>Feel Free to reach me via Twitter,or LinkedIn!</h3>
               <a href='https://discord.gg/nYFujUb8' target='_blank' ><FaDiscord  /></a><span className=""><FaArrowAltCircleLeft /></span>
             </div>
        </div>
     </section>
    )
}
export default  Footer;