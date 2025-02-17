import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";

// Function to Fecthing the data from the database of the current user login
export const fetchTodos = createAsyncThunk("todo/fetchTodosFirebase", async ({ db, user }) => {
    try {
        if (!user || !user.uid) {
            console.log("Can't get access");
            return []; 
        }
        const todoCollection = collection(db, "list");
        const q = query(todoCollection, where("userID", "==", user.uid)); 
        const querySnapshot = await getDocs(q);
        
        const usertasklist = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            text: doc.data().text,        
            description: doc.data().description,
            category: doc.data().category,
            createdAt: new Date().toLocaleDateString(),
        }));
        return usertasklist; 
    } catch (error) {
        throw error;
    }
});

// Function to Add the task list at the database 
export const addTodoFirebase = createAsyncThunk("todo/addToFirebase", 
    async ({ db, text, description, category, user }) => {
        try{

            if (!user || !user.uid) {
                throw new Error("User not authenticated");
            }
            const docRef=await addDoc(collection(db,"list"),{
                text,
                description,
                category,
                userID:user.uid,
                createdAt: new Date().toLocaleDateString(),
            })        
            return ({id:docRef.id ,text,description,category,userID:user.uid,createdAt:new Date().toLocaleDateString()});
       
       }catch(error){
        throw new Error(error.message);
        }
    })
// Function to delete the  task from the data base 
export const deleteTodoFirebase = createAsyncThunk("todo/deleteTodo", async ({ id, db }) => {
    try {
        const docRef = doc(db, "list", id);
        await deleteDoc(docRef);
        return id; 
    } catch (error) {
        throw new Error(error.message);
    }
});
// Function to upadata the task list if user want to change anything 
export const updateTodoFirebase = createAsyncThunk("todo/updateFirebaseTodo", async ({ db, id, text, description, category }) => {
    try {
        const docRef = doc(db, "list", id);
        await updateDoc(docRef, { text, description, category }); 
        return { id, text, description, category }; 
    } catch (error) {
        throw new Error(error.message);
    }
});


export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
        shortTermtodos: [],
        longtermtodos: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchTodos.pending, (state) => {
              state.status = "loading";
          })
          .addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = "succeeded";
            const allTodos = action.payload || []; 
        
            state.todos = allTodos.filter(todo => todo.category === "all-goal");
            state.shortTermtodos = allTodos.filter(todo => todo.category === "short-term");
            state.longtermtodos = allTodos.filter(todo => todo.category === "long-term");
        })
        
          .addCase(fetchTodos.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message;
          })
          .addCase(addTodoFirebase.fulfilled, (state, action) => {
              const newTodo = action.payload;
              if (newTodo.category === "all-goal") {
                  state.todos.push(newTodo);
              } else if (newTodo.category === "short-term") {
                  state.shortTermtodos.push(newTodo);
              } else if (newTodo.category === "long-term") {
                  state.longtermtodos.push(newTodo);
              }
          })
          .addCase(deleteTodoFirebase.fulfilled, (state, action) => {
              const idToDelete = action.payload;
              state.todos = state.todos.filter(todo => todo.id !== idToDelete);
              state.shortTermtodos = state.shortTermtodos.filter(todo => todo.id !== idToDelete);
              state.longtermtodos = state.longtermtodos.filter(todo => todo.id !== idToDelete);
          });
      },
});

// Export reducer
export default todoSlice.reducer;



        // const todoCollection = collection(db, "list");

        // const 
        // const newTodo = { 
        //     text,
        //     description,
        //     category,
        //     userID: user.uid,
        //     createdAt: serverTimestamp(),
        // };
        
        // const docRef = await addDoc(collection(todoCollection, newTodo);
        // const usertask = {
        //     id: docRef.id,
        //     text,
        //     text,
        //     description,
        //     category,
        //     userID: user.uid,
        //     createdAt: serverTimestamp(),
        //     ...newTodo,
        //     createdAt: new Date().toLocaleString(),
        // });