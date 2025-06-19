import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Re-check token on location change
  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, [location]);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); 
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  // Automatically show install prompt after short delay
  useEffect(() => {
    if (deferredPrompt) {
      setTimeout(() => {
        deferredPrompt.prompt();
      }, 1500);
    }
  }, [deferredPrompt]);

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
