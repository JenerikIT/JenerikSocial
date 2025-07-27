import Post from "./Post";
import "./PostList.scss";
import "./Post.scss";
import "./modal.scss";
import { useGetAllPostsQuery } from "../../../api/posts/postsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useMemo } from "react";

const PostList = () => {
  const { valueHeaderDebounce } = useSelector(
    (state: RootState) => state.valueHeaderSearch
  );
  const { data: apiPosts, isLoading, isError } = useGetAllPostsQuery();

  const filteredPosts = useMemo(() => {
    if (!apiPosts?.items) return [];
    if (!valueHeaderDebounce.length) return apiPosts.items;
    return apiPosts.items.filter((obj) =>
      obj.text.toLowerCase().includes(valueHeaderDebounce.toLowerCase())
    );
  }, [valueHeaderDebounce, apiPosts]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;

  return (
    <div>
      <div className="group-posts">
        {filteredPosts
          .filter((obj) =>
            obj.text.toLowerCase().includes(valueHeaderDebounce.toLowerCase())
          )
          .map((obj) => (
            <Post key={obj._id} {...obj} />
          ))}
      </div>
    </div>
  );
};

export default PostList;
