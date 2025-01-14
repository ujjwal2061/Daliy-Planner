import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import Home from "../pages/Home"
  import Content from '../pages/Content'
 
  import Signup from "./Signup";
  import Login from "./Login"
  import PrivateLayout from "../PrivateLayout/PrivateLayout";

const router=createBrowserRouter([
 {
    path:"/",
    element:<Home />
 },
 {
    path:"/signup",
    element:<Signup />
 },
 {path:"/login",
    element:<Login />
 },
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