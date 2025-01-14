import {useSelector ,useDispatch} from "react-redux"
import { addTodoFirebase,deleteTodoFirebase,fetchTodos ,updateTodoFirebase} from "../redux/Slice";
import { useEffect, useState } from "react";
import { useFirebase } from "../firebase/Firebase";
import{serverTimestamp} from "firebase/firestore"
const Content=()=>{
        const { db } = useFirebase();

        const [editID,setEditId]=useState(false)
        const [task ,setTasks]=useState(
                {
                text:"",
                description:"" ,
                date:new Date().toISOString().split("T")[0]
                        
        })

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
    dispatch(fetchTodos(db));
  }, [dispatch, db]);

 const todos=useSelector((state)=>state.todo.todos)

 //Add Function and Upadata Function
 // This Fuunction is handle the Add and Editable when user Clik the Edit then the Tasks Appear at the
 //  Input box and the Upadat button show
 const hanldeadd=(text ,description,id)=>{
  const date = serverTimestamp();
        if(editID){
                dispatch(updateTodoFirebase({db,id }))
                setEditId(true)
        }else{
                dispatch(addTodoFirebase({db,text ,description,date}))
                setTasks({text:"",description:"" ,date:new Date().toISOString().split("T")[0],})
        }
        console.log(setTasks)
 }
 //Delete Function
   const  deletetask=(id)=>{
    dispatch(deleteTodoFirebase({db ,id}))
   }
  
   // Function to Eidit the if any Change need
   const Editable=(todo)=>{
        setTasks({text:todo.text,
          description:todo.description,
          date:todo.date
        })
        setEditId(todo.id)
   }

    return (

 <section className="h-screen bg-background ">
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
      <input type="date"  value={task.date}onChange={handleChange} />
    <div className="relative w-full">
        {task.text ==="" && (
                <label htmlFor="text" className=" absolute top-2 left-4 text-gray-400">Goals</label>      
        )}
        <input  type="text"  name="text"   value={task.text}   onChange={handleChange}  placeholder=" "  className="px-3 py-2 w-full rounded-md  focus:outline-none focus:border-blue-500"/>
    </div>   
    <div className="relative w-full">
        {task.description ==="" && (
          <label  htmlFor="description" className="absolute left-4 top-2 text-gray-400">  Description </label>

        )}
      <textarea  type="text" rows={5}   name="description" value={task.description}  onChange={handleChange} placeholder=" " className=" px-3 py-2 w-full   bg-goalsBoxBackground rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500" />
    </div>
  </div>
        <button onClick={()=>hanldeadd(task.text ,task.description.task.date)}>{editID ?"Update":"Add"}</button>
</div>

        {/*Showing the List */ }
    <div>
        { todos && todos.map((todo,index)=>(
                <div key={index}>
                        <h1>{todo.text}</h1>
                        <p>{todo.description}</p>
                        <p className="text-sm text-gray-500">
                    {new Date(todo.date).toLocaleDateString()}
                  </p>
                        <button onClick={()=>Editable(todo)}>Edit</button>
                        <button onClick={()=>deletetask(todo.id)}>Delete</button>
                </div>
        ))}
    </div>
</section>
)
}
export default Content;
