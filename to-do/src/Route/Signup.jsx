import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Signup = () => {
    const { singup ,userName ,setUserName } = useFirebase();
    const navigate = useNavigate();
    
    const handleSignup = async (e) => {
       e.preventDefault();
       try {
          await singup(email, password);
          localStorage.setItem("username", user.email)
          console.log(email)
          setTimeout(() => {
            navigate("/content");
          }, 1000);
          setEmail("");
          setPassword('');
         } catch (err) {
            console.log(err)
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
       {/*User Name*/}
       <div className="relative w-full justify-center items-center ">
           <label className='font-jetbrains  font-semibold text-sm'>UserName</label>
           <input type="email" className="px-4 py-3 ml-2  placeholder:font-mono tracking-tighter font-semibold rounded-lg outline-none transition-transform duration-150" placeholder="Enter your email" value={userName} onChange={(e) => setUserName(e.target.value)} />
           </div>

           {/*Email Section*/}
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
             <div className='flex justify-center mt-4'>
                <button onClick={handleSignup} type="submit" className=' bg-black px-2 py-1 w-full rounded-lg text-white font-special text-xl font-mono hover:bg-gray-900'>Signup</button>
             </div>
              <div className="mt-2 font-mono tracking-tighter flex flex-row justify-center items-center">
               <p>Have already account?<NavLink to="/login" ><span className="underline underline-offset-2 font-mono">Login</span></NavLink></p>
              </div>
           </div>
        </section>
    );
}
export default Signup;
