import { ThemeContext } from '../../theme/ThemeContext';
import { useContext  ,useEffect} from 'react';
import { useNavigate, Outlet,useLocation } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

const Content=()=>{
  const {theme} =useContext(ThemeContext)
  const location=useLocation() // to get the Current location of the route
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/content") {
      navigate("/content/workplace", { replace: true });
    }
  }, [location, navigate]);

return (
 <section className= {`  flex   ${theme === "dark" ? "bg-[#18191A] text-white" : "bg-[#F0F2F5] text-black"}`}>
        <Sidebar />
      <main className="flex-1 md:ml-[50px] overflow-y-auto transition-all duration-300 h-full  flex-row ">
      <Outlet />
 </main>
</section>
  )}
  export default Content;
  