 import { ThemeContext } from "../../theme/ThemeContext";
import { useContext } from "react";
const Footer=()=>{
 
 const {theme} = useContext(ThemeContext)
  return (
        <section className={` ${theme === 'dark' ? "bg-black text-white":"bg-white"}  right-1 left-2 p-5  flex-col justify-center md:flex-row `}>
        <div className="grid grid-cols-1 md:grid-cols-12 ">
            <div className=" flex justify-start  col-span-12 m-1 md:col-span-6">
            </div>
        </div>
       
     </section>
    )
}
export default  Footer;