// import {useSelector ,useDispatch} from "react-redux"
// import { addTodoFirebase,deleteTodoFirebase,updateTodoFirebase,fetchTodos} from "../redux/Slice";
// import { useEffect, useState } from "react";
// import { useFirebase } from "../firebase/Firebase";
 

// const Content=()=>{
//         const {db}=useFirebase()
//         const [task ,setTasks]=useState(
//                 {
//                 text:"",
//                 description:"" 
//         })

//       const handleChange=(e)=>{
//        const {name ,value}=e.target;
//           setTasks((prevTask)=>({
//                 ...prevTask,
//                 [name]:value,
//           }))
//         }
//         useEffect(()=>{
//               dispatch(fetchTodos(db))  
//         },[])
//  const dispatch=useDispatch()
//  const todos=useSelector((state)=>state.todo.tod)
// //Add Function
//  const hanldeadd=(text ,description)=>{
//  dispatch(addTodoFirebase({db,text ,description}))
//  setTasks({text:"",description:""})
//  }
//  //Delete Function
//    const  deletetask=(id)=>{
//     dispatch(deleteTodoFirebase({db ,id}))
//    }
//    //Upadata Function
//    const upadatask=(id,isChecked)=>{
//     dispatch(updateTodoFirebase({db,id ,isChecked}))
//    }
   

//     return (

//  <section>
//          <div>

//         <label><input type="text"   name="text" value={task.text} placeholder="Enter your Tasks.." onChange={handleChange} />Task   </label>   
//         <label><input type="text" name="description" value={task.description} onChange={handleChange} placeholder="Leavesome descrpiton here" />Decrpiton</label> 
//         </div>  
//         <button onClick={hanldeadd}>Add </button>
//         {/*Showing the List */ }
//     <div>
//         { todos && todos.map((todo,index)=>(
//                 <div key={index}>
//                         <h1>{todo.text}</h1>
//                         <p>{todo.description}</p>
//                         <input type="checkbox" checked={todo.isChecked} onChange={()=>upadatask(todo.id, !todo.isChecked)} />
//                         <button onChange={()=>deletetask(todo.id)}>Delete</button>
//                 </div>
//         ))}
//     </div>
// </section>
// )
// }
// export default Content;





import { useSelector, useDispatch } from "react-redux";
import {
  addTodoFirebase,
  deleteTodoFirebase,
  updateTodoFirebase,
  fetchTodos,
} from "../redux/Slice";
import { useEffect, useState } from "react";
import { useFirebase } from "../firebase/Firebase";

const Content = () => {
  const { db } = useFirebase();
  const [task, setTask] = useState({
    text: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos(db));
  }, [dispatch, db]);

  const todos = useSelector((state) => state.todo.todos);
  // Add Function
  const handleAdd = (text, description) => {
    dispatch(addTodoFirebase({ db, text, description }));
    setTask({ text: "", description: "" });
  };
  // Delete Function
  const deleteTask = (id) => {
    dispatch(deleteTodoFirebase({ db, id }));
  };
  // Update Function
  const updateTask = (id, isChecked) => {
    dispatch(updateTodoFirebase({ db, id, isChecked }));
  };

  return (
    <section>
      <div>
        <label>
          <input
            type="text"
            name="text"
            value={task.text}
            placeholder="Enter your Tasks.."
            onChange={handleChange}
          />
          Task
        </label>
        <label>
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Leave some description here"
          />
          Description
        </label>
      </div>
      <button onClick={handleAdd}>Add</button>
      {/* Showing the List */}
      <div>
        {todos &&
          todos.map((todo, index) => (
            <div key={index}>
              <h1>{todo.text}</h1>
              <p>{todo.description}</p>
              <input
                type="checkbox"
                checked={todo.isChecked}
                onChange={() => updateTask(todo.id, !todo.isChecked)}
              />
              <button onClick={() => deleteTask(todo.id)}>Delete</button>
            </div>
          ))}
      </div>
    </section>
  );
};
export default Content;
