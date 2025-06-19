import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, [location]);

  return (
    <>
      <Routes>
        <Route path='/' element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App;
