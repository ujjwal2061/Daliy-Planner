import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import Home from "../pages/Home"
  import Content from '../pages/Content'
 
  import Sigup from "./Sigup";
  import Login from "./Login"
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
 {path:"/content",
    element:  <Content />
 }
  ]);

  const AppRoute=()=>{
    return(
        <RouterProvider router={router} />
    )
  }

  export default AppRoute;