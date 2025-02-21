import React, { useState ,useRef,useEffect} from 'react'
import first from '../assets/first.mp3'
import second from '../assets/second.mp3'
import { ThemeContext } from '../theme/ThemeContext';
import { useContext } from 'react';
import { useFirebase } from '../firebase/Firebase';
import { IoStarSharp } from "react-icons/io5";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
const Stats=()=>{

  const links=[
    {
      stars: 3,
      rarity: "Rare",
  
      pic:"https://i.pinimg.com/736x/4f/43/12/4f4312a0f82ee2951377004ff8ed0f18.jpg",
    },
    {
      stars: 4,
      rarity: "Ultra Rare",
      pic:"https://i.pinimg.com/736x/22/bf/94/22bf94b4b524c8db504055ca985af140.jpg",
    },
    {
      stars: 5,
      rarity: "Legendary",
      pic:"https://i.pinimg.com/736x/b4/ec/44/b4ec4444f0d4b221d21dfce6512dc38e.jpg",
    }
    
  ]
  const { database}=useFirebase()
  const {theme} =useContext(ThemeContext)
  const [name,setEmail]=useState("")
  
  const [startTime,setstartTime]=useState(45*60) // convert the 25 into min  
  const [isStart,setISStart]=useState(false)
  const [breake ,setbreak]=useState(5*60) // convert tha the 5 into 5 min
  const [isBreka ,setIsbreake]=useState(false) 
  const [spentime,setSpentime]=useState(0)
  const [sessionStart, setSessionStart] = useState(null);
  const [unlockedImages, setUnlockedImages] = useState([]);
  const timeRef=useRef(null)
  const breakRef=useRef(null)
  const soundRef=useRef(null)
  const firstRef=useRef(null)
  // for the breake time
  const playSetAlarm = () => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0; // Reset audio to start
      soundRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  }
  // for Focus timer
  const playAlram=()=>{
    if(firstRef.current){
      firstRef.current.currentTime=0;
      firstRef.current.play().catch(error=>console.log("Audio can be play",error))
    }
  }
 // conver the time into minute and second
 const timechange=(timeconvert)=>{
  const minute=Math.floor(timeconvert/60);
  const second=timeconvert%60
  return `${minute.toString().padStart(2,'0')}:${second.toString().padStart(2,'0')}`
 }
 // for the Breake Time
 const Breakchange=(timeconvert)=>{
  const minute=Math.floor(timeconvert/60);
  const second=timeconvert%60
  return `${minute.toString().padStart(2,'0')}:${second.toString().padStart(2,'0')}`
 }
 // FocuseTimer
 const handleTimer=()=>{
  if(!isStart){
    setISStart(true)
    setSessionStart(Date.now());
    timeRef.current=setInterval(()=>{
      setstartTime((prevTime)=>{
       
        if(prevTime<=1){
          clearInterval(timeRef.current)
          setISStart(false)
          return 0;
        }
        return prevTime-1
      })},1000)
  }else{
    clearInterval(timeRef.current)
    setISStart(false)
    if (sessionStart) {
      const elapsedTime = Math.floor((Date.now() - sessionStart) / 1000);
      setSpentime((prev) => prev + elapsedTime); 
      setSessionStart(null);
    }
  }
 }
 // for resetTime 
 const restimer=()=>{
   clearInterval(timeRef.current)
   setstartTime(25*60)
   setISStart(false) 

 }
// for the breaketimer start
const handlebreaketimer=()=>{
  if(!isBreka){
    setIsbreake(true)
    breakRef.current=setInterval(()=>{
      setbreak((prevbreakeTime)=>{
        if(prevbreakeTime<=1){
          clearInterval(breakRef.current)
          setIsbreake(false)
          return 0;
        }
        return prevbreakeTime-1
      })
    },1000)
 
  }else{
    clearInterval(breakRef.current)
    setIsbreake(false)
  }
  
} 
 // for the Breake Time Reset
 const breakeTimerest=()=>{
  clearInterval(breakRef.current)
  setbreak(5*60)
  setIsbreake(false)
   localStorage.removeItem("Breaketime",breake)
 }
 useEffect(()=>{
 if(startTime===0){
  playAlram()

}if(breake===0){
  playSetAlarm()
 
}
 },[breake ,isStart])


