// import Home from './pages/Home';
 import AppRoute from './Route/AppRoute';
import { FirebaseProvider } from './firebase/Firebase';
 const App=()=>{
  return(
    <FirebaseProvider>
      <AppRoute />
    {/* <Home /> */}
    </FirebaseProvider>
  )}
  export default App;
    