import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./component/Body";
import Login from "./component/Login";
import { Provider } from "react-redux";
import store from "./utils/store";
import Feed from "./component/Feed";
import Profile from "./component/Profile";
import Connections from "./component/Connections";
import Requests from "./component/Requests";
import Chat from "./component/Chat";
import Premium from "./component/Premium";
import ForgotPassword from "./component/ForgotPassword";
import TestS from "./component/TestS";
import { ResetPassword } from "./component/ResetPassword";
import Search from "./component/Search";
import Message from "./component/Message";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/password/reset" element={<ForgotPassword />} />
              <Route path="/password/reset/:id/:token" element={<ResetPassword />} />
              <Route path="/test" element={<TestS />} />
              <Route path="/search" element={<Search />} />
              <Route path="/message" element={<Message />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
