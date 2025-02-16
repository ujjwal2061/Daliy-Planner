import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {
    const { singup } = useFirebase();
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword ,setShowpassword]=useState(false)
    const [loading ,setLoding]=useState(false)
    const handleSignup = async (e) => {
       e.preventDefault();
       // password vaildation checking
          if(password.length <8){
            setError('Password must be at least 8 characters')
            return false
          }
          if (!/[A-Z]/.test(password)) {
            setError('Need 1 uppercase letter');
            return false;
          }
          if (!/[a-z]/.test(password)) {
            setError('Need 1 lowercase letter');
            return false;
          }
          if (!/[0-9]/.test(password)) {
            setError('Need 1 number');
            return false;
          }
          setError('');
          // If all Valiad 
          try {
            setLoding(true);
            const user=await singup(email, password,userName);
            localStorage.setItem("UserEmail",user.email)
            localStorage.setItem("DisplayName",userName)
            setTimeout(() => {
              navigate("/content/workplace");
            }, 1000);
            setUserName("")
            setEmail("");
            setPassword('');
         } catch (err) {
            console.log(err)
            setError(err.message);
         }finally{
          setLoding(false)
         }
      };
      const showpassword=(e)=>{
         e.preventDefault()
         setShowpassword((prevpassword)=>!prevpassword)
      }
    

    return (
      <section className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="px-6 py-8 bg-white rounded-md shadow-lg w-[80%] sm:w-[500px]">
        <h2 className="text-2xl font-semibold text-center mb-5 font-mono">Create Account</h2>
    
        <div className="space-y-4">
          {/* Username */}
          <div className="flex flex-row justify-between items-center">
            <label className="font-semibold text-sm w-[30%]">UserName</label>
            <input
              type="text"
              className="px-4 py-3 w-[65%] placeholder:font-mono font-semibold rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <label className="font-semibold text-sm w-[30%]">Email</label>
            <input
              type="email"
              className="px-4 py-3 w-[65%] placeholder:font-mono font-semibold rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between items-center relative">
            <label className="font-semibold text-sm w-[30%]">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="px-4 py-3 w-[65%] placeholder:font-mono font-semibold rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <button type="button"  onClick={showpassword}
              className="absolute right-4 top-4 bg-transparent border-none cursor-pointer text-black"  >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
    
          <p className="text-red-500 text-sm text-center">{error}</p>
        </div>
    
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSignup}
            type="submit"
            disabled={loading}
            className="bg-gray-950 px-4 py-2 w-full rounded-lg text-white font-semibold text-xl hover:bg-gray-900"  >
           {loading ? "Signing up..." : "Signup"}
          </button>
        </div>
   
        <div className="mt-4 text-center">
          <p className="text-sm font-semibold">
            Already have an account?{' '}
            <NavLink to="/login" className="font-semibold text-blue-500 hover:underline"> Login  </NavLink>
          </p>
        </div>
      </div>
    </section>
    
    
    );
}
export default Signup;
