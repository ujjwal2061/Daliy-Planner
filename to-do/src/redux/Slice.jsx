// import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
// import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";



// // Async Thunks for Firebase Operations
// export const fetchTodos = createAsyncThunk("todo/fetchTodosFirebase", async (db) => {
//     try{
//         const todoCollection = collection(db, "list");
//         const getList = await getDocs(todoCollection);
//         const todos = getList.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         return todos;
//     }catch(error){
//         console.log(error)
//     }
// });

// // Adding the Todo to Firebase
// export const addTodoFirebase = createAsyncThunk("todo/addToFirebase", async (db) => {
//     try{
//         const todoCollection = collection(db, "list");
//         const newTodo = { text: "", description: "", isChecked: false };
//         const docRef = await addDoc(todoCollection, newTodo);
//         return { id: docRef.id, ...newTodo };
//     }catch(error){
//         throw new Error(error.message)
//     }
// });

// // Delete the Todo from Firebase
// export const deleteTodoFirebase = createAsyncThunk("todo/deleteTodo", 
//     async ({id ,db}) => {
//         try{
//             const docRef = doc(db, "list", id);
//             await deleteDoc(docRef);
//             return id;
//         }catch(error){
//          throw new Error(error.message)
//         }
// });

// // Update the Todo list
// export const updateTodoFirebase = createAsyncThunk("todo/updateFirebaseTodo", 
//     async ({ db, id, isChecked }) => {
//         try{
//             const docRef = doc(db, "list", id);
//             await updateDoc(docRef, { isChecked });
//             return { id, isChecked };
//         }catch(error){
//             throw new Error (error.message)
//         }
// });

// export const todoSlice = createSlice({
//     name: "todo",
//     initialState: {
//         todos: [],
//         status: "idle",
//         error: null
//     },
//     reducers:{},
//     extraReducers: (builder) => {
//         builder
//           .addCase(fetchTodos.pending, (state) => {
//             state.status = "loading";
//           })
//           .addCase(fetchTodos.fulfilled, (state, action) => {
//             state.status = "succeeded";
//             state.todos = action.payload;
//           })
//           .addCase(fetchTodos.rejected, (state, action) => {
//             state.status = "failed";
//             state.error = action.error.message;
//           })
//           .addCase(addTodoFirebase.fulfilled, (state, action) => {
//             state.todos.push(action.payload);
//           })
//           .addCase(deleteTodoFirebase.fulfilled, (state, action) => {
//             state.todos = state.todos.filter((todo) => todo.id !== action.payload);
//           })
//           .addCase(updateTodoFirebase.fulfilled, (state, action) => {
//             const todo = state.todos.find((todo) => todo.id === action.payload.id);
//             if (todo) {
//               todo.isChecked = action.payload.isChecked;
//             }
//           });
//       },
//     });
    
//     export default todoSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Async Thunks for Firebase Operations
export const fetchTodos = createAsyncThunk("todo/fetchTodosFirebase", async (db) => {
  try {
    const todoCollection = collection(db, "list");
    const getList = await getDocs(todoCollection);
    const todos = getList.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return todos;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// Adding the Todo to Firebase
export const addTodoFirebase = createAsyncThunk("todo/addToFirebase", async ({ db, text, description }) => {
  try {
    const todoCollection = collection(db, "list");
    const newTodo = { text, description, isChecked: false };
    const docRef = await addDoc(todoCollection, newTodo);
    return { id: docRef.id, ...newTodo };
  } catch (error) {
    throw new Error(error.message);
  }
});

// Delete the Todo from Firebase
export const deleteTodoFirebase = createAsyncThunk("todo/deleteTodo", async ({ db, id }) => {
  try {
    const docRef = doc(db, "list", id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Update the Todo list
export const updateTodoFirebase = createAsyncThunk("todo/updateFirebaseTodo", async ({ db, id, isChecked }) => {
  try {
    const docRef = doc(db, "list", id);
    await updateDoc(docRef, { isChecked });
    return { id, isChecked };
  } catch (error) {
    throw new Error(error.message);
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    status: "idle",
    error: null
  },
  reducers: {},
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
      .addCase(updateTodoFirebase.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.isChecked = action.payload.isChecked;
        }
      });
  },
});

export default todoSlice.reducer;
