import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import Content from "../pages/subpage/Content";
  import Signup from "./Signup";
  import Login from "./Login"
  import PrivateLayout from "../PrivateLayout/PrivateLayout";
  import Mainpage from "../pages/Mainpage";
  import Errorpage from "../pages/error/Errorpage";
const router=createBrowserRouter([
 {
path:"/",
element:<Mainpage />
 },  
 {
    path:"/signup",
    element:<Signup />
 },
 {path:"/login",
    element:<Login />
 },
 {path:"*",element:<Errorpage />},
 { 
   path:"/content",
    element: (
      <PrivateLayout>
         <Content />
      </PrivateLayout>
      ) 
 }
  ]);

  const AppRoute=()=>{
    return(
        <RouterProvider router={router} />
    )
  }

  export default AppRoute;