import { ThemeContext } from "../../theme/ThemeContext";
import { useContext } from "react";

const Feature = () => {
  const { theme } = useContext(ThemeContext);

  return (
<section className={`h-80 overflow-hidden py-6 px-2 w-full flex justify-center ${ theme === "dark" ? "bg-black text-white" : "bg-mainbackground text-black"}`} >
 <div className="flex gap-2   w-[200%] h-full ">
  <div className="flex gap-9 justify-center min-w-full animate-slideLeft">
  <div className={`lg:w-[390px] w-[230px] h-[250px] shadow-lg rounded-md flex flex-col px-2 lg:justify-center  justify-start p-4 border border-gray-300 hover:shadow-xl transition-shadow duration-300
     ${ theme === "dark" ? "bg-gray-900 text-white border-gray-600" : "bg-mainbackground text-black"}`}>
        <p className="mt-2 ml-2   lg:text-center font-lightfont text-xl text-start py-2">“Make Your day easier,<br />Stay Focus”</p>
        <img src="grils.png" className={`ml-10 -mt-2 h-32 lg:ml-auto  lg:mr-28   lg:h-auto max-w-full w-[100px] md:w-[120px] md:-mt-3 lg:w-[120px] lg:-mt-10 ${theme === "dark" ? "brightness-90 opacity-100" : ""}`} />
    </div>
    <div  className={`lg:w-[400px] w-[230px] h-[250px] shadow-lg rounded-md flex   flex-col px-2 lg:justify-center  justify-start p-4 border border-gray-300 hover:shadow-xl transition-shadow duration-300
     ${ theme === "dark" ? "bg-gray-900 text-white border-gray-600" : "bg-mainbackground text-black"}`}>
      <p className="font-lightfont text-xl   lg:text-center  text-start py-2">“why looses time when u <br />can be Productive”</p>
      <img src="DDD.png" className={`mt-6  ml-9 lg:ml-auto  h-[90px] lg:h-32 lg:mr-28  max-w-full w-[110px] md:w-[130px] lg:w-[150px] ${theme === "dark" ? "brightness-100 opacity-100" : ""}`} />
   </div>
   <div className={`lg:w-[400px] w-[230px] h-[250px] shadow-lg rounded-md flex flex-col px-2 lg:justify-center  justify-start p-4 border border-gray-300 hover:shadow-xl transition-shadow duration-300
     ${ theme === "dark" ? "bg-gray-900 text-white border-gray-600" : "bg-mainbackground text-black"}`}>
      <p className="font-lightfont text-xl  lg:text-center text-start py-2">“Make it simple and<br />StraightForward”</p>
      <img src="brain.png" className={`mt-5  ml-12 lg:ml-auto  h-28 lg:h-32 lg:mr-28  max-w-full w-[110px] md:w-[130px] lg:w-[150px] ${theme === "dark" ? "brightness-100 opacity-100" : ""}`} />
    </div>
  </div>

  <div className="flex gap-10 justify-center min-w-full animate-slideLeft">
  <div className={`lg:w-[390px] w-[230px] h-[250px] shadow-lg rounded-md flex flex-col px-2 lg:justify-center  justify-start p-4 border border-gray-300 hover:shadow-xl transition-shadow duration-300
     ${ theme === "dark" ? "bg-gray-900 text-white border-gray-600" : "bg-mainbackground text-black"}`}>
        <p className="mt-2 ml-2   lg:text-center font-lightfont text-xl text-start py-2">“Make Your day easier,<br />Stay Focus”</p>
        <img src="grils.png" className={`ml-10 -mt-2 h-32 lg:ml-auto  lg:mr-28   lg:h-auto max-w-full w-[100px] md:w-[120px] md:-mt-3 lg:w-[120px] lg:-mt-10 ${theme === "dark" ? "brightness-90 opacity-100" : ""}`} />
    </div>
    <div  className={`lg:w-[400px] w-[230px] h-[250px] shadow-lg rounded-md flex   flex-col px-2 lg:justify-center  justify-start p-4 border border-gray-300 hover:shadow-xl transition-shadow duration-300
     ${ theme === "dark" ? "bg-gray-900 text-white border-gray-600" : "bg-mainbackground text-black"}`}>
      <p className="font-lightfont text-xl   lg:text-center  text-start py-2">“why looses time when u <br />can be Productive”</p>
      <img src="DDD.png" className={`mt-7  ml-9 lg:ml-auto  h-[90px] lg:h-32 lg:mr-28  max-w-full w-[110px] md:w-[130px] lg:w-[150px] ${theme === "dark" ? "brightness-100 opacity-100" : ""}`} />
   </div>
   <div className={`lg:w-[400px] w-[230px] h-[250px] shadow-lg rounded-md flex flex-col px-2 lg:justify-center  justify-start p-4 border border-gray-300 hover:shadow-xl transition-shadow duration-300
     ${ theme === "dark" ? "bg-gray-900 text-white border-gray-600" : "bg-mainbackground text-black"}`}>
      <p className="font-lightfont text-xl  lg:text-center text-start py-2">“Make it simple and<br />StraightForward”</p>
      <img src="brain.png" className={`mt-5  ml-12 lg:ml-auto  h-28 lg:h-32 lg:mr-28  max-w-full w-[110px] md:w-[130px] lg:w-[150px] ${theme === "dark" ? "brightness-100 opacity-100" : ""}`} />
    </div>
  </div>


 </div>
</section>
  );
};

export default Feature;
