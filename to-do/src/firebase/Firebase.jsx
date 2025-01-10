
import { initializeApp } from "firebase/app";
import { createContext, useContext  } from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey:import.meta.env.VITE_APPkey,
  authDomain:import.meta.env.VITE_AUTHID,
  projectId:import.meta.env.VITE_ProjectID,
  storageBucket:import.meta.env.VITE_STORAGE,
  messagingSenderId:import.meta.env.VITE_MESSAGESENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENT,
 
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth=getAuth(app)
 const db=getFirestore(app)

  const FirebaseContext=createContext();
  
  export const useFirebase=()=>useContext(FirebaseContext);

 export const FirebaseProvider=({children})=>{
  const singiup=(email,password)=>{
    return createUserWithEmailAndPassword( auth ,email,password) 
  }
  const login=(email ,password)=>{
    return signInWithEmailAndPassword(auth ,email,password )
  }
    return(

        <FirebaseContext.Provider value={{singiup ,login ,auth,db}}>
            {children}
        </FirebaseContext.Provider>
    )
 }