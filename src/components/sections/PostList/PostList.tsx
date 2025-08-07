import { observer } from 'mobx-react-lite';
import { useEffect } from "react";
import { AsyncDataRender } from '../../../shared/ui/AsyncDataRender/AsyncDataRender';
import { postActions } from '../../../stores/post/post-actions/post-actions';
import CreatePost from "../CreatePost/CreatePost";
import { Post } from "./Post";
import "./Post.scss";
import "./PostList.scss";
import "./modal.scss";

export const PostList = observer(() => {
  const {
    getPostsAction,
    posts: {
      data,
      status
    }
  } = postActions;

  useEffect(() => { getPostsAction(); }, []);

  return (
    <>
      <AsyncDataRender
        status={status}
        data={data}
        render={() => {
          return (
            <div className="group-posts">
              {data?.map((post) => {
                return (
                  <Post key={post._id} post={post} />
                );
              })}
              <CreatePost close={false} />
            </div>
          );
        }}
      />
    </>
  );
});