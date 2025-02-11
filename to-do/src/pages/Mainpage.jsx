import  Screen from '../section/Screen'
import  Home  from "./subpage/Home"
import  Footer  from "./subpage/Footer"
import  Contact  from "./subpage/Contact"
import Feature from "./subpage/Feature"
const Manipage=()=>{
    return(
      <Screen>
        <Home />
        <Feature />
        <Contact />
        <Footer />
      </Screen>
    )
}

export default Manipage;