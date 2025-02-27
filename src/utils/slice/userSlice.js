import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    adduser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    modifyUser: (state) => {
      if (state.data.isPremium) {
        return state;
      } else {
        state.data = { ...state, isPremium: true };
      }
    },
  },
});

export const { adduser, removeUser, modifyUser } = userSlice.actions;

export default userSlice.reducer;
