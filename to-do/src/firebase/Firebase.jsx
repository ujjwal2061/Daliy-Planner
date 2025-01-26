import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState  } from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
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
  const [userName ,setUserName]=useState("")

  const singup = async (email, password) => {
    try{
     const userCredential=await createUserWithEmailAndPassword(auth, email, password)
     const user=userCredential.user;
     await updateProfile(user,
    {
      displayName:userName
    })
     setUserName(userName);
     console.log(setUserName(user.displayName));
     console.log("Sigunp successful",user) // 
     return {...user, displayName:userName};

   }catch(error){
   console.log(error)
   throw error;
   }
}
 const login=(email ,password)=>{
    return signInWithEmailAndPassword(auth ,email,password )
  }
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      if(user){
        setUserName(user.displayName || "");
      }else{
        setUserName("")
      } 
    })
   return ()=>unsubscribe;
  },[])
    return(

        <FirebaseContext.Provider value={{singup ,login ,auth,db,userName ,setUserName}}>
            {children}
        </FirebaseContext.Provider>
    )
 }