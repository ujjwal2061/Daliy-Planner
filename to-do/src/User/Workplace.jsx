import { useSelector, useDispatch } from "react-redux";
import { addTodoFirebase, deleteTodoFirebase, fetchTodos, updateTodoFirebase } from "../redux/Slice";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { useFirebase } from "../firebase/Firebase";
import { IoMdAdd } from "react-icons/io";
import { FaRegPaperPlane } from "react-icons/fa";
import { getOpenaiSummary } from "../OpenAI/Openai";

const Workplace = () => {
  const { theme } = useContext(ThemeContext);
  const todos = useSelector((state) => state.todo.todos);
  const shortTermtodos = useSelector((state) => state.todo.shortTermtodos);
  const longtermtodos = useSelector((state) => state.todo.longtermtodos);
  const dispatch = useDispatch();

  const { db, currentUser } = useFirebase();
  const [editID, setEditId] = useState(false);
  const [task, setTasks] = useState({ text: "", description: "", category: "all-goal" });
  const [aiSummary,setaiSummary]=useState("")
  const [isLodaing,setLoding]=useState(false)
  const[error,setError]=useState(false) 
  const [displayedText, setDisplayedText] = useState("");
  const speed = 20;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasks((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

 
  useEffect(() => {
    if (currentUser && db) {
      dispatch(fetchTodos({ db, user: currentUser }));
    }
   
  }, [currentUser, db, dispatch]);
;
useEffect(() => {
  if (aiSummary) {
    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < aiSummary.length) {
        setDisplayedText((prev) => prev + aiSummary[index]);
        index++;
      } else {
        clearInterval(interval)
      }
    }, speed);
    return (()=>clearInterval(interval))
  }
 
}, [aiSummary])

