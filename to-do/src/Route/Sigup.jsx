import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase";


const Sigup=()=>{
   const {singiup } =useFirebase()
  const [error ,setError]=useState("")
  const navagation=useNavigate()
// handle the Siginup process 
   const handlesignup=async(e)=>{
      e.preventDefault()
      try{
        await singiup(email ,password)
        setTimeout(()=>{
        },5000)
        navagation("/content")
        setEmail("")
        setPassword('');
      }catch(err){
        setError(err.messagge)
      }
   }

    const [email ,setEmail]=useState("")
    const [password ,setPassword]=useState("")
    return(
    <section  className="bg-black">
        
       <form onSubmit={handlesignup} >
        {error && <p>{error}</p>}
        <input   className="bg-pink-600"  type="email" placeholder="enter your email" value={email}  onChange={(e)=>setEmail(e.target.value)} />      
        <input type="password" placeholder="enter your password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">SiginUp</button>
        <p>Have Account<NavLink to="/login">Login</NavLink>?</p>      
       </form>
      
    </section>
    )
}
export default Sigup;