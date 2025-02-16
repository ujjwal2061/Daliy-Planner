import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState  } from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { createUserWithEmailAndPassword ,signOut } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { onAuthStateChanged ,updateProfile} from "firebase/auth";
import {getDatabase ,ref,set } from "firebase/database"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain:import.meta.env.VITE_AUTHDOMAIN_KEY,
  databaseURL: import.meta.env.VITE_DATABASE_KEY,
  projectId: import.meta.env.VITE_POJECTID_KEY,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET_KEY,
  messagingSenderId:import.meta.env.VITE_MESSAGEID_KEY ,
  appId: import.meta.env.VITE_APPID_KEY,
  measurementId:import.meta.env.VITE_MEASUREMENTID_KEY
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
  const Logout=()=>{
     return signOut(auth)
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
        <FirebaseContext.Provider value={{singup ,login ,auth,db,userName ,setUserName ,database ,Logout}}>
            {children}
        </FirebaseContext.Provider>
    )
 }