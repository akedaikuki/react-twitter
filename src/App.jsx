import "./App.scss";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminTweetPage from "./pages/AdminTweetPage";
import AdminUserPage from "./pages/AdminUserPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import TweetPage from "./pages/TweetPage";
import UserFollowPage from "./pages/UserFollowPage";
import OtheruserPage from "./pages/OtherUser/OtherUserPage";
import OtherFollowPage from "./pages/OtherUser/OtherFollowPage";
import SettingPage from "./pages/SettingPage";

function App({ TweetId, id }) {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <FollowClickContextProvider> */}
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage />} />
            <Route path={`api/users/2/tweets`} element={<UserPage />} />
            <Route path={`api/users/2/replied_tweets`} element={<UserPage />} />
            <Route path={`api/users/2/likes`} element={<UserPage />} />
            <Route path={`api/tweets/${TweetId}`} element={<TweetPage />} />
            <Route
              path={`api/users/${id}/tweets`}
              element={<OtheruserPage />}
            />
            <Route
              path="api/users/:UserId/followers"
              element={<UserFollowPage />}
            />
            <Route
              path="api/users/:UserId/followings"
              element={<UserFollowPage />}
            />
            <Route
              path="api/users/:UserId/followers"
              element={<OtherFollowPage />}
            />
            <Route
              path="api/users/:UserId/followings"
              element={<OtherFollowPage />}
            />
            <Route path="setting" element={<SettingPage />} />
          </Route>

          <Route path="api/users/signin" element={<LoginPage />} />
          <Route path="api/users" element={<SignUpPage />} />
          <Route path="api/admin/login" element={<AdminLoginPage />} />
          <Route path="api/admin/tweets" element={<AdminTweetPage />} />
          <Route path="api/admin/users" element={<AdminUserPage />} />
        </Routes>
        {/* </FollowClickContextProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
