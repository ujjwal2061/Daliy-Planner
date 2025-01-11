import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";



// Async Thunks for Firebase Operations
export const fetchTodos = createAsyncThunk("todo/fetchTodosFirebase", async (db) => {
    try{
        const todoCollection = collection(db, "list");
        const getList = await getDocs(todoCollection);
        const todos = getList.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return todos;
    }catch(error){
        console.log(error)
    }
});

// Adding the Todo to Firebase
// // this Function were i  add the new task by using the ... operater 
// where it create the new  array of the each  object  and add to the firebase Db
export const addTodoFirebase = createAsyncThunk("todo/addToFirebase", async ({db ,text ,description}) => {
    try{
        const todoCollection = collection(db, "list");
        const newTodo = { text, description,};
        const docRef = await addDoc(todoCollection, newTodo);
        return { id: docRef.id, ...newTodo };
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
    async (db ,id) => {
        try{
            const docRef = doc(db, "list", id);
            await updateDoc(docRef);
            return id ;
        }catch(error){
            throw new Error (error.message)
        }
});

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
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
            state.status = "succeeded";
            state.todos = action.payload;
          })
          .addCase(fetchTodos.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })
          .addCase(addTodoFirebase.fulfilled, (state, action) => {
            state.todos.push(action.payload);
          })
          .addCase(deleteTodoFirebase.fulfilled, (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
          })
          
      },
    });
    
    export default todoSlice.reducer;

