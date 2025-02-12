import  { ThemeContext } from "../../theme/ThemeContext";
import  React , { useContext} from "react";
import {  motion ,Reorder } from "motion/react"

const Feature =React.forwardRef((props,ref)=>{
  const { theme } = useContext(ThemeContext);
  
    const images = [
      { src: "grils.png", text: "Make Your day easier, Stay Focus" },
      { src: "DDD.png", text: "Why lose time when you can be productive" },
      { src: "brain.png", text: "Make it simple and StraightForward" },
    ];
    const list=[
      "Work",
      "Education",
       "Meeting",
      "Personal"
    ]
    const orderlist=["Work-Out","Complete daily reading assignments","📅Plan for upcoming exams and deadlines","🍎Eat balanced meals & stay hydrated","💼 Work on internships, side projects, or part-time jobs"]
  return (
<motion.section 



transition={{duration:0.8, ease:"easeInOut", bounce:0.1}}
ref={ref}  className={` relative -z-10 h-90 overflow-hidden py-6 px-2 w-full flex  flex-col  gap-3 justify-center  items-center ${ theme === "dark" ? "bg-black text-white" : "bg-mainbackground text-black"}`} >
 <div 
 className="flex gap-2   w-[200%]  py-2 items-center  ">
     <motion.div
        initial={{  opacity:0 ,y:90}} 
        className="flex gap-10 w-[200%]"
        whileInView={{opacity:1,y:0}}
        viewport={{once:false,amount:0.1}}
       transition={{duration:0.8, ease:"easeInOut", bounce:0}}
      >
      {[...images, ...images].map((item, index) => (
          <motion.div
          initial={{ x: "-50%", }} 
          animate={{ x: ["0%", "-100%"] }} 
          transition={{
            repeat: Infinity, 
            duration: 16,
            ease: "linear" 
          }}
            key={index}
            className={`w-[230px] lg:w-[400px] h-[250px] shadow-lg rounded-md flex flex-col px-2 justify-start p-4 border
             border-gray-300 hover:shadow-xl transition-shadow duration-300 ${theme==="dark" ?  "bg-gray-900" :"bg-mainbackground"} 
            `}>
            <p className="font-lightfont text-xl text-center py-2">{item.text}</p>
            <img
              src={item.src}
              className="h-28 lg:h-32 mx-auto max-w-full"
              alt="Card"
            />
          </motion.div>
        ))}
   </motion.div>
 </div>
 <ul className="flex flex-wrap sm:flex-row flex-col gap-6 justify-between px-10 py-4 w-full font-lightfont  text-xl ">
  {list.map((items,index)=>{
    return <li key={index} className={` text-center  cursor-pointer  px-10 py-2 rounded-md  ${theme==="dark" ?"bg-gray-900 shadow-md":"bg-white shadow-md"}`}>{items}</li>
  })}
  </ul>
  <Reorder.Group axis="y" values={orderlist} className="bg--pink-">
  {orderlist.map((item)=>(
    <Reorder.Item key={item} value={item}  dragConstraints={{ top: 0, bottom: 0 }} >
      {item}
    </Reorder.Item>
  ))}
  </Reorder.Group>

</motion.section>
  );
});

export default Feature;
