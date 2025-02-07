import React, { useState } from 'react'
import { ThemeContext } from '../theme/ThemeContext';
import { useContext } from 'react';
import { genereteDate ,months} from './date';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import cn from './cn';
import dayjs from 'dayjs';
const Calender=() =>{
  const {theme} =useContext(ThemeContext)
  // const dates = genereteDate(today.month().today.year());
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

    return (
    <section className={` min-h-screen  ${theme==="dark" ? "bg-[#18191A] text-white":"bg-[#F0F2F5] text-black"}`}>
      <div className='w-full flex flex-col   items-center'>
      <div className='md:w-[50%] w-[40%] flex flex-col  gap-7'>

        <div className='flex flex-row justify-between'>
          <h1 className='font-bold text-sm'>{months[today.month()]}<span className='font-semibold px-1 text-sm'>{today.year()}</span></h1>
            <div className='flex items-center gap-3 ' > 
              <GrFormPrevious className='w-5 h-5 cursor-pointer' onClick={previousmonth}/>
              <h1  className="cursor-pointer  font-mono" onClick={()=>setToady(currentDate)}>Today</h1>
              <GrFormNext className='w-5 h-5 cursor-pointer' onClick={nextmonths} />
            </div>
          </div>
      <div className='grid grid-cols-7'>
        {days.map((day,index)=>(
          <h1 key={index} className='text-gray-500 h-12 grid place-content-center font-semibold text-sm'>{day}</h1>
        ))}
      </div>
     <div className='grid grid-cols-7'>
        {genereteDate(today.month(),today.year()).map(({date,currentmonth,today},index)=>{
          return <div key={index} className='h-14  border-t-2 grid place-content-center text-sm'>
          <h1 onClick={()=>{
            setSelectedDate(date)
          }}
           className={cn(currentmonth ? "text-slate-100 font-semibold":"text-gray-500",
            today?"bg-blue-600 font-mono":"",
            selecedDate.toDate().toDateString()===date.toDate().toDateString() ? "bg-black":"",
            'h-10 w-10 grid place-content-center rounded-full hover:bg-black cursor-pointer transition-all'
          )}>{date.date()}</h1>
        </div>
        })}
     </div>
     <div className='bg-purple-600 w-full py-2 px-2 rounded-md  flex flex-col  items-center'>
      <h1 className='text-[18px] font-semibold tracking-tighter mr-auto '>Schedule for {selecedDate.toDate().toDateString()}</h1> 
      <p className=''> No meeting today</p> 
     </div>
    </div>
   </div>
</section>
  )
}
export default Calender;