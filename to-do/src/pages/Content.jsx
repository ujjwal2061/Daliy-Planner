
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTo,removtodo ,checktodo,hello} from "../redux/Slice"


const Content=()=>{
    const  todolist=useSelector((state)=>state.todo.todo)
        const dispatch=useDispatch()
        const [text ,setText]=useState("")
        const [description ,setDescrption]=useState("")
   
       const handleAdd=()=>{
             if(!text.trim() || !description.trim()){
               alert("Field need to Fullfiled ")
             return
             }
               dispatch(addTo({text,description:description}))
               setText('')
               setDescrption('')
       }
       const Deletetask=(todo)=>{
           if(todo.isChecked){
               dispatch(removtodo(todo.id))
           }
           return ;
            }  
            
            const hadlecheck=(todo)=>{
               dispatch(checktodo(todo.id))
            }
           
    return (

 <section className="container">
            <div>
               <input type="text" value={text} onChange={(e)=>setText(e.target.value)}  className="font-mono outline-none rounded-sm p-2"/>
               <input type="text" placeholder="Decrpiton here " value={description} onChange={(e)=>setDescrption(e.target.value)} />
               <button className="cursor-pointer" onClick={handleAdd}>Add</button>
            </div>
                 <div>
                   <ul>
                       {todolist && todolist.map((todo)=>(
                           <li key={todo.id}>
                            <input type="checkbox"   checked={todo.isChecked}  onChange={()=>hadlecheck(todo)}/>
                            {todo.text}
                            <p>{todo.description}</p>
                           <button onClick={()=>Deletetask(todo)}>Delete</button>
                           </li>
                       ))}
                   </ul>
                 </div>      
                 <button onClick={()=>dispatch(hello("Wow u Click me"))}>Click me</button>
             
           </section>



    )
}
export default Content;