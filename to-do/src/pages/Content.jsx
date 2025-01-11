import {useSelector ,useDispatch} from "react-redux"
import { addTodoFirebase,deleteTodoFirebase,fetchTodos ,updateTodoFirebase} from "../redux/Slice";
import { useEffect, useState } from "react";
import { useFirebase } from "../firebase/Firebase";
 

const Content=()=>{
        const { db } = useFirebase();
        const [task ,setTasks]=useState(
                {
                text:"",
                description:"" 
        })
      const [editID,setEditId]=useState(false)

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
 const hanldeadd=(text ,description ,id)=>{
        if(editID){
                dispatch(updateTodoFirebase({db,id}))
                setEditId(null)
        }else{
                dispatch(addTodoFirebase({db,text ,description}))
                setTasks({text:"",description:""})
        }
 }
 //Delete Function
   const  deletetask=(id)=>{
    dispatch(deleteTodoFirebase({db ,id}))
   }
  
   // Function to Eidit the if any Change need
   const Editable=(todo)=>{
        setTasks({text:todo.text,description:todo.description})
        setEditId(todo.id)
   }
   

    return (

 <section>
         <div>
        <label><input type="text"   name="text" value={task.text} placeholder="Enter your Tasks.." onChange={handleChange} />Task   </label>   
        <label><input type="text" name="description" value={task.description} onChange={handleChange} placeholder="Leavesome descrpiton here" />Decrpiton</label> 
        </div>  
        <button onClick={()=>hanldeadd(task.text ,task.description)}>{editID ?"Update":"Add"}</button>
        {/*Showing the List */ }
    <div>
        { todos && todos.map((todo,index)=>(
                <div key={index}>
                        <h1>{todo.text}</h1>
                        <p>{todo.description}</p>
                        <button onClick={()=>Editable(todo)}>Edit</button>
                        <button onClick={()=>deletetask(todo.id)}>Delete</button>
                </div>
        ))}
    </div>
</section>
)
}
export default Content;
