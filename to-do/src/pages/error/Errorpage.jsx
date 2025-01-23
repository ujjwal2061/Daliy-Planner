import { useNavigate } from "react-router";
const Errorpage = () => {
    const navagation=useNavigate();
    const backbtn=()=>{
       navagation("/");
    }
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <img 
          src="error.jpeg"
          alt="Error" 
          className="w-1/2
           h-auto mb-5 rounded-lg  transition-transform duration-300 hover:scale-105" 
        />
        <p className="font-jetbrains  font-semibold text-xl text-gray-900 text-center">
          Sorry, we cannot find the page you are looking for
        </p>
        <button
          onClick={backbtn}
          className="mt-5 px-6 py-2 bg-black   text-white rounded-lg shadow-md transition-all duration-300 hover:bg-gray-900   hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
          Go Back
        </button>
      </div>
    );
  };
  
  export default Errorpage;