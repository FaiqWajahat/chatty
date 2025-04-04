import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import useAuthStore from "./StateStore/zustandState";
import { useEffect } from "react";
import Profile from "./Pages/Profile";
import Setting from "./Pages/Setting";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./StateStore/ThemeStore";
import { Loader } from "lucide-react";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // No need to add `checkAuth` in dependencies

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
  },[theme])
  
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/setting" element={<Setting />} />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
