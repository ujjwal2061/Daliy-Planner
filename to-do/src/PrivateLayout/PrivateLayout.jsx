import { Navigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase";

const PrivateLayout = ({ children} ) => {
  const {userName} =useFirebase()
  if(! userName && ! localStorage.getItem('userName')){
    return <Navigate to="/content" replace />
  }
    return <>{children}</> 
  
  };
  export default PrivateLayout;
  