import React, { useEffect, useState } from 'react'
import { ThemeContext } from '../theme/ThemeContext';
import { useContext } from 'react';
import {useRef} from "react"
const Useracc=()=>{
   const {theme} =useContext(ThemeContext)
   const [coverImage ,setCoverImage]=useState(null);
   const fileInputImage=useRef(null)


   useEffect(()=>{
      const storedcoverImage=localStorage.getItem('userCoverImage')
      if(storedcoverImage){
         setCoverImage(storedcoverImage);
      }
   })
   // upoload image coverfunction
   const handledImageupload=(e)=>{
      const file=e.target.files[0]
      if(file){
         const read=new FileReader()
         read.onload=(e)=>{
           const imageData=e.target.result;
           setCoverImage(imageData);
           localStorage.setItem("userCoverImage",imageData)
         }
         reder.readAsDataURL(file)
      };
   }
  return (
       <section className={` bg-slate-500  h-screen  ${theme==="dark" ? "bg-zinc-800 text-white":"bg-white text-black"}`}>
          {/*First Section For iamger and Pesonal INfroamtion*/}
          <div className='flex flex-col  justify-center items-center  '>
             <div className="relative w-full max-w-4xl group  cursor-pointer px-2 py-2" onClick={()=>fileInputImage.current.click()} >
               <input  ref={fileInputImage} type='file' accept='image/*'  onChange={handledImageupload} style={{ display:"none" }} />
                <img  src={coverImage || './'}className=' w-full h-64 object-cover rounded-lg border-4 border-white shadow-lg group-hover:opacity-40 transition-opacity' />
                <div className='absolute inset-0 flex items-center justify-center text-black  opacity-0 group-hover:opacity-50 '>
                  <span className=' px-2  rounded-lg bg-opactiy-20  bg-slate-200 tracking-tighter font-sans font-semibold'>Change Cover photo</span>
                </div>
             </div>
          </div> 
          {/*Profile Image */}
       </section>
  )
}
export default Useracc;