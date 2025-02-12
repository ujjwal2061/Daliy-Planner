import  Screen from '../section/Screen'
import  Home  from "./subpage/Home"
import  Footer  from "./subpage/Footer"
import  Contact  from "./subpage/Contact"
import Feature from "./subpage/Feature"
import { useRef } from 'react'
const Manipage=()=>{
  const homeRef = useRef(null);
  const featureRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);
    const scrollToSection = (ref) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
  
    return(
      <Screen>
          <Home  homeref={homeRef} scrollToSection={scrollToSection} featureRef={featureRef} contactRef={contactRef} />
      <Feature ref={featureRef} />
      <Contact ref={contactRef} />
      <Footer ref={footerRef} />
      </Screen>
    )
}

export default Manipage;