import React, { useState } from 'react'
import './Signup.css';
import axios from 'axios';
import toast from 'react-hot-toast'
import {Link, useNavigate} from 'react-router-dom'

function Login() {
  
  const navigateTo = useNavigate()
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const LoginHandler = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${BASE_URL}/user/login`, {
        username, password,
      },{
        withCredentials: true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(data)
      localStorage.setItem("jwt", data.token)
      toast.success(data.message || "User Login Successful !");
      setUsername(""); setPassword("")
      navigateTo("/");
      
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
   
  }

  return (
    <>
    <div className="container">
    <div className="signup-box">
      <h2>Login</h2>
      <form onSubmit={LoginHandler}>
        <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p className="login-link">
        Don't have an account? <a href="./signup">Signup</a>
      </p>
    </div>
  </div>
    </>
  )
}

export default Login