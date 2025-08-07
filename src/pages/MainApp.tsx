import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import CreatePost from "../components/sections/CreatePost/CreatePost";
import Favourite from "../components/sections/Favourite/Favourite";
import FullPostEdit from "../components/sections/PostList/FullPostEdit";
import { PostList } from "../components/sections/PostList/PostList";
import ProfileSidebar from "../components/sections/ProfileSidebar/ProfileSidebar";
import Home from "./Home";
import Music from "./Music/Music";
import Profile from "./Profile";

function MainApp() {
  return (
    <div className="App wrapper">
      <Header />
      <main className="main">
        <div className="main-container">
          <ProfileSidebar />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<PostList />} />
              <Route path="posts/:id/edit" element={<FullPostEdit />} />
            </Route>
            <Route path="/posts/create" element={<CreatePost />} />
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
