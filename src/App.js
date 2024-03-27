
import './App.css';
import { auth } from './firebase';
import {useAuthState} from "react-firebase-hooks/auth"
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


function App() {
  const [user]=useAuthState(auth);
  return (
    <div >

      {!user?<LoginPage/>:<HomePage/>}
      
    </div>
  );
}

export default App;
