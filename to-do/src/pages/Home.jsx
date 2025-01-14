import Sigup from "../Route/Sigup"
import Login from "../Route/Login"




const Home=()=>{
    const links=[
      {
        id:1,
        name:Login ,
        link:"/login"
      },
      {
        id:2,
        name:Sigup,
        link:"/signup"
      }
    ]
    // Function add the To-Do
    
    return(
        <section className="min-h-screen">
        <div className="flex justify-between  items-center ">
          <p>Daliy Planner</p>
          <div className="flex gap-3 ">
            {links.map((items)=>(
              <p key={items.id}>{items.name}</p>
            ))}
          </div>
          <div><p>Start Now</p></div>
        </div>
        </section>
    )
}

export default Home;