useEffect(() => {
  const storedSummary = localStorage.getItem("Summary");
  if (storedSummary) {
    setaiSummary(storedSummary.replace(/[#/***]/g," "));
  }
}, []);
  const handleAdd = () => {
    if (editID) {
        dispatch(updateTodoFirebase({ db, id: editID, ...task })).then(() => {
            dispatch(fetchTodos({db, user:currentUser}));
        });
        setEditId(false);
    } else {
        dispatch(addTodoFirebase({   user:currentUser, db, ...task })).then(() => {
            dispatch(fetchTodos({ db, user:currentUser}));
        });
    }
    setTasks({ text: "", description: "", category: "all-goal" });
};

const deleteTask = (id) => {
  if (!currentUser)   return;
    dispatch(deleteTodoFirebase({ db, id })).then(() => {
        dispatch(fetchTodos({ db, user:currentUser}));
    });
};
 

  const editTask = (todo) => {
    if(!currentUser) return
    setTasks({ text: todo.text, description: todo.description, category: todo.category|| "all-gaol" });
    setEditId(todo.id);
  };


 // function to get the Summary of the All todos

 const handlesummary=async()=>{
  try{
    setLoding(true)
    const summary=await getOpenaiSummary(
      todos,
      shortTermtodos,
      longtermtodos
    );
    setaiSummary(summary.replace(/[#/***]/g," "));
    localStorage.setItem("Summary",summary)
  }catch(err){
      setError(true)
  } finally {
    setLoding(false);
  }
 }
  return (
    <div className={` p-4 min-h-screen flex flex-col items-center ${theme === "dark" ? "bg-[#18191A] text-black" : "bg-[#F0F2F5] text-black"}`}>
      <div className={` w-full flex flex-col  items-center px-2 py-1 rounded-md ${theme === "dark" ? " bg-[#242526] text-white" : "bg-boxBackground text-black"}`}>
      <div className="w-1/2 max-w-3xl text-center">
        <h1 className="text-3xl font-semibold font-mono   tracking-tighter  p-3 rounded-md">Daily Planner</h1>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-3xl mt-6 p-4 bg-white text-black rounded-lg shadow-md flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          name="text"
          value={task.text}
          onChange={handleChange}
          placeholder="Enter goal..."
          className="flex-1  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        <select name="category" value={task.category} onChange={handleChange} className="bg-blue-600 hover:bg-blue-700 text-sm  font-mono cursor-pointer text-[13px] text-white p-2 rounded-md">
          <option value="all-goal" className="hover:bg-blue-500 font-mono">All  goal</option>
          <option value="short-term" className=" hover:bg-blue-500 font-mono">Short-Term Goal</option>
          <option value="long-term" className="hover:bg-blue-500 font-mono">Long-Term Goal</option>
        </select>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2  text-sm  flex font-monoflex shadow-2xl rounded-xl items-center gap-2 hover:bg-blue-700">
          <IoMdAdd />
          {editID ? "Update" : "Add Task"}
        </button>
      </div>

      {/* Description Input */}
      <div className="w-full max-w-3xl mt-4">
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Enter description..."
          rows={3}
          className="w-full text-black  p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
      </div>
    </div>
      {/* Goals List */}
      <div className={`w-full px-6 py-4  rounded-md mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${theme === "dark" ? " bg-[#242526] text-black" : "bg-boxBackground text-black"}`}>
        {/* All Goals */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold  flex flex-row justify-center font-jetbrains mb-3">🎯All Goals</h2>
          {todos.map((todo, index) => (
            <div key={index}  draggable className="bg-gray-100 p-3 rounded-md mb-3 shadow-sm">
              <h3 className="font-medium">{todo.text}</h3>
              <p className="text-gray-600">{todo.description}</p>
              <div className="flex justify-between mt-2">
                <button onClick={() => editTask(todo)} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                  Edit
                </button>
                <button onClick={() => deleteTask(todo.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
              <p className="font-mono text-sm tracking-tighter  font-semibold">{todo.createdAt}</p>
            </div>
          ))}
        </div>

        {/* Short-Term Goals */}
        <div className="bg-white p-4  h-auto rounded-lg shadow-md">
          <h2 className="text-lg  flex justify-center  font-jetbrains font-semibold mb-3">⏳Short-Term Goals</h2>
          {shortTermtodos.map((todo, index) => (
            <div key={index} draggable  className="bg-gray-100 p-3 rounded-md mb-3 shadow-sm">
              <h3 className="font-medium">{todo.text}</h3>
              <p>{todo.description}</p>
             
              <div className="flex justify-between mt-2">
                <button onClick={() => editTask(todo.id)} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                  Edit
                </button>
                <button onClick={() => deleteTask(todo.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
                <p className="font-mono text-sm  tracking-tighter  font-semibold">{todo.createdAt}</p>
            </div>
          ))}
        </div>

        {/* Long-Term Goals */}
        <div className="bg-white p-4 h-auto  rounded-lg shadow-md">
          <h2 className="text-lg font-semibold  flex flex-row justify-center  font-jetbrains mb-3">🚩Long-Term Goals</h2>
          {longtermtodos.map((todo, index) => (
            <div key={index} draggable  className="bg-gray-100 p-3 rounded-md mb-3 shadow-sm">
              <h3 className="font-medium">{todo.text}</h3>
              <p>{todo.description}</p>
              <div className="flex justify-between mt-2">
                <button onClick={() => editTask(todo)} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                  Edit
                </button>
                <button onClick={() => deleteTask(todo.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
                <p className="font-mono text-sm text-gray-600 tracking-tighter  font-semibold">{todo.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
      {/*Button for AI summarry */}
       <div className=" m-2  py-2 px-1 w-full font-mono ">
       <button onClick={handlesummary} 
       className=" flex h-8 items-center  gap-2 bg-gradient-to-l from-slate-500 via-slate-300 to-slate-300 px-3 rounded-lg text-[15px]  transition-all duration-500 ease-in-out 
       hover:scale-105 hover:bg-gradient-to-l hover:from-slate-600   hover:via-slate-500 hover:to-slate-500
       "> AI summary For task<FaRegPaperPlane  className="text-gray-950"/></button>
       </div>
       <div className={`w-full max-w-3xl mt-6 p-4 rounded-lg shadow-lg border ${theme==="dark"?"bg-zinc-800 shadow-2xl text-slate-50":"bg-white text-black shadow-xl"}`}>
  <h2 className="text-xl font-bold text-center underline mb-4">📝 AI Summary</h2>
    {error && <p>Can't Generate Summary !</p>}
  {isLodaing ? (
    <p className="text-center text-gray-500">Generating summary...</p>
  ) : (
    <div className="whitespace-pre-line text-[15px] leading-relaxed font-serif">
      {displayedText}
    </div>
  )}
</div>

    </div>
  );
};

export default Workplace;
