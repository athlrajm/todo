import React from 'react'
import { auth, provider } from '../firebase'
import {signInWithPopup} from "firebase/auth"
import GoogleIcon from '../assets/google-icon-logo.webp'
import './LoginPage.css'
import Designer from '../assets/Designer.png'
function LoginPage() {
    const signInUser=()=>{
        signInWithPopup(auth,provider).catch((err)=>alert(err.message));
    }
  return (
    <div className='flex'> 
       <div className='one'>
        <img className="img1" src="https://i.pinimg.com/736x/4e/f5/d8/4ef5d838ba0931d3b920641918b4bbae.jpg" alt=''/>
        <h1 className='l1'>LOGIN</h1>
        <p className='pp1'>Our Todo App is designed to help you organize your tasks efficiently.<br></br> Whether it's managing your daily chores, keeping track of work assignments,<br></br> or simply jotting down ideas, our app provides a seamless experience <br></br>to keep you organized and productive.</p>
        <br></br>
        <button className="bt1" onClick={signInUser}>
  <img src={GoogleIcon} alt="Google" className="google-icon" /> Sign in using Google
</button>
        </div>
      <div className='two'>
        <img  className="img2" src={Designer} alt=''></img>
      </div>
    </div>
  )
}

export default LoginPage