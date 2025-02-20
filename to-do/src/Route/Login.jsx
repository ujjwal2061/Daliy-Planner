import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useFirebase } from "../firebase/Firebase";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Login=()=>{
    const {login ,setUserName} =useFirebase()
    const navgation=useNavigate();
    const [error ,setError]=useState(false)
    const [loading ,setLoding]=useState(false)
    const errorTimeRef=useRef(null)
    // Function to handle login 
    const handlelogin=async(e)=>{
        e.preventDefault()
     try{
      setLoding(true)
      await login(email ,password)
      navgation("/content/workplace");
      setUserName(email)
     }catch(error){
      setLoding(false)
      if(error.code==="auth/invalid-email"){
        setError("Invalid email format. Please check your email.")
      }else if(error.code==="auth/user-not-found"){
        setError("No account Found")
      }else if(error.code==="auth/wrong-password"){
        setError("Incorrect password")
      } else {
        setError("An error occurred. Please try again.");
    }
        
        // use the useRef for remove the error
        if(errorTimeRef.current){
            clearTimeout(errorTimeRef.current)
        }
         errorTimeRef.current=setTimeout(()=>{
            setError("");
         },3000)
     }
    }
    // back to the home page 
    
    const showpassword=(e)=>{
        e.preventDefault()
        setShowpassword((prevpassword)=>!prevpassword)
      }
        const [email ,setEmail]=useState("")
        const [password ,setPassword]=useState("")
        const [showPassword ,setShowpassword]=useState(false)
    return(
<section className="min-h-screen   flex flex-col justify-center items-center bg-gray-100 gap-6">
 
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
   
    </div>
    <div className="flex justify-center mt-6">
      <button
        onClick={handlelogin}
        type="submit"
        className="bg-gray-950 px-4 py-2 w-full rounded-lg text-white font-semibold text-xl hover:bg-gray-900"
      >
         {loading ? "Loging ...." :"Login"} 
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
  {error &&  <p className="mt-10 absolute bottom-12 right-7 bg-red-600 px-3 py-2 font-mono rounded-md text-white">{error}</p>}  
</section>

    )
}
export default Login;