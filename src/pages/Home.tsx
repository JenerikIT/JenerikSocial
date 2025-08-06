import { Outlet } from "react-router-dom";
import ContactList from "../components/sections/ContactList/ContactList";

import News from "../components/sections/News/News";

import UserHistory from "../components/sections/UserHistory/UserHistory";

function Home() {
  return (
    <>
      <div className="container-posts">
        <UserHistory type="none" />
        <Outlet />
      </div>
      <div className="container-Contact">
        <ContactList />
        <News />
      </div>
    </>
  );
}

export default Home;
