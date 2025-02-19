import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState  } from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { createUserWithEmailAndPassword ,signOut,onAuthStateChanged ,updateProfile,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
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
 export const googleprovider=new GoogleAuthProvider();
 
 export const useFirebase = () => {
  return useContext(FirebaseContext); 
};
 export const FirebaseProvider=({children})=>{
  const [userName ,setUserName]=useState("")
  const [currentUser, setCurrentUser] = useState(null);

  const singup = async (email, password ,userName) => {
    try{
     const userCredential=await createUserWithEmailAndPassword(auth, email, password)
     const user=userCredential.user;
     await updateProfile(user,{
      displayName: userName,
    });
     await set(ref(database ,`users/${user.uid}`),{  // setting  the user Detalies in Firebase RealTime database 
     Name:userName,
     email:user.email,
     createdAt:new Date().toLocaleString()
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

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setUserName(user.displayName || "");
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  const value={
    googleprovider, currentUser,
    singup ,
    login ,
    auth,
    db,
    userName ,
    setUserName ,
    database ,
    Logout,
    setCurrentUser
  }
    return(
        <FirebaseContext.Provider value={value }>
            { children}
        </FirebaseContext.Provider>
    )
 }