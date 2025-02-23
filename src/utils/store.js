import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import FeedReducer from "./slice/feedSlice";
import connectionReducer from "./slice/connectionsRequest";
import requestReducer from "./slice/requestSlice";
import menuReducer from "./slice/toggleMenu";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: FeedReducer,
    connection: connectionReducer,
    request: requestReducer,
    menu: menuReducer,
  },
});

export default store;
