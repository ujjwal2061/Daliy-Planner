import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import Home from "../pages/Home"
  import Content from '../pages/Content'
 
  import Sigup from "./Sigup";
  import Login from "./Login"
  import PrivateLayout from "../PrivateLayout/PrivateLayout";

const router=createBrowserRouter([
 {
    path:"/",
    element:<Home />
 },
 {
    path:"/sigup",
    element:<Sigup />
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