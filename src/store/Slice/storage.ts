import { PostProps } from "../../api/posts/postsApi";

export const loadInitialState = (): PostProps[] => {
  try {
    const savedFavourite = localStorage.getItem("favouriteItems");
    return savedFavourite ? JSON.parse(savedFavourite) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
