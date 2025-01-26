import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useFirebase } from "../firebase/Firebase";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Login=()=>{
    const {login,userName} =useFirebase()
    const navgation=useNavigate();
    const [error ,setError]=useState(false)
    const errorTimeRef=useRef(null)
    // Function to handle login 
    const handlelogin=async(e)=>{
        e.preventDefault()
        if(userName || localStorage.getItem("userName")){
          navgation("/content" ,{replace :true})
          return;
        }
     try{
      await login(email ,password)
      navgation("/content")
     }catch(error){
        setError(true)
        // use the useRef for remove the error
        if(errorTimeRef.current){
            clearTimeout(errorTimeRef.current)
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
<section className="min-h-screen flex flex-col justify-center items-center bg-gray-100 gap-6">
  <div className="w-[50%] md:mr-4 mr-8 px-2 py-2">
     <button  onClick={backbtn} type="submit"  className=" flex justify-center items-center  bg-gray-950 px-4 py-2 sm:w-[30%] md:w-[20%] rounded-lg text-white font-semibold text-xl hover:bg-gray-900"  >Back</button>
  </div>
  <div className="px-6 py-8 bg-white rounded-md shadow-lg w-[80%] sm:w-[500px]">
    <h2 className="text-2xl font-semibold text-center mb-5">Login</h2>
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <label className="font-semibold text-sm w-[30%]">Email</label>
        <input    type="email"   className="px-4 py-3 w-[65%] placeholder:font-mono font-semibold rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  />
      </div>
      <div className="relative flex flex-row justify-between items-center">
        <label className="font-semibold text-sm w-[30%]">Password</label>
        <input   type={showPassword ? "text" : "password"}
          className="px-4 py-3 w-[65%] placeholder:font-mono font-semibold rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  />
        <button  type="button"  onClick={showpassword}
          className="absolute right-4 top-4 bg-transparent border-none cursor-pointer text-black" >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <p className="text-red-500 text-sm text-center">{error}</p>
    </div>
    <div className="flex justify-center mt-6">
      <button
        onClick={handlelogin}
        type="submit"
        className="bg-gray-950 px-4 py-2 w-full rounded-lg text-white font-semibold text-xl hover:bg-gray-900"
      >
        Login
      </button>
    </div>
    <div className="mt-4 text-center">
      <p className="text-sm font-semibold">
        Don't have an account?{' '}
        <NavLink to="/signup" className="font-semibold text-blue-500 hover:underline">
          Sign Up
        </NavLink>
      </p>
    </div>
  </div>
</section>

    )
}
export default Login;