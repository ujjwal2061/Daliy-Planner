import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useFirebase } from "../firebase/Firebase";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login=()=>{
    const {login} =useFirebase()
    const navgation=useNavigate();
    const [error ,setError]=useState(false)
    const errorTimeRef=useRef(null)
    // Function to handle login 
    const handlelogin=async(e)=>{
        e.preventDefault()
     try{
      await login(email ,password)
      navgation("/content")
     }catch(error){
        setError(true)
        // use the useRef for remove the error
        if(errorTimeRef.current){
            clearInterval(errorTimeRef.current)
        }
         errorTimeRef.current=setTimeout(()=>{
            setError("");
         },3000)
         console.log(error)
     }
    }
    // back ti the home page 
    const backbtn=()=>{
        navgation("/")
    }
    const showpassword=(e)=>{
        e.preventDefault()
        setShowpassword((prevpassword)=>!prevpassword)
      }
        const [email ,setEmail]=useState("")
        const [password ,setPassword]=useState("")
        const [showPassword ,setShowpassword]=useState(false)
    return(
<section className="min-h-screen  flex flex-col  justify-center items-center ">
    <div className='p-5  bg-white rounded-md shadow-2xl w-80 '>
      <h2 className='flex justify-center text-xl font-jetbrains font-semibold'>Login</h2>
      
       <div className='space-y-2 '> 
       {/* Email section*/}
       <div className="relative w-full justify-center items-center ">
           <label className='font-jetbrains  font-semibold text-sm'>Email</label>
           <input type="email" className="px-4 py-3 ml-2  placeholder:font-mono tracking-tighter font-semibold rounded-lg outline-none transition-transform duration-150" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
           </div>
           {/*Password  */}
            <div className="relative  flex flex-row  justify-center items-center">
               <label className=' font-jetbrains font-semibold text-sm'>Password</label>
            <input type={showPassword ? "text" : "password"} className="px-4 py-3 placeholder:font-mono tracking-tighter font-semibold rounded-lg outline-none transition-transform duration-150  w-full pr-10" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
             <button type="button" onClick={showpassword} className="absolute right-3 bottom-0 top-1 bg-transparent border-none cursor-pointer text-black">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
             </button>
             </div>
             <p className="text-gray-600 font-mono">{error}</p>
            </div>
             
              
           </div>
        </section>
    )
}
export default Login;