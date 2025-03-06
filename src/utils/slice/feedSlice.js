import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return [...state,...action.payload];
    },
    removeFeed: (state, action) => {
      let newFeed = state.filter((user) => {
        return user._id !== action.payload.id;
      });

      return newFeed;
    },
    clearFeed: () => {
      return [];
    },
  },
});

export const { addFeed, removeFeed, clearFeed } = feedSlice.actions;

export default feedSlice.reducer;
