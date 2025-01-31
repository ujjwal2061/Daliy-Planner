import {useSelector ,useDispatch} from "react-redux"
import { addTodoFirebase,deleteTodoFirebase,fetchTodos ,updateTodoFirebase} from "../../redux/Slice";
import { useEffect, useState } from "react";
import { ThemeContext } from '../../theme/ThemeContext';
import { useContext } from 'react';
import { useFirebase } from "../../firebase/Firebase";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

const Content=()=>{
  const {theme} =useContext(ThemeContext)
  const todos=useSelector((state)=>state.todo.todos) // extract the data of the todo list 
  const shortTermtodos=useSelector((state)=>state.todo.shortTermtodos) // of the shortTerm goals
  const longtermtodos=useSelector((state)=>state.todo.longtermtodos) // longterm goals 
  
  const { db } = useFirebase();
  const [editID,setEditId]=useState(false)
  const [category, setCategory] = useState("short-term");
  const [task ,setTasks]=useState({ text:"",description:"" ,   category: "short-term"})
      const handleChange=(e)=>{
       const {name ,value}=e.target;
          setTasks((prevTask)=>({
                ...prevTask,
            [name]:value,
          }
        ))
}
  const dispatch = useDispatch();
  useEffect(() => {
    if(db){
      dispatch(fetchTodos(db));
    }
  }, [dispatch, db]);


 // Handle the Add Function
 const hanldeadd=(id)=>{
        if(editID){
              dispatch(updateTodoFirebase(
                {db,id, 
                  text:task.text,
                  description:task.description,
                  category:task.category
                }))
              setEditId(false)
        }else{
           dispatch(addTodoFirebase(
            {db,
              text:task.text,
              description:task.description,
              category:task.category

            }))
           setTasks({text:"",description:"" ,   category: "short-term"})
        }
       
 }
 //Delete Function
   const  deletetask=(id)=>{
    dispatch(deleteTodoFirebase({db ,id}))
   }
  
   // Function to Eidit the if any Change need
   const Editable=(todo)=>{
        setTasks({text:todo.text,
          description:todo.description,
        })
        setEditId(todo.id)
   }


return (
 <section className= {` flex min-h-screen ${theme==="dark" ? "bg-zinc-800 text-gray-900":"bg-white text-black"}`}>
      <Sidebar  className="border-r-[1px] border-gray-600" />
      <main className="flex-1  transition-all duration-300 h-full  flex-row ">
      <Outlet />
            <div className="p-2 flex flex-col justify-center items-center">
  <div className="flex flex-row items-center justify-center p-2">
    <h1 className="font-atma font-semibold text-text bg-background text-3xl px-4 rounded-md">
      DAILY PLANNER
    </h1>
  </div>
  <div className="p-3 rounded-md flex flex-col justify-center items-center gap-2  w-[600px]">
    <div>
      {}
    </div>
     
    <div className="relative w-full  gap-2 flex   items-center">
        {task.text ==="" && (
          <label htmlFor="text" className=" absolute top-2 left-4 text-gray-400">Goals</label>      
        )}
        <input  type="text"  name="text"   value={task.text}   onChange={handleChange}  placeholder=" "  className="px-3 py-2 w-[450px] rounded-md "/>
       
        <select  name="category"  onChange={handleChange} className="bg-green-500 h-10 rounded-md  w-44 px-3 py-1.5 font-jetbrains text-sm font-semibold tracking-tighter cursor-pointer" >
          <option  value="short-term">Short-Term-Goal</option>
          <option value="long-term">Long-Term-Goal</option>
        </select>
      
    </div>   

    <div className="relative w-full">
        {task.description ==="" && (
          <label  htmlFor="description" className="absolute left-4 top-2 text-gray-400">  Description </label>

        )}
      <textarea  type="text" rows={5}   name="description" value={task.description}  onChange={handleChange} placeholder=" " className=" px-3 py-2 w-full   bg-goalsBoxBackground rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
    </div>
  </div>
      <div className=" w-1/2 flex  justify-start  ml-12 mr-auto items-center px-2 py-1">
        <button onClick={()=>hanldeadd(task.text ,task.description ,task.category )}
          className="bg-gray-900 text-white font-bold font-mono text-xl  px-3 py-2  rounded-md">{editID ?"Update":"ADD"}</button>
          </div>
</div>
      {/* Showing the List */ }
      <div className=" flex justify-center  px-2 py-2 w-full max-h-full">
      <div className="   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2 px-6 gap-2 w-[98%]">
       {/*All goals list  Section */}
    <div className=" w-[80%%] h-auto px-2 py-1 rounded-md ">
    { todos && todos.map((todo,index)=>(
      <div key={index} className="bg-paper-300 w-full px-2 py-2  flex flex-col gap-2 border-b-2 ">
        <h1 className="w-1/2 bg-zinc-300 px-2 py-1 rounded-md font-jetbrains text-[16px]">{todo.text}</h1>
          <p className="">{todo.description}</p>
          <div className="flex flex-row justify-between bg-red-600 px-2 py-1 rounded-md">
          <button onClick={()=>Editable(todo)}>Edit</button>
          <button onClick={()=>deletetask(todo.id)}>Delete</button>
            </div>
        </div>
        ))}
        </div>
          {/*Short term Section */}
     <div className=" w-full  px-2 py-1 h-auto">
       <h1>Short-Term</h1>
        { shortTermtodos.map((todo,index)=>(
          <div key={index} className="bg-paper-300 w-full px-2 py-1  flex flex-col gap-2 border-b-2">
        <h1 className="w-1/2 bg-zinc-300 px-2 py-1 rounded-md font-jetbrains text-[16px]">{todo.text}</h1>
          <p className="">{todo.description}</p>
          <div className="flex flex-row justify-between bg-red-600 px-2 py-1 rounded-md">
          <button onClick={()=>Editable(todo)}>Edit</button>
          <button onClick={()=>deletetask(todo.id)}>Delete</button>
            </div>
        </div>
        ))}
        </div>
        {/*Long term Section */}
       <div className=" px-2 py-1  w-full  h-auot">
         <h1>Long-Term</h1>
         {longtermtodos.map((todo,index)=>(
           <div key={index} className="bg-paper-300 w-full   border-b-2  px-3 py-2 ">
           <h1 className="w-1/2 bg-zinc-300 px-2 py-1 rounded-md font-jetbrains text-[16px]">{todo.text}</h1>
           <p className="">{todo.description}</p>
           <div className="flex flex-row justify-between bg-red-600 px-2 py-1 rounded-md">
             <button onClick={()=>Editable(todo)}>Edit</button>
             <button onClick={()=>deletetask(todo.id)}>Delete</button>
            </div>
         </div>
        ))}
      </div>
  </div>
   </div>
 </main>
</section>
  )}
  export default Content;
  