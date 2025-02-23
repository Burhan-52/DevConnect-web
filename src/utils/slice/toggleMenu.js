import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isopen: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isopen = !state.isopen;
    },
    closeMenu: (state) => {
      state.isopen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;
