import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, [location]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Install Prompt Button */}
      {deferredPrompt && (
        <div style={{ position: "fixed", bottom: 10, right: 10 }}>
          <button onClick={handleInstallClick}>Install App</button>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default App;
