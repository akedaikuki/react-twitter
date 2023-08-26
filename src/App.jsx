import "./App.scss";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AdminLoginPase, LoginPage, SignUpPage } from "./pages";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import TweetPage from "./pages/TweetPage";
import UserFollowPage from "./pages/UserFollowPage";
import OtheruserPage from "./pages/OtherUser/OtherUserPage";
import OtherFollowPage from "./pages/OtherUser/OtherFollowPage";
import SettingPage from "./pages/SettingPage";
function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        {/* <FollowClickContextProvider> */}
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route
              index
              element={
                <HomePage showModal={showModal} setShowModal={setShowModal} />
              }
            />
            <Route path="api/users/:UserId/tweets" element={<UserPage />} />
            <Route
              path="api/users/:UserId/replied_tweets"
              element={<UserPage />}
            />
            <Route path="api/users/:UserId/likes" element={<UserPage />} />
            <Route
              path="api/tweets/:tweet_id/replies"
              element={<TweetPage />}
            />
            <Route path="api/otherusers/:UserId" element={<OtheruserPage />} />
            <Route
              path="api/users/:UserId/followers"
              element={<UserFollowPage />}
            />
            <Route
              path="api/users/:UserId/followings"
              element={<UserFollowPage />}
            />
            <Route
              path="api/otherusers/:UserId/followers"
              element={<OtherFollowPage />}
            />
            <Route
              path="api/otherusers/:UserId/followings"
              element={<OtherFollowPage />}
            />
            <Route path="setting" element={<SettingPage />} />
          </Route>

          <Route path="api/users/signin" element={<LoginPage />} />
          <Route path="api/users" element={<SignUpPage />} />
          <Route path="api/admin/users" element={<AdminLoginPase />} />
        </Routes>
        {/* </FollowClickContextProvider> */} 
      </BrowserRouter>
    </div>
  );
}

export default App;
