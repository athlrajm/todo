import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCHfUdhGYd9EY9qAzw8tOQnXtrJe3FP3JU",
    authDomain: "react--todo-app-51896.firebaseapp.com",
    projectId: "react--todo-app-51896",
    storageBucket: "react--todo-app-51896.appspot.com",
    messagingSenderId: "694514585698",
    appId: "1:694514585698:web:87ca55130f5dbd7903813b"
  };
  initializeApp(firebaseConfig);
const auth = getAuth(); 
const provider = new GoogleAuthProvider();
const db=getFirestore()
export { auth, provider ,db};