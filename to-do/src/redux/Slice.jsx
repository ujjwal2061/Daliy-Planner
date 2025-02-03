import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, serverTimestamp, } from "firebase/firestore";



// Async Thunks for Firebase Operations /Fecthing the Data From the Firebase 
export const fetchTodos = createAsyncThunk("todo/fetchTodosFirebase", async (db) => {
    try{
        const todoCollection = collection(db, "list");
        const getList = await getDocs(todoCollection);
        const todos = getList.docs.map((doc) => {
            const data = doc.data();
            const createdAt = data.createdAt && data.createdAt.seconds 
        ? new Date(data.createdAt.seconds * 1000).toLocaleString()
        : new Date().toLocaleString();
            return {
                id: doc.id,
                ...data,
                createdAt
            }
        });
        return todos;
    }catch(error){
        console.log(error)
    }
});
// Adding the Todo to Firebase
// // this Function were i  add the new task by using the ... operater 
// where it create the new  array of the each  object  and add to the firebase Db
export const addTodoFirebase = createAsyncThunk("todo/addToFirebase", async ({db ,text ,description, category,}) => {
    try{
        const todoCollection = collection(db, "list");
        const newTodo = { 
            text, 
            description,
            category,
            createdAt:serverTimestamp()
        };
        const docRef = await addDoc(todoCollection, newTodo
        );
        return { id: docRef.id, ...newTodo,createdAt: new Date().toLocaleString() };
    }catch(error){
        throw new Error(error.message)
    }
});

// Delete the Todo from Firebase
export const deleteTodoFirebase = createAsyncThunk("todo/deleteTodo", 
    async ({id ,db}) => {
        try{
            const docRef = doc(db, "list", id);
            await deleteDoc(docRef);
            return id;
        }catch(error){
         throw new Error(error.message)
        }
});

// Update the Todo list inthis i am Acces theh Firebasee Db and where user can upadatt the there Enter 
// by using the CreatAsyncThuck 
export const updateTodoFirebase = createAsyncThunk("todo/updateFirebaseTodo", 
    async (db ,id ,text,description,category) => {
        try{
            const docRef = doc(db, "list", id);
            await updateDoc(docRef);
            return { id  ,text,description ,category};
        }catch(error){
            throw new Error (error.message)
       }
});

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [], // all Todo
        shortTermtodos:[], // short term goal todo list 
        longtermtodos:[], // long term goal todo list
        status: "idle",
        error: null
    },
    reducers:{},
    // this bulider part where is Return the the promise to check the task are Fullifilled or not 
    extraReducers: (builder) => {
        builder
          .addCase(fetchTodos.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchTodos.fulfilled, (state, action) => {
            const allTodos=action.payload;
            state.todos=[];
            state.shortTermtodos=[];
            state.longtermtodos=[];
            allTodos.forEach(todo=>{
             if (todo.category === "all-goal") {
              state.todos.push(todo);
             } else if (todo.category === "short-term") {
             state.shortTermtodos.push(todo);
             } else if (todo.category === "long-term") {
              state.longtermtodos.push(todo);
               }
            })
          })
          .addCase(fetchTodos.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(addTodoFirebase.fulfilled, (state, action) => {
            // state.todos.push(action.payload);
            if(action.payload.category==="all-goal"){
                state.todos.push(newTodo)
            }else if(action.payload.category==="short-term"){
                state.shortTermtodos.push(newTodo)
            }else if(action.payload,category==="long-term"){
                state.longtermtodos.push(newTodo)
            }
          })
          .addCase(deleteTodoFirebase.fulfilled, (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            state.shortTermtodos=state.shortTermtodos.filter(todo.id!==action.payload)
            state.longtermtodos=state.longtermtodos.filter(todo.id!==action.payload)
          })
          
      },
    });
    
    export default todoSlice.reducer;

