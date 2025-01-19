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
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
