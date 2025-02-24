import React, { useEffect, useState } from 'react'
import { ThemeContext } from '../theme/ThemeContext';
import { useFirebase } from '../firebase/Firebase';
import { useContext } from 'react';
import {useRef} from "react"
import {ref, update} from "firebase/database"
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const Useracc=()=>{
   const {theme} =useContext(ThemeContext)
   const [coverImage ,setCoverImage]=useState(null);
   const [profileImage,setProfileImage]=useState(null)
   const [newUserName ,setnewUserName] =useState("")
   const [Bio,setBio]=useState("")
   const [editMode, setEditMode] = useState(false);
   const [showEmail ,setShowEmail]=useState(false)
   const [loading ,setLoading]=useState(false)
   const Max_Bio_Text=120;
   const fileInputImage=useRef(null)
   const profileInputImage=useRef(null)
   const {userName ,setUserName ,database,Logout} =useFirebase()
   const  auth=getAuth(); 
   const user=auth.currentUser; 
   const navigate=useNavigate()
   useEffect(()=>{
      const storedprofilePic=localStorage.getItem("profileImage")
      const storedcoverImage=localStorage.getItem('userCoverImage')
      const storedName=localStorage.getItem('userName')
      const storedBio=localStorage.getItem("Bio")
      if(storedcoverImage){
         setCoverImage(storedcoverImage);
      }
      if(storedprofilePic){
       setProfileImage(storedprofilePic)
      }
      if(storedName){
         setUserName(storedName)
      }
      if(storedBio){
         setBio(storedBio)
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
         try{
            const userRef=ref(database,`users/${user.uid}`);
            await update (userRef,{
               Name:newUserName,
               Bio:Bio,
               coverImage:coverImage,
               profileImage:profileImage
            })
            setUserName(newUserName)
            // save the user Info at the local storage
            localStorage.setItem('profileImage',profileImage);
            localStorage.setItem('CoverImage',coverImage);
            localStorage.setItem('userName', newUserName);
            localStorage.setItem('Bio', Bio);
            localStorage.setItem("UserEmail",user.email)
            setEditMode(false)
      
         }catch(error){
          
            throw error
         }
        }
         // show and unShow  Email
         const handleshowEmail = () => {
            setShowEmail(prevState => !prevState); // Toggle the email visibility
          };
          //logout fucntion 
          const handleLogout = async () => {
            try {
              setLoading(true);
              await Logout();
              localStorage.clear();
              setTimeout(()=>{
                 navigate("/");
              },5000)
            } catch (error) {
              console.error("Logout error:", error);
            } finally {
              setLoading(false);
            }
          };
  return (
   <section className={`p-4 min-h-screen flex flex-col items-center ${theme === "dark" ? "bg-[#18191A] text-black" : "bg-[#F0F2F5] text-black"}`}>
          {/*First Section For Coverimage  and Pesonal INfroamtion*/}
          <div className='flex flex-col justify-start w-full ' >
          <div className='flex flex-col  justify-center items-center  '>
             <div className="relative w-full max-w-4xl group  cursor-pointer px-2 py-2" onClick={()=>fileInputImage.current.click()} >
               <input  ref={fileInputImage} type='file' accept='image/*'  onChange={handledImageupload} style={{ display:"none" }} />
                <img  src={coverImage ||  'cover.jpeg'}className=' w-full h-64 object-cover rounded-lg group-hover:opacity-40 transition-opacity' />
                <div className='absolute inset-0 flex items-center justify-center text-black  opacity-0 group-hover:opacity-50 '>
                  <span className=' px-2  rounded-lg bg-opactiy-20  bg-slate-200 tracking-tighter font-sans font-semibold'>Change Cover photo</span>
                </div>
             </div>
          {/*Profile Image */}
           <div className={`w-[80%] sm:w-[95%] max-w-4xl px-2    py-1 m-2 flex sm:flex-row    items-center rounded-md  flex-col gap-2 ${theme === "dark" ? " bg-[#242526] text-white" : "bg-boxBackground text-black"}`}>
             {editMode ? (
               <>
                <div className="px-2  cursor-pointer group    rounded-lg " onClick={()=>profileInputImage.current.click()} >
                 <input ref={profileInputImage || 'profile.jpg' } type='file' accept='image/*' onChange={profileImagehandle}  style={{ display:"none" }}  />
                 <img  src={profileImage} className='w-20 h-20 object-coverr object-cover  group-hover:opacity-40 transition-opacity  rounded-full' />
                </div>
               <div className=' px-2 py-1  h-52 sm:h-56 sm:w-[80%] flex flex-col  justify-between w-[70%] rounded'>
                  <label className="font-mono spacey-1 text-sm font-semibold mr-2 ">UserName</label>
                   <input type="text" value={newUserName} onChange={(e)=>setnewUserName(e.target.value)} className="text-sm  text-black font-jetbrains sm:w-1/2 w-28  rounded-md px-2 py-1"/>
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
                 <div className="px-2 cursor-pointer group rounded-lg " >
                     <img src={profileImage} className='w-20 h-20 object-cover group-hover:opacity-40 transition-opacity rounded-full' />
                  </div>
                  <div className=' px-2 py-1  h-52 sm:h-56 sm:w-[80%] flex flex-col   w-[70%] rounded '>
                  <label className="font-mono spacey-1 text-sm font-semibold mr-2 ">UserName</label>
                    <p className=' sm:w-1/2 w-28  h-8 rounded-lg px-2 cursor-text font-mono  bg-slate-100 text-black py-1'>{ newUserName || userName}</p>
                     <h3 className='font-semibold font-mono'>Bio</h3>
                     <p className='font-mono text-sm w-full sm:w-1/2  h-32 rounded-lg cursor-text   bg-slate-100 text-black px-2 py-1  '>{Bio || "Set the Bio"}</p>
                  <div className=' mt-2 bg-gray-800 hover:bg-gray-900 px-2 py-1 h-10  w-20   items-center  flex justify-center font-mono font-semibold rounded-md'>
                   <button onClick={()=>setEditMode(true)}>Edit</button>
                  </div>
                  </div>
                    </>
                  )}
           </div>
           <div className=' flex flex-col justify-start  mr-[245px] items-start '>
              <div className={` hidden md:block w-[450px] h-16 px-3 py-2 m-2  flex-row  justify-center items-center rounded-md   gap-2 ${theme === "dark" ? " bg-[#242526] text-white" : "bg-boxBackground text-black"}` }>
               <div className="flex  flex-row justify-between w-96  rounded-md items-center px-1 ml-2 ">
               <p className='font-mono  flex  font-semibold'>Email:</p>
              {user && showEmail  &&  (
                 <h2 className='font-mono text-sm  mr-48 font-semibold'>{user.email}</h2> 
               )}

                <button type="button"  onClick={handleshowEmail} className='flex px-2 py-1  h-8 md:h-8  bg-pink-700 font-mono  font-semibold rounded-md'>{showEmail ? "Hide":"Show" }</button>
            
               </div>
            </div>
            <div className=''>
              <button  onClick={handleLogout}  className='bg-slate-800 text-white px-4 py-2   rounded-md font-mono font-semibold hover:bg-gray-900 transition-all sm:px-6' >
                {loading ? "Logging out..." : "Logout"}
            </button>
            </div>
            </div>
          </div> 
      </div>
       </section>
  )
}
export default Useracc;


 /// password :Luffy2001#
 /// email:luffy@gmail.com