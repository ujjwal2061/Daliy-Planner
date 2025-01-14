
 import AppRoute from './Route/AppRoute';
import { FirebaseProvider } from './firebase/Firebase';
import ThemeProvider from './theme/Theme';
 const App=()=>{
  return(
    <FirebaseProvider>
      <ThemeProvider>
      <AppRoute />
      </ThemeProvider>
    </FirebaseProvider>
  )}
  export default App;
    