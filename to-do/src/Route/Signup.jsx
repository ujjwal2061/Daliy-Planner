import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Signup = () => {
    const { signup } = useFirebase();
    const navigate = useNavigate();
    
    const handleSignup = async (e) => {
       e.preventDefault();
       try {
          await signup(email, password);
          setTimeout(() => {}, 5000);
          navigate("/content");
          setEmail("");
          setPassword('');
         } catch (err) {
            setError(err.message);
         }
      };
       const showpassword=(e)=>{
         e.preventDefault()
         setShowpassword((prevpassword)=>!prevpassword)
       }
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword ,setShowpassword]=useState(false)

    return (
 <section className="min-h-screen  flex flex-col  justify-center items-center ">
    <div className='p-5  bg-white rounded-md shadow-2xl w-80 '>
      <h2 className='flex justify-center text-xl font-jetbrains font-semibold'>Create Account </h2>

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
            </div>
             <div className='flex justify-center mt-4'>
                <button onClick={handleSignup} type="submit" className=' bg-black px-2 py-1 w-full rounded-lg text-white font-special text-xl font-mono hover:bg-gray-900'>Signup</button>
             </div>

           </div>
           
        </section>
    );
}
export default Signup;
