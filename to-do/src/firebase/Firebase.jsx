import { initializeApp } from "firebase/app";
import { createContext, useContext, useState  } from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

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
 const app = initializeApp(firebaseConfig);
 const auth=getAuth(app)
 const db=getFirestore(app)

const FirebaseContext=createContext();
  
  export const useFirebase=()=>useContext(FirebaseContext);

 export const FirebaseProvider=({children})=>{
  const [userName ,setUserName]=useState()
  const singup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
      const user = userCredential.user;
      setUserName(user.email); 
      
     
    });
  };
  const login=(email ,password)=>{
    return signInWithEmailAndPassword(auth ,email,password )
  }
    return(

        <FirebaseContext.Provider value={{singup ,login ,auth,db,userName ,setUserName}}>
            {children}
        </FirebaseContext.Provider>
    )
 }