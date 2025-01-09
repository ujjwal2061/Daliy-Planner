import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { store } from './redux/Store.jsx'
import { FirebaseProvider} from './firebase/Firebase.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store} >
      <FirebaseProvider>
       <App />
      </FirebaseProvider>
     </Provider>
  </StrictMode>,
)
