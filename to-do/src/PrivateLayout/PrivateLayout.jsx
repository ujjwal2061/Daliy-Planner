import { Navigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase";

const PrivateLayout = ({ children} ) => {
  const {userName} =useFirebase()
  if(! userName && ! localStorage.getItem('username')){
    return <Navigate to="/" replace />
  }
    return <>{children}</> 
  
  };
  export default PrivateLayout;
  