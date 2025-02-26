import { useSelector, useDispatch } from "react-redux";
import { addTodoFirebase, deleteTodoFirebase, fetchTodos, updateTodoFirebase } from "../redux/Slice";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { useFirebase } from "../firebase/Firebase";
import { IoMdAdd } from "react-icons/io";
import { FaRegPaperPlane } from "react-icons/fa";
import { getOpenaiSummary,chatwithsummary } from "../OpenAI/Openai";

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
  const [error,setError]=useState(false) 
  const [displayedText, setDisplayedText] = useState("");
  const [chatlist,setChatlist]=useState("")
  const [userchat,setUserchat]=useState("")
  const [newSumarry,setNewSummary]=useState([])
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
 // for the interaction
 const hadlechatsection=async()=>{
  try{
    const chatgot=await chatwithsummary(chatlist,displayedText)
    setNewSummary((prevSummaries)=>[...prevSummaries,chatgot.replace(/[#/***]/g," ")])
    setChatlist("")
  
  }catch(error){
    throw error
  }
 }

  return (
    <div className={` p-4 min-h-screen flex flex-col items-center ${theme === "dark" ? "bg-gray-900 text-black" : "bg-gray-100 text-black"}`}>
      <div className=" w-full flex flex-col  items-center px-2 py-1 rounded-md ">
      <div className="w-1/2 max-w-3xl text-center">
      <h1 className={`text-5xl  font-semibold
        ${theme === "dark"?"text-white":"text-transparent bg-clip-text bg-gradient-to-r  from-indigo-600 to-purple-600 -mb-1"}`}>
            Daily Planner
          </h1>
      </div>

      {/* Input Section */}
      <div className={`${theme =="dark"? 'bg-gray-800 border-gray-700' : ' border-gray-200'} rounded-lg shadow-lg p-6 mt-5 border`}>
        <div className="flex flex-col sm:flex-row gap-4 ">
        <input
          type="text"
          name="text"
          value={task.text}
          onChange={handleChange}
          placeholder="Enter goal..."
          className={` rounded-lg px-4  ${ theme==="dark" 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-800'
          } border`}
          />
        <select name="category" value={task.category} onChange={handleChange} 
         className={`p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
          theme ==="dark"
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-gray-800'
        } border`}>
          <option value="all-goal" className="hover:bg-blue-500 font-mono">All  goal</option>
          <option value="short-term" className=" hover:bg-blue-500 font-mono">Short-Term Goal</option>
          <option value="long-term" className="hover:bg-blue-500 font-mono">Long-Term Goal</option>
        </select>
        <button onClick={handleAdd} 
       className={`px-6 py-3 rounded-lg transition-colors flex items-center justify-center font-medium shadow-md hover:shadow-lg ${
        theme ==="dark"? "bg-blue-700 hover:bg-blue-600 text-white"
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
      }`}>
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
           className={`w-full p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none h-24 ${
            theme==="dark" 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-800'
          } border`}
          ></textarea>
      </div>
    </div>
    </div>
      {/* Goals List */}
      <div className={"w-full px-6 py-4  rounded-md mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "
        }>
        {/* All Goals */}
        <div className="bg-white h-auto  rounded-lg shadow-md">
          <h2 className={`text-lg  w-full  font-semibold rounded-t-md h-10  flex flex-row justify-center font-jetbrains 
            ${theme==="dark"?"bg-gradient-to-r from-gray-800 to-gray-700 text-white":"bg-gradient-to-r from-indigo-500 to-purple-600"}`}>🎯All Goals</h2>
          <div className="px-3 ">
          {todos.map((todo, index) => (
            <div key={index}  className="bg-gray-100 p-3 rounded-md mb-3 shadow-sm">
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
        </div>

        {/* Short-Term Goals */}
        <div className="bg-white  h-auto   rounded-lg shadow-md">
          <h2 className={`text-lg w-full font-semibold rounded-t-md h-10  flex flex-row justify-center font-jetbrains 
            ${theme==="dark"?"bg-gradient-to-r from-blue-900 to-blue-800 text-white":"bg-gradient-to-r from-blue-500 to-cyan-600"}`}>⏳Short-Term Goals</h2>
           <div className="px-3">
          {shortTermtodos.map((todo, index) => (
            <div key={index}   className="bg-gray-100  rounded-md mb-3 shadow-sm">
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
        </div>

        {/* Long-Term Goals */}
        <div className="bg-white  h-auto rounded-lg shadow-md">
          <h2 className={`text-lg  w-full h-10 font-semibold  rounded-t-md  flex flex-row justify-center  font-jetbrains mb-3
           ${theme==="dark"?"bg-gradient-to-r from-red-900 to-red-800 text-white":"bg-gradient-to-r from-red-500 to-pink-600"}`}>🚩Long-Term Goals</h2>
           <div className=" px-3 ">
          {longtermtodos.map((todo, index) => (
            <div key={index} draggable  className="bg-gray-100 shadow-md  px-3 rounded-md mb-3 ">
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
      </div>
      {/*Button for AI summarry */}
      <div className="py-4 px-3    flex flex-col items-center  rounded-md mt-2">
      <div className="w-full max-w-3xl mt-6   bg-white text-black rounded-lg shadow-md">
        <h2 className={`w-full   max-w-3xl h-10 flex  rounded-t-md items-center font-serif text-xl p-4 bg-white  shadow-md
      ${theme==="dark"? 'bg-gray-700 text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}>📝 AI Summary</h2>
      <div className="px-3">

        {error && <p className="text-red-500 text-center">Can't Generate Summary!</p>}
        {isLodaing ? (
          <p className="text-center text-gray-500">Generating summary...</p>
        ) : (
          <div className="whitespace-pre-line text-[15px] leading-relaxed font-serif">
            {displayedText}
          </div>
        
      )}
      </div>
        <button onClick={handlesummary} className="mt-4 w-full font-mono  bg-black text-white py-2 rounded-md hover:bg-gray-950 flex items-center justify-center gap-2">
          AI Summary <FaRegPaperPlane />
        </button>
      </div>

      <div className="w-full max-w-3xl mt-6  bg-white text-black rounded-lg shadow-md">
      <h2 className={`w-full   max-w-3xl h-10 flex  rounded-t-md items-center font-serif text-xl p-4 bg-white  shadow-md
      ${theme==="dark"? 'bg-gray-700 text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}>💬 Chat with AI</h2>
          <div className="px-3 ">

        <input
          type="text"
          value={chatlist}
          onChange={(e) =>setChatlist(e.target.value)}
          placeholder="Ask AI something..."
          className="w-full p-2 border mt-2  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
        <button onClick={hadlechatsection} className="mt-4 w-full bg-black text-white py-2 font-mono rounded-md hover:bg-gray-950 flex items-center justify-center gap-2">
          Chat <FaRegPaperPlane />
        </button>
        <div className="mt-4 space-y-2 max-h-48 ">
          {newSumarry.map((chat, index) => (
            <div key={index} className=" whitespace-pre-line bg-gray-100 p-3 rounded-md shadow-sm">{chat}</div>
          ))}
        </div>
      </div>
    </div>
</div>
  );
};

export default Workplace;
