import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState  } from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { createUserWithEmailAndPassword  } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { onAuthStateChanged ,updateProfile} from "firebase/auth";
import {getDatabase ,ref,set } from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyCbbONxZqKhdqs-lHirZjjGfKrTWIFQ2Ok",
  authDomain: "chat-app-04.firebaseapp.com",
  databaseURL: "https://chat-app-04-default-rtdb.firebaseio.com",
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
 const database=getDatabase(app)
 const FirebaseContext=createContext();
  
export const useFirebase=()=>useContext(FirebaseContext); // use this as a Conyext API 

 export const FirebaseProvider=({children})=>{
  const [userName ,setUserName]=useState("")

  const singup = async (email, password ,userName) => {
    try{
     const userCredential=await createUserWithEmailAndPassword(auth, email, password)
     const user=userCredential.user;
     await updateProfile(user,{
      displayName: userName,
    });
     await set(ref(database ,`users/${user.uid}`),{  // set the user Detalies in Firebase RealTime database 
     Name:userName,
     email:user.email
    })
     setUserName(userName);
     console.log("Sigunp successful",user.displayName || "Guest") // show the userName
     const userDetails={...user, Name:userName ,email:user.email};
     return  userDetails
   }catch(error){
   throw error;
   }
}
//  Login Function
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
        <FirebaseContext.Provider value={{singup ,login ,auth,db,userName ,setUserName ,database}}>
            {children}
        </FirebaseContext.Provider>
    )
 }