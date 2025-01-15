import { Twitter } from 'lucide-react';
import { Linkedin } from 'lucide-react';
const Footer=()=>{
    return (
        <section className=' mt-2 right-1 left-2 p-5   bg-zinc-700  flex-col justify-center md:flex-row'>
        <div className="p-2 flex flex-col justify-center gap-2  bg-white">
            <div className='flex flex-row justify-center items-center gap-6  bg-gray-700 px-5 py-1'>
             <a href='https://x.com/Ujjwal_2061' target='_blank' ><Twitter /></a>
             <a href='https://www.linkedin.com/in/ujjwal-gaihre-9719ba289/' target='_blank' ><Linkedin /></a>
            </div>
             <div className='flex justify-center '>
               <h3 className='font-mono font-semibold text-xl'>Feel Free to reach me via Twitter,or LinkedIn!</h3>
               <h4>Join the Discord <a href='' target='_blank' ></a> </h4>
             </div>
        </div>
     </section>
    )
}
export default  Footer;