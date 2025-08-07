import { observer } from 'mobx-react-lite';
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { useAuthMeQuery } from "./api/auth/authApi";
import Login from "./components/sections/LoginPages/Login";
import { Register } from "./components/sections/RegisterPages/Register";
import MainApp from "./pages/MainApp";
import { setNavigate } from './shared/utils/navigate';

export const App = observer(() => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useAuthMeQuery();

  useEffect(() => {
    if (!navigate) return;
    setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    if (isLoading) return;

    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    if ((!token || isError) && currentPath !== "/r") {
      navigate("/");
      return;
    }

    if (token && userData?.state && currentPath !== "/") {
      navigate("/");
      return;
    }

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
});
