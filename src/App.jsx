import "./App.scss";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AdminLoginPase, LoginPage, SignUpPage } from "./pages";
import UserPage from "./pages/UserPage";
import TweetPage from "./pages/TweetPage";
import UserFollowPage from "./pages/UserFollowPage";
import OutuserPage from "./pages/OtherUser/OtherUserPage";
// import SettingPage from "./pages/SettingPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage />} />
            <Route path="user/:id" element={<UserPage />} />
            <Route path="user/:id/tweets" element={<TweetPage />} />
            <Route path="otheruser/:id" element={<OutuserPage />} />
            <Route path="user/:id/follower" element={<UserFollowPage />} />
            <Route path="user/:id/following" element={<UserFollowPage />} />
            {/* <Route path="setting" element={<SettingPage />} /> */}
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="admin_login" element={<AdminLoginPase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
