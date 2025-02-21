import React, { useState } from 'react'
import { ThemeContext } from '../theme/ThemeContext';
import { useContext } from 'react';
import { genereteDate ,months} from './date';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import cn from './cn';
import dayjs from 'dayjs';
const Calender=() =>{
  const [schedule ,setSchedule]=useState("")
  const[listSchedule,setlistSchedule]=useState({})
  const {theme} =useContext(ThemeContext)
  const days=["S","M","T","W","T","F","S"]
  const currentDate=dayjs()
  const [today ,setToady]=useState(currentDate)
  const [selecedDate, setSelectedDate]=useState(currentDate)
  // for change thte data and month
  const previousmonth=()=>{
    setToady(today.month(today.month()-1))
  }
  const nextmonths=()=>{
    setToady(today.month(today.month()+1))
  }
  const handleScheduleInput = (e) => {
    setSchedule(e.target.value);
  };

  const saveSchedule = () => {
    setlistSchedule(prevList => ({
      ...prevList,
      // key                                     //value that why we use the object 
      [selecedDate.format('YYYY-MM-DD')]: [...(prevList[selecedDate.format('YYYY-MM-DD')] || []), schedule]
    }));
    setSchedule("");
  };
  const deleteDate=(index)=>{
    setlistSchedule(prevList=>{
  const newlist={...prevList};
  newlist[selecedDate.format('YYYY-MM-DD')]=newlist[selecedDate.format('YYYY-MM-DD')].filter((_, i) => i !== index);
  return newlist
    })
  }

    return (
    <section className={`   min-h-screen  ${theme==="dark" ? "bg-[#18191A] text-white":"bg-[#F0F2F5] text-black"}`}>
      <div className='w-full flex flex-col  items-center'>
      <div className='md:w-[50%]  flex flex-col gap-7  items-center  justify-center mt-10 '>
        <div className={` border-2 px-2 py-10 w-[80%]  items-center justify-center   shadow-md rounded-lg ${theme === "dark" ? " bg-[#242526] text-white" : "bg-boxBackground text-black"}`}>
        <div className={`h-16 flex flex-row  items-center justify-between border-2 px-2 py-1  rounded-md ${theme==="dark" ? "bg-gray-800":"bg-gray-900 text-white"}`}>
             <button><GrFormPrevious className='w-5 h-5 cursor-pointer' onClick={previousmonth}/>Previous</button>
          <h1 className='font-bold text-sm'>{months[today.month()]}<span className='font-semibold px-1 text-sm'>{today.year()}</span></h1>
           
              <h1  className="cursor-pointer  font-mono" onClick={()=>setToady(currentDate)}>Today</h1>
             <button>Next</button><GrFormNext className='w-5 h-5 cursor-pointer' onClick={nextmonths} />
          
          </div>
      <div className='grid grid-cols-7   '>
        {days.map((day,index)=>(
          <h1 key={index} className='text-bold font-mono text-[19px] h-12 grid place-content-center font-semibold text-sm'>{day}</h1>
        ))}
      </div>
     <div className='grid grid-cols-7'>
        {genereteDate(today.month(),today.year()).map(({date,currentmonth,today},index)=>{
          return <div key={index} className='h-14  border-t-1 grid place-content-center text-sm'>
          <h1 onClick={()=>{
            setSelectedDate(date)
          }}
          className={cn(currentmonth ? " font-semibold":"text-gray-500",
            today?"bg-blue-600 font-mono":"",
            selecedDate.toDate().toDateString()===date.toDate().toDateString() ? "bg-black text-white":"",
            'h-10 w-10 grid place-content-center rounded-full hover:bg-black  hover:text-white cursor-pointer transition-all'
          )}>{date.date()}</h1>
        </div>
        })}
      </div>
     </div>
     <div className={` w-full py-2 px-2 rounded-md  flex flex-col  items-center ${theme==="dark" ?"bg-gray-900" :"bg-white shadow-md rounded-md"}` }>
      <h1 className='text-[18px] font-semibold tracking-tighter mr-auto '>Schedule for {selecedDate.toDate().toDateString()}</h1> 
      <input type='text'  value={schedule} onChange={handleScheduleInput}
        className='w-full px-2 py-1 rounded-md mt-2 text-black' placeholder='Add your schedule here...'  />
        <button onClick={saveSchedule}>Save</button>
        <ul className='w-full mt-2'>
        {(listSchedule[selecedDate.format('YYYY-MM-DD')] || []).map((item, index) => (
            <li key={index} className='text-white'>{selecedDate.toDate().toDateString()} {item}
             <button onClick={()=>deleteDate(index)}>Remove</button>
            </li>
          ))}
            </ul>
     </div>
    </div>
   </div>
</section>
  )
}
export default Calender;  