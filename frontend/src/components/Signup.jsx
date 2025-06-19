import React, { useState } from 'react'
import './Signup.css';
import axios from 'axios';
import toast from 'react-hot-toast'
import {Link, useNavigate} from 'react-router-dom'
function Signup() {
  
  const navigateTo = useNavigate()
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signupHandler = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${BASE_URL}/user/signup`, {
        username, email, password,
      },{
        withCredentials: true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(data)
      toast.success(data.message || "Signup complete!");
      navigateTo("/login");
      localStorage.setItem("jwt", data.token)
      setUsername(""); setEmail(""); setPassword("")
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
   
  }

  return (
    <>
    <div className="container">
    <div className="signup-box">
      <h2>Sign Up</h2>
      <form onSubmit={signupHandler}>
        <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <a href="./login">Login</a>
      </p>
    </div>
  </div>
    </>
  )
}

export default Signup