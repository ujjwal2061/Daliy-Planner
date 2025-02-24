import { Navigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase";

const PrivateLayout = ({ children} ) => {
  const {currentUser} =useFirebase()
  if(!currentUser && ! localStorage.getItem('userName')){
    return <Navigate to="/" replace />
  }
    return <>{children}</> 
  
  };
  export default PrivateLayout;
  