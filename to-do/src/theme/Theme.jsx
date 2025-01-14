
import { createContext, useState } from "react";
export const ThemeContext=createContext()

const ThemeProvider=({children})=>{
    const [theme ,setTheme]=useState()
    return(
        <ThemeContext.Provider value={{theme,setTheme}} >
        {children}
        </ThemeContext.Provider>
    )
}
export default ThemeProvider;