import  AppRoute from './Route/AppRoute'
import { FirebaseProvider } from './firebase/Firebase';
 const App=()=>{
  return(
    <FirebaseProvider>
        <AppRoute />
    </FirebaseProvider>
  )}
  export default App;
    