import Header from "../components/Header/Header";
import ProfileSidebar from "../components/sections/ProfileSidebar/ProfileSidebar";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Favourite from "../components/sections/Favourite/Favourite";
import Music from "./Music/Music";

function MainApp() {
  return (
    <div className="App wrapper">
      <Header />
      <main className="main">
        <div className="main-container">
          <ProfileSidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/music" element={<Music />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default MainApp;
