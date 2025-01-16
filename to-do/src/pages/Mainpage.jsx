import  Screen from '../section/Screen'
import  Home  from './subpage/Home'
import  Hero  from './subpage/Hero'
import  Footer  from './subpage/Footer'
import  Contact  from "./subpage/Contact"
const Manipage=()=>{
  
    return(
      <Screen>
        <Home />
        <Hero />
        <Contact />
        <Footer />
      </Screen>
    )
}

export default Manipage;