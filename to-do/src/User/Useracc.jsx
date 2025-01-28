import React, { useEffect, useState } from 'react'
import { ThemeContext } from '../theme/ThemeContext';
import { useFirebase } from '../firebase/Firebase';
import { useContext } from 'react';
import {useRef} from "react"
import {ref, update} from "firebase/database"
import { getAuth } from 'firebase/auth';

const Useracc=()=>{
   const {theme} =useContext(ThemeContext)
   const [coverImage ,setCoverImage]=useState(null);
   const [profileImage,setProfileImage]=useState(null)
   const [newUserName ,setnewUserName] =useState("")
   const [Bio,setBio]=useState("")
   const [editMode, setEditMode] = useState(false);
   const Max_Bio_Text=120;
   const fileInputImage=useRef(null)
   const profileInputImage=useRef(null)
    const {userName ,setUserName ,database} =useFirebase()
   useEffect(()=>{
      const storedprofilePic=localStorage.getItem("profileImage")
      const storedcoverImage=localStorage.getItem('userCoverImage')
      if(storedcoverImage){
         setCoverImage(storedcoverImage);
      }
      if(storedprofilePic){
       setProfileImage(storedprofilePic)
      }
   },[])
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
         read.readAsDataURL(file)
      };
   }
   // for profile iamge function
    const profileImagehandle=(e)=>{
    const file=e.target.files[0]
    if(file){
      const read=new FileReader()
      read.onload=(e)=>{
         const profilePic=e.target.result;
         setProfileImage(profilePic)
         localStorage.setItem("profileImage",profilePic)
      }
      read.readAsDataURL(file)
    }
      }
      //  Update the userName and the ProfileImage and the CoverImage
      
        const handleChangeProfile=async()=>{
         const  auth=getAuth();
         const user=auth.currentUser;
         try{
            const userRef=ref(database,`users/${user.uid}`);
            await update (userRef,{
               Name:newUserName,
               Bio:Bio,
               coverImage:coverImage,
               profileImage:profileImage
            })
            setUserName(newUserName)
            localStorage.setItem('profileImage',profileImage);
            localStorage.setItem('CoverImage',coverImage);
            setEditMode(false)
            console.log("user New Info")
         }catch(error){
            console.log(error)
            throw error
         }
        }
  return (
       <section className={` bg-slate-500  h-screen  ${theme==="dark" ? "bg-zinc-800 text-white":"bg-white text-black"}`}>
          {/*First Section For iamger and Pesonal INfroamtion*/}
          <div className='flex flex-col  justify-center items-center  '>
             <div className="relative w-full max-w-4xl group  cursor-pointer px-2 py-2" onClick={()=>fileInputImage.current.click()} >
               <input  ref={fileInputImage} type='file' accept='image/*'  onChange={handledImageupload} style={{ display:"none" }} />
                <img  src={coverImage || './'}className=' w-full h-64 object-cover rounded-lg group-hover:opacity-40 transition-opacity' />
                <div className='absolute inset-0 flex items-center justify-center text-black  opacity-0 group-hover:opacity-50 '>
                  <span className=' px-2  rounded-lg bg-opactiy-20  bg-slate-200 tracking-tighter font-sans font-semibold'>Change Cover photo</span>
                </div>
             </div>
          {/*Profile Image */}
           <div className={`w-[80%] sm:w-[95%] max-w-4xl px-2    py-1 m-2 flex sm:flex-row    items-center rounded-md  flex-col gap-2 ${theme==="dark" ? "bg-zinc-900 text-white":"bg-slate-600 text-black"}` }>
             {editMode ? (
               <>
                <div className="px-2  cursor-pointer group    rounded-lg " onClick={()=>profileInputImage.current.click()}>
                 <input ref={profileInputImage} type='file' accept='image/*' onChange={profileImagehandle}  style={{ display:"none" }}  />
                 <img  src={profileImage} className='w-20 h-20 object-coverr object-cover  group-hover:opacity-40 transition-opacity  rounded-full' />
                </div>
               <div className=' px-2 py-1  h-52 sm:h-56 sm:w-[80%] flex flex-col  justify-between w-[70%] rounded'>
                  <label className="font-mono spacey-1 text-sm font-semibold mr-2 ">UserName</label>
                   <input type="text" value={userName} onChange={(e)=>setnewUserName(e.target.value)} className="text-sm  text-black font-jetbrains sm:w-1/2 w-28  rounded-md px-2 py-1"/>
                   <h2 className='font-mono   font-semibold text-sm'>Bio</h2>
                   <textarea type='text' value={Bio} 
                    maxLength={Max_Bio_Text}
                    onChange={(e)=>setBio(e.target.value)} rows={4}  cols={20}    className="text-sm text-black font-jetbrains rounded-md px-2 py-1 w-full mb-1" placeholder="Write your bio..." />
                  <div className='text-right text-xs text-gray-600'>
                     {Bio.length}/{Max_Bio_Text}
                   </div>
                   <div className='bg-gray-800 hover:bg-gray-900 px-2 py-1 h-10  w-20   items-center  flex justify-center font-mono font-semibold rounded-md'>
                   <button onClick={handleChangeProfile}>Save</button>
                  </div>
                  </div>
                    </>
                  ):(
                     <>
                 <div className="px-2 cursor-pointer group rounded-lg">
                     <img src={profileImage} className='w-20 h-20 object-cover group-hover:opacity-40 transition-opacity rounded-full' />
                  </div>
                  <div className=' px-2 py-1  h-52 sm:h-56 sm:w-[80%] flex flex-col   w-[70%] rounded bg-pink-500'>
                  <label className="font-mono spacey-1 text-sm font-semibold mr-2 ">UserName</label>
                    <p className='bg-slate-200 sm:w-1/2 w-28 rounded-lg px-2  font-mono  text-black py-1'>{userName}</p>
                  </div>
                  <div className='text-right text-xs text-gray-600'>
                     <p>{Bio}</p>
                   </div>
                  <div onClick={()=>setEditMode(true)} className='bg-gray-800 hover:bg-gray-900 px-2 py-1 h-10  w-20   items-center  flex justify-center font-mono font-semibold rounded-md'>
                   <button>Edit</button>
                  </div>
                
                    </>
                  )}
           </div>
          </div> 
       </section>
  )
}
export default Useracc;