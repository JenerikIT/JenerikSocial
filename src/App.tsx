import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Login from "./components/sections/LoginPages/Login";
import MainApp from "./pages/MainApp";
import Register from "./components/sections/RegisterPages/Register";
import { useEffect } from "react";
import { useAuthMeQuery } from "./api/auth/authApi";
import FullPostEdit from "./components/sections/PostList/FullPostEdit";

function App() {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useAuthMeQuery();
  useEffect(() => {
    if (isLoading) return;

    if (isError || !userData?.state) {
      navigate("/login");
    }
  }, [userData, isLoading, isError, navigate]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<MainApp />} />
      <Route path="/posts/:id" element={<FullPostEdit />} />
    </Routes>
  );
}

export default App;
