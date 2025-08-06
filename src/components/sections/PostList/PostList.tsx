import Post from "./Post";
import "./PostList.scss";
import "./Post.scss";
import "./modal.scss";
import { useGetAllPostsQuery } from "../../../api/posts/postsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useMemo, memo } from "react";
import CreatePost from "../CreatePost/CreatePost";

const PostList = memo(() => {
  const { valueHeaderDebounce } = useSelector(
    (state: RootState) => state.valueHeaderSearch
  );

  const { data, isLoading, isError } = useGetAllPostsQuery();
  const filteredPosts = useMemo(() => {
    if (!data?.items) return [];
    if (!valueHeaderDebounce) return data.items;

    const searchTerm = valueHeaderDebounce.toLowerCase();
    return data.items.filter((post) =>
      post.text.toLowerCase().includes(searchTerm)
    );
  }, [valueHeaderDebounce, data?.items]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;
  return (
    <div className="group-posts">
      {filteredPosts.length ? (
        filteredPosts.map((post) => <Post key={post._id} {...post} />)
      ) : (
        <CreatePost close={false} />
      )}
    </div>
  );
});

export default PostList;
