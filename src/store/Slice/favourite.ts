import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostProps } from "../../api/posts/postsApi";
import { loadInitialState } from "./storage";

interface FavouriteState {
  itemsFavourite: PostProps[];
}

const initialState: FavouriteState = {
  itemsFavourite: loadInitialState(),
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<PostProps>) => {
      const existingIndex = state.itemsFavourite.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex === -1) {
        state.itemsFavourite.push(action.payload);
      } else {
        state.itemsFavourite.splice(existingIndex, 1);
      }

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

export const { addFavourite, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
