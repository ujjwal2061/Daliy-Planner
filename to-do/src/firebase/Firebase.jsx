// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createContext  } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCbbONxZqKhdqs-lHirZjjGfKrTWIFQ2Ok",
  authDomain: "chat-app-04.firebaseapp.com",
  projectId: "chat-app-04",
  storageBucket: "chat-app-04.firebasestorage.app",
  messagingSenderId: "764854985544",
  appId: "1:764854985544:web:0d1170f6b42e7915d7497d",
  measurementId: "G-JML9PNW4B9"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 const TodoContext=createContext()

//  export const useTodo=()=>useContext(TodoContext)

 export const TODOProvider=({children})=>{
    return(

        <TodoContext.Provider value={{}}>
            {children}
        </TodoContext.Provider>
    )
 }