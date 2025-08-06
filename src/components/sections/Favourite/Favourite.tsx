import "./favourite.scss";
import Post from "../PostList/Post";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useGetAllLikedPostsQuery } from "../../../api/posts/postsApi";
type Props = {};
function Favourite({}: Props) {
  const [modalPost, setModalPost] = useState(false);
  const { data: AllMyLikedPost, isLoading } = useGetAllLikedPostsQuery();

  const itemsFavourite = useSelector(
    (state: RootState) => state.favourite.itemsFavourite
  );
  const postsToRender =
    !isLoading && AllMyLikedPost?.items ? AllMyLikedPost.items : itemsFavourite;

  const safePostsToRender = Array.isArray(postsToRender) ? postsToRender : [];
  useEffect(() => {
    document.body.style.overflow = modalPost ? "hidden" : "auto";
  }, [modalPost]);

  const onClickModal = useCallback((i: boolean) => {
    setModalPost(i);
  }, []);
  return (
    <div className="container-favourite">
      <div className="favourite">
        <div className="favourite__groups">
          {safePostsToRender.length > 0 ? (
            safePostsToRender.map((obj) =>
              obj && obj._id ? (
                <Post
                  key={obj._id}
                  onClickModal={onClickModal}
                  liked={true}
                  {...obj}
                />
              ) : null
            )
          ) : (
            <div className="Empty-favourite">пусто</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favourite;
