import "./App.scss";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
// import TweetPage from "./pages/TweetPage";
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
            <Route path="user" element={<UserPage />} />
            {/* <Route path="user/tweet" element={<TweetPage />} /> */}
            {/* <Route path="otheruser" element={<OutuserPage />} /> */}
            {/* <Route path="user/userfollow" element={<UserFollowPage />} /> */}
            {/* <Route path="setting" element={<SettingPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
