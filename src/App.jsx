import "./App.scss";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminTweetPage from "./pages/AdminTweetPage";
import AdminUserPage from "./pages/AdminUserPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import TweetPage from "./pages/TweetPage";
import UserFollowPage from "./pages/UserFollowPage";
import OtheruserPage from "./pages/OtherUser/OtherUserPage";
import OtherFollowPage from "./pages/OtherUser/OtherFollowPage";
import SettingPage from "./pages/SettingPage";
import RaectPage from "./pages/ReactPage";

function App() {
  // const TweetId = localStorage.getItem("TweetId");
  // console.log(TweetId);
  // const id = localStorage.getItem("id");
  return (
    <div className="App">
      <BrowserRouter>
        {/* <FollowClickContextProvider> */}
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage />} />
            <Route path="api/users" element={<UserPage />} />
            {/* <Route path="api/users/:id/replied_tweets" element={<UserPage />} /> */}
            {/* <Route path="api/users/:id/likes" element={<UserPage />} /> */}
            <Route path="api/tweets/:TweetId" element={<TweetPage />} />
            <Route path="api/other" element={<OtheruserPage />} />
            {/* <Route
              path="api/users/:id/replied_tweets"
              element={<OtheruserPage />}
            /> */}
            {/* <Route path="api/users/:id/likes" element={<OtheruserPage />} /> */}
            <Route path="api/users/followers" element={<UserFollowPage />} />
            <Route path="api/users/followings" element={<UserFollowPage />} />
            <Route path="api/other/followers" element={<OtherFollowPage />} />
            <Route path="api/other/followings" element={<OtherFollowPage />} />
            <Route path="setting" element={<SettingPage />} />
          </Route>

          <Route path="api/login" element={<LoginPage />} />
          <Route path="api/users/signin" element={<SignUpPage />} />
          <Route path="api/admin/login" element={<AdminLoginPage />} />
          <Route path="api/admin/tweets" element={<AdminTweetPage />} />
          <Route path="api/admin/users" element={<AdminUserPage />} />

          <Route path="*" element={<RaectPage />} />
        </Routes>
        {/* </FollowClickContextProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
