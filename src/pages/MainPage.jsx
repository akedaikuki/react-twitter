import React from "react";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

// import Popular from "../components/Popular";

function MainPage() {
  return (
    <div className="main">
      <SideBar />
      <Outlet />
      {/* <Popular /> */}
    </div>
  );
}

export default MainPage;
