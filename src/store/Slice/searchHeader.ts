import { createSlice } from "@reduxjs/toolkit";

type valueHederProps = {
  valueHeaderDebounce: string;
};
const initialState: valueHederProps = {
  valueHeaderDebounce: "",
};

const searchValueHeaderSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeValueHeder: (state, action) => {
      state.valueHeaderDebounce = action.payload;
    },
  },
});
export const { changeValueHeder } = searchValueHeaderSlice.actions;
export default searchValueHeaderSlice.reducer;
