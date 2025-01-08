import { createSlice ,nanoid } from "@reduxjs/toolkit";

export const todoSlice =createSlice({
    name:"Todo",
 initialState:{
   todo:[{id:nanoid(),text:"Let See"}]
    },
    reducers:{
        // add Function 
        addTo:(state ,action)=>{
             state.todo.push(
                {
                    id:nanoid(),
                    text:action.payload
                }
             )
            },
            removtodo:(state ,action)=>{
                state.todo=state.todo.filter((todo)=>todo.id!==action.payload)
            }
    }
})

export const {addTo ,removtodo}=todoSlice.actions
export default todoSlice.reducer