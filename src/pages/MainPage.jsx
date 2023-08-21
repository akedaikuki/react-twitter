import React from "react";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
// import HomePage from "./HomePage";
// import UserPage from "./UserPage";
// import UserFollowPage from "./UserFollowPage";
// import OtherUserPage from "./OtherUser/OtherUserPage";
// import OutuserFollowPage from "./OtherUser/OtherFollowPage";
// import TweetPage from "./TweetPage";

// import SeetingPage from "./SeetingPage";

// import Popular from "../components/Popular";

function MainPage() {
  return (
    <div className="main">
      <SideBar />
      <Outlet />
      {/* <HomePage /> */}
      {/* <UserPage /> */}
      {/* <UserFollowPage /> */}
      {/* <OtherUserPage /> */}
      {/* <OutuserFollowPage /> */}
      {/* <TweetPage /> */}
      {/* <SeetingPage /> */}
      {/* <Popular /> */}
    </div>
  );
}

export default MainPage;
