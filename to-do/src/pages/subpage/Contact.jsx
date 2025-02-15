import { ThemeContext } from "../../theme/ThemeContext";
import React, { useContext, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
const Contact = React.forwardRef((props, ref) => {
  const { theme } = useContext(ThemeContext);
  const [expandIndex,setexpandIndex]=useState(null)
const listshow=[
  { head:"AI Gen-Timetable" ,text:" Automatically creates a daily schedule based on your tasks and priorities."},
  {  head:"Calendar Integration" ,text:" Sync your tasks with a built-in calendar to plan for upcoming deadlines and events."},
  {  head:"Study with Friends" ,text:" Invite friends to a shared timer session and stay motivated together."},
  {  head: "Progress Tracking" ,text:" Monitor your productivity and see your improvements over time."},
]
const hanvdleExpand=(index)=>{
  setexpandIndex(expandIndex === index ?null :index);
}
  return (
    <section 
      ref={ref} 
      className={`px-4 py-11 ${theme === 'dark' ? "bg-black text-white" : "bg-white text-black"}`} >
      <div className={`max-w-5xl mx-auto text-center md:text-left ${theme === 'dark' ? "text-white":"text-black"} `}>
        <h1 className="  px-3 md:px-6 font-myfont underline  selection:bg-highlight selection:text-black 
          font-semibold text-2xl md:text-3xl lg:text-4xl">
          Why Use the Daily Planner?
        </h1>
        <p className="mt-4  font-serif text-lg md:text-xl tracking-tighter   px-4">
          Our AI-powered Daily Planner helps you stay organized, maximize productivity, and collaborate with friends.  
          Here’s what makes it unique
        </p>
 <ul className="mt-6   space-y-3 px-4">
  {listshow.map((items, index) => (
    <li key={index} className={`px-4 py-4 flex flex-wrap  flex-col  gap-2 sm:flex-nowrap items-center justify-between rounded-lg 
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black shadow-lg"}`} >
       <div className=" w-full flex justify-between">
         <strong className="w-full sm:w-1/4 text-left font-bold">{items.head}</strong><br />
         <button onClick={()=>hanvdleExpand(index)}> {expandIndex ===index ?<FaChevronUp className="text-xl ml-3" />:<FaChevronDown className="text-xl ml-3"/>}</button>
       </div>
       <div className={`mr-auto transition-all  duration-1000 ease-in-out ${expandIndex === index ? "max-h-96 opacity-100" : "max-h-0   opacity-0 overflow-hidden"}`}>
            {expandIndex === index && (
              <p className="mt-2  font-lightfont text-left break-words">{items.text}</p>
            )}
          </div>
    </li>
  ))}
</ul>

</div>
    </section>
  );
});

export default Contact;
