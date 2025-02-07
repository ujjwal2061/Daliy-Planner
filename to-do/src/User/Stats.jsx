import React, { useState ,useRef,useEffect} from 'react'
import first from '../assets/first.mp3'
import second from '../assets/second.mp3'
import { ThemeContext } from '../theme/ThemeContext';
import { useContext } from 'react';


const Stats=()=>{

  const {theme} =useContext(ThemeContext)
  const [date, setDate] = useState(new Date());
  // const [contributionPercentage, setContributionPercentage] = useState(0);
  const [startTime,setstartTime]=useState(45*60) // convert the 25 into min  
  const [isStart,setISStart]=useState(false)
  const [breake ,setbreak]=useState(5*60) // convert tha the 5 into 5 min
  const [isBreka ,setIsbreake]=useState(false)
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
   
    timeRef.current=setInterval(()=>{
      setstartTime((prevTime)=>{
       
        if(prevTime<=1){
          clearInterval(timeRef.current)
          setISStart(false)
          return 0;
        }
        return prevTime-1
      })
    },1000)
  }else{
    clearInterval(timeRef.current)
    setISStart(false)
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
 }
 useEffect(()=>{
 if(startTime===0){
  playAlram()
}if(breake===0){
  playSetAlarm()
}
 },[breake ,isStart])

 useEffect(() => {
  return () =>{
    clearInterval(breakRef.current);
    clearInterval(timeRef.current);
  }
}, []);

  return (
    <section className={` min-h-screen  flex flex-row justify-center items-center ${theme==="dark" ? "bg-[#18191A] text-white":"bg-[#F0F2F5] text-black"}`}>
      <div className=' flex  flex-col justify-center items-center gap-5'>
      <div className='p-2'>
      
    
        </div>
        <div className={` flex flex-row gap-2   px-2 py-6 rounded-md ${theme==="dark" ? "bg-zinc-600 text-white":"bg-background text-black"}`}>
        <audio ref={firstRef} src={first} />
        <select className='text-black bg- px-2 py-1 rounded-md font-semibold font-mono tracking-wide cursor-pointer'
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
        <button onClick={handleTimer}
         className=' w-16 text-white bg-gray-900 px-2 py-1 rounded-lg shadow-2xl font-semibold font-jetbrains hover:bg-gray-800 cursor-pointer h-8'>
          {isStart ? "Pause":"Start"}</button>
         <button 
         className=' w-16 text-white bg-gray-900 px-2 py-1 rounded-lg shadow-2xl font-semibold font-jetbrains hover:bg-gray-800 cursor-pointer h-8'
         onClick={restimer}>Reset</button>
       </div>
         <div className={`flex flex-row gap-2  px-2 py-6 rounded-md ${theme==="dark" ? "bg-zinc-600 text-white":"bg-background text-black"} `}>
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
       
       <button 
      className=' w-16  text-white bg-gray-900 px-2 py-1 rounded-lg shadow-2xl font-semibold font-jetbrains hover:bg-gray-800 cursor-pointer h-8'
       onClick={handlebreaketimer}>{isBreka ? "Pause":"Start"}</button>
       <button 
     className=' w-16  text-white bg-gray-900 px-2 py-1 rounded-lg shadow-2xl font-semibold font-jetbrains hover:bg-gray-800 cursor-pointer h-8'
       onClick={breakeTimerest}>Reset</button>
        </div>
      </div>
  </section>
  )
}
export default Stats;