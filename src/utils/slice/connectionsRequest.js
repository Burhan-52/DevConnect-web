import { createSlice } from "@reduxjs/toolkit";

const connectionsRequest = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnectionRequest: (state, action) => action.payload,
    removeConnectionRequest: () => null,
  },
});

export const { addConnectionRequest, removeConnectionRequest } =
  connectionsRequest.actions;

export default connectionsRequest.reducer;
