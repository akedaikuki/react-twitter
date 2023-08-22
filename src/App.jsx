import "./App.scss";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages";
import UserPage from "./pages/UserPage";
import TweetPage from "./pages/TweetPage";
// import UserFollowPage from "./pages/UserFollowPage";
// import OutuserPage from "./pages/OtherUser/OtherUserPage";
// import SettingPage from "./pages/SettingPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="user/:id" element={<UserPage />} />
            <Route path="user/:id/tweets" element={<TweetPage />} />
            {/* <Route path="otheruser/:id" element={<OutuserPage />} /> */}
            {/* <Route path="user/:id/follow" element={<UserFollowPage />} /> */}
            {/* <Route path="setting" element={<SettingPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
