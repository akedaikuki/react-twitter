import React from "react";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { ShowModalContextProvider } from "../Context/ShowModalContext";

// import Popular from "../components/Popular";

function MainPage() {
  return (
    <ShowModalContextProvider>
      <div className="main">
        <SideBar />
        <Outlet />
        {/* <Popular /> */}
      </div>
    </ShowModalContextProvider>
  );
}

export default MainPage;
