import "./App.scss";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FollowClickContextProvider } from "./Context/FollowClickContext";
import { AdminLoginPase, LoginPage, SignUpPage } from "./pages";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import TweetPage from "./pages/TweetPage";
import UserFollowPage from "./pages/UserFollowPage";
import OtheruserPage from "./pages/OtherUser/OtherUserPage";

// import SettingPage from "./pages/SettingPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FollowClickContextProvider>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route index element={<HomePage />} />
              <Route path="api/users/:id" element={<UserPage />} />
              <Route path="api/users/:id/tweets" element={<TweetPage />} />
              <Route path="api/otherusers/:id" element={<OtheruserPage />} />
              <Route
                path="api/users/:id/followers"
                element={<UserFollowPage />}
              />
              <Route
                path="api/users/:id/followings"
                element={<UserFollowPage />}
              />
              {/* <Route path="setting" element={<SettingPage />} /> */}
            </Route>

            <Route path="api/users" element={<LoginPage />} />
            <Route path="api/users/signin" element={<SignUpPage />} />
            <Route path="api/admin/users" element={<AdminLoginPase />} />
          </Routes>
        </FollowClickContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
