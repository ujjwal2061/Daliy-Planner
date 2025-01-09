import { createSlice ,nanoid } from "@reduxjs/toolkit";

export const todoSlice =createSlice({
    name:"Todo",
 initialState:{
   todo:[{id:nanoid(),text:"Let See" ,isChecked:false ,description:"Testing the To-DO"}]
    },
    reducers:{
        // add Function 
        addTo:(state ,action)=>{
             state.todo.push(
                {
                    id:nanoid(),
                    text:action.payload.text,
                    description:action.payload.description
                }
             )
            },
            removtodo:(state ,action)=>{
                state.todo=state.todo.filter((todo)=>todo.id!==action.payload)
            },
            checktodo:(state ,action)=>{
                const todo=state.todo.find((todo)=>todo.id===action.payload)
                if(todo){
                    todo.isChecked=!todo.isChecked
                }
            },
            hello:()=>{
                alert("Wow u Clcik button ")
            }
    }
})

export const {addTo ,removtodo ,checktodo,hello}=todoSlice.actions
export default todoSlice.reducer