const searchUserByName = async (user) => {
  try {
    
const dataref=query(
  ref(database,'users' ),
 orderByChild("Name"),
 equalTo(user)
)

const snapshot=await get(dataref);
if(snapshot.exists()){
  const userData=snapshot.val()
  const userkey=Object.keys(userData)[0]
  const userName=userData[userkey].Name;
  return userName;
}setEmail(""); // Clear input after search
  } catch (error) {
    throw new Error(error.message);
  
  }
};

// function to get image
useEffect(() => {
  const savedImages = JSON.parse(localStorage.getItem("unlockedImages")) || [];
  setUnlockedImages(savedImages);
  
  const savedTime = parseInt(localStorage.getItem("spentTime")) || 0;
  setSpentime(savedTime);
}, []);
useEffect(() => {
  localStorage.setItem("spentTime",spentime);
}, [spentime]);
useEffect(() => {
  const newUnlocked = links.map((_, index) => {
    const requiredTime = (index + 1) * 900; // 15 min, 30 min, 45 min
    return spentime >= requiredTime;
  });

  setUnlockedImages(newUnlocked);
  localStorage.setItem("unlockedImages", JSON.stringify(newUnlocked));
}, [spentime]);
  return (
    <section className={` min-h-screen  flex flex-row justify-center items-center ${theme==="dark" ? "bg-[#18191A] text-white":"bg-[#F0F2F5] text-black"}`}>
      <div className=' flex  flex-col  w-full  h-[700px] items-center gap-4'>
      <div className=" w-full h-32 p-2 flex flex-col gap-3 items-center justify-center md:justify-end ">
          {/* <div className='p-2 flex gap-2 '>
          <input type="search" placeholder='Invite your buddy' value={name} onChange={(e)=>setEmail(e.target.value)}  className='px-3 py-1  text-black rounded-md font-myfont '/>
            <button  
            onClick={()=>searchUserByName(name)}
            className=' text-white bg-gradient-to-r from-slate-900  w-20  via-gray-800 to-blue-500 px-3 rounded-lg transition-all ease-in-out  duration-200 py-1  
            font-myfont hover:bg-gradient-to-r hover:from-blue-500  hover:text-black hover:via-blue-300 hover:to-blue-200 hover:scale-105 hover:shadow-lg'>Join</button>
          </div> */}
          {/* <div className="bg-slate-300 px-3 py-1 shadow-lg text-black  font-myfont rounded-lg">
            Current Time: {`${spentime.hour}:${spentime.minute}`}...{' '}
          </div> */}
      </div>
   
         <div className='flex flex-row gap-2 p-2'>
        <div className={` flex  flex-col md:flex-row gap-2   px-2 py-6 rounded-md ${theme==="dark" ? "bg-zinc-600 text-white":"bg-background text-black"}`}>
        <audio ref={firstRef} src={first} />
        <select className='text-black bg- p-2 rounded-md font-semibold font-mono tracking-wide cursor-pointer'
         onChange={(e)=>{
           const newtime=parseInt(e.target.value)*60
           setstartTime(newtime)
           clearInterval(timeRef.current)
           setISStart(false) }}>
        <option value="45">45min</option>
        <option vlaue="20">20min</option>
        <option value="10">10min</option>
       </select>
        <h2 className=' px-3 py-1 bg-slate-300 font-bold rounded-md text-black text-[18px] font-jetbrains tracking-tighter'>Focus:
          <span className=' font-semibold l-1 text-[18px] font-mono'>{timechange(startTime)}</span></h2>
          {/* <audio ref={soundRef} src='sound.mp3' /> */}
        <div className='flex  gap-3 '>
        <button onClick={()=>{
        handleTimer();
       
        }
      }
         className=' w-16 text-white bg-gray-900 px-2 py-1 rounded-lg shadow-2xl font-semibold font-jetbrains hover:bg-gray-800 cursor-pointer h-8'>
          {isStart ? "Pause":"Start"}</button>
         <button 
         className=' w-16 text-white bg-gray-900 px-2 py-1 rounded-lg shadow-2xl font-semibold font-jetbrains hover:bg-gray-800 cursor-pointer h-8'
         onClick={restimer}>Reset</button>
        </div>
       </div>
         <div className={`flex flex-col  md:flex-row gap-2 px-2  py-6 rounded-md ${theme==="dark" ? "bg-zinc-600 text-white":"bg-background text-black"} `}>
       {/*Breake Time*/}
       <select className='text-black bg- px-2 py-1 rounded-md font-semibold font-mono tracking-wide cursor-pointer'    
          onChange={(e)=>{
            const newBreak=parseInt(e.target.value)*60
            setbreak(newBreak)
            setIsbreake(false) }}>
        <option value="5">5min</option>
        <option  value="2">2min</option>
       </select>
       <audio ref={soundRef} src={second} />
       <h2 className='bg-slate-300 px-3 py-1  font-bold rounded-md text-black text-[18px] font-jetbrains tracking-tighter'>Breake:
       <span className=' font-semibold l-1 text-[18px] font-mono'>{Breakchange(breake)}</span></h2>
       <div className='flex  gap-3 '>
       <button 
      className=' w-16  text-white bg-gray-900 px-2 py-1 rounded-lg shadow-2xl font-semibold font-jetbrains hover:bg-gray-800 cursor-pointer h-8'
      onClick={handlebreaketimer}>{isBreka ? "Pause":"Start"}</button>
       <button 
     className=' w-16  text-white bg-gray-900 px-2 py-1 rounded-lg shadow-2xl font-semibold font-jetbrains hover:bg-gray-800 cursor-pointer h-8'
     onClick={breakeTimerest}>Reset</button>
       </div>
        </div>
     </div>
     
          <div className={`w-full max-w-2xl flex flex-col justify-center items-center gap-3 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-zinc-700' : 'bg-white shadow-md'
            } shadow-lg`}>
            <h3 className="text-lg font-semibold mb-4">Session Progress</h3>
            
            <div className="w-full rounded-full h-2.5 bg-gray-300">
              <div className=" bg-green-500 h-2.5 rounded-full transition-all duration-300 "
                style={{
                  width: `${Math.min(
                    100,
                    spentime / (60 * 60) * 100
                  )}%`, 
                }}
              />
            </div>
          <div className={` p-3 w-1/2 t rounded-lg flex justify-center  text-lg font-semibold font-sans  gap-2 ${theme==="dark" ? "bg-gray-900  text-white":"bg-white shadow-lg"}` }>
           ⏳ Total Time Spent:<span className="text-center text-blue-700 font-mono"> {timechange(spentime)}</span>
              </div>
          </div>
     <div className='p-2 w-full md:w-[800px] h-80 flex justify-center rounded-lg'>
          <div className='w-full  md:flex-row  flex-col  text-black flex gap-2  justify-around items-center p-2 rounded-md'>
            {links.map((link, index) => {
            
              const isUnlocked = unlockedImages[index];
              return (
              <div key={index} className='relative h-72 w-72 overflow-hidden rounded-md'>
                <div className="absolute top-2 left-2 bg-black/50 px-2 py-1  flex  gap-2 rounded text-xs  text-white font-bold">
               {link.rarity}
               <div className='flex gap-1 '> 
                {[...Array(link.stars)].map((_,i)=>(
                  <IoStarSharp key={i}  size={15} className='text-yellow-300 fill-yellow-400 drop-shadow-lg'/>
                ))}
             
               </div>
               </div>
               <img 
              src={link.pic} 
              alt={`Prize ${index + 1}`}
              className={`w-full h-full object-cover transition-transform cursor-pointer ${
                isUnlocked ? 'blur-0' : 'blur-2xl'
              } hover:scale-105`}
            />
                <button 
              disabled={!isUnlocked} 
              className={`absolute bottom-0 w-full text-black bg-gradient-to-r from-yellow-200 via-amber-200 to-amber-400 px-3 rounded-lg transition-all ease-in-out duration-300 py-1 font-sans font-semibold ${
                isUnlocked
                  ? 'hover:bg-gradient-to-r hover:from-yellow-600 hover:text-black hover:via-amber-500 hover:to-amber-400 hover:scale-105 hover:shadow-lg' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
            ><span className='ml-2 '>Get</span></button>
              </div>
              )  
          })}
          </div>
           
         
        </div>
      </div>
  </section>
  )
}
export default Stats;