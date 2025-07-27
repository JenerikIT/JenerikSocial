import ContactList from "../components/sections/ContactList/ContactList";
import CreatePost from "../components/sections/CreatePost/CreatePost";
import News from "../components/sections/News/News";
import PostList from "../components/sections/PostList/PostList";
import SortDropdown from "../components/sections/SortDropdown/SortDropdown";
import UserHistory from "../components/sections/UserHistory/UserHistory";

type Props = {};

function Home({}: Props) {
  return (
    <>
      <div className="container-posts">
        <UserHistory type="none" />
        <CreatePost />
        <SortDropdown />
        <PostList />
      </div>
      <div className="contianer-Contact">
        <ContactList />
        <News />
      </div>
    </>
  );
}

export default Home;
