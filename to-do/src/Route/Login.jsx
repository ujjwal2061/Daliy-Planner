import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useFirebase } from "../firebase/Firebase";

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
        const [email ,setEmail]=useState("")
        const [password ,setPassword]=useState("")
    return(

        <section className="h-screen bg-zinc-800">
       <form onSubmit={handlelogin} className="flex justify-center items-center " >
        <input  type="email" placeholder="enter your email" value={email}  onChange={(e)=>setEmail(e.target.value)} />      
        <input type="password" placeholder="enter your password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit">Login</button> 
         {error&& (<p>Invalaid password or email </p>)}     
       </form>
       <button  onClick={backbtn}>Back</button>
    </section>
    )
}
export default Login;