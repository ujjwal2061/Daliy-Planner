import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTo,removtodo } from "../redux/Slice";

const Add=()=>{
    const  todolist=useSelector((state)=>state.todo.todo)
     const dispatch=useDispatch()
     const [text ,setText]=useState("")

    const handleAdd=()=>{
          if(!text.trim()){
            return 
          }
            dispatch(addTo(text))
            setText('')
    }
    return(
        <section className="container bg-black">
         <div>
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
            <button className="cursor-pointer bg-purple-300" onClick={handleAdd}>Add</button>
         </div>
              <div>
                <ul>
                    {todolist && todolist.map((todo)=>(
                        <li key={todo.id}>{todo.text}
                        <button onClick={()=>dispatch(removtodo(todo.id))}>Delete</button>
                        </li>
                    ))}
                </ul>
              </div>
        </section>
     
    )
}
export default Add;