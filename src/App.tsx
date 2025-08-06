import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Login from "./components/sections/LoginPages/Login";
import MainApp from "./pages/MainApp";
import Register from "./components/sections/RegisterPages/Register";
import { useEffect } from "react";
import { useAuthMeQuery } from "./api/auth/authApi";

function App() {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useAuthMeQuery();
  useEffect(() => {
    if (isLoading) return;

    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    // Если нет токена или ошибка - редирект на /register
    if ((!token || isError) && currentPath !== "/r") {
      navigate("/");
      return;
    }

    // Если есть токен и данные пользователя - редирект на /
    if (token && userData?.state && currentPath !== "/") {
      navigate("/");
      return;
    }

    // Если токен есть, но нет данных пользователя - редирект на /register
    if (token && !userData?.state && currentPath !== "/") {
      navigate("/");
    }
  }, [userData, isLoading, isError]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<MainApp />} />
    </Routes>
  );
}

export default App;
