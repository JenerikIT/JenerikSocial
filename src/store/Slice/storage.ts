import { PostFavouritePost } from "./favourite";

export const loadInitialState = (): PostFavouritePost[] => {
  try {
    const saved = localStorage.getItem("favouriteItems");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load favorites", error);
    return [];
  }
};
