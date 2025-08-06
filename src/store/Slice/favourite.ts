import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../api/posts/postsApi";
import { loadInitialState } from "./storage";

export type PostFavouritePost = {
  title?: string;
  _id: string;
  text: string;
  user?: User;
  createdAt: string;
  likeCount: number;
};
interface FavouriteState {
  itemsFavourite: PostFavouritePost[];
}

const initialState: FavouriteState = {
  itemsFavourite: loadInitialState(),
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<PostFavouritePost>) => {
      const checkLike = state.itemsFavourite.some(
        (obj) => obj._id === action.payload._id
      );
      if (!checkLike) {
        state.itemsFavourite.push(action.payload);
      }

      localStorage.setItem(
        "favouriteItems",
        JSON.stringify(state.itemsFavourite)
      );
    },

    removeFavouritePost: (state, action: PayloadAction<{ _id: string }>) => {
      state.itemsFavourite = state.itemsFavourite.filter(
        (post) => post._id !== action.payload._id
      );

      localStorage.setItem(
        "favouriteItems",
        JSON.stringify(state.itemsFavourite)
      );
    },
    clearFavourites: (state) => {
      state.itemsFavourite = [];
      localStorage.removeItem("favouriteItems");
    },
  },
});

export const { addFavourite, clearFavourites, removeFavouritePost } =
  favouriteSlice.actions;
export default favouriteSlice.reducer;
