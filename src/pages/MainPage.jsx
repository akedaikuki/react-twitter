import React from "react";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
// import { ShowModalContextProvider } from "../Context/ShowModalContext";
import { MainContextProvider } from "../Context/MainPageContext";
import { ReplyListContextProvider } from "../components/contexts/DataContext";

// import Popular from "../components/Popular";

function MainPage() {
  return (
    <MainContextProvider>
      <ReplyListContextProvider>
        <div className="main">
          <SideBar />
          <Outlet />
          {/* <Popular /> */}
        </div>
      </ReplyListContextProvider>
    </MainContextProvider>
  );
}

export default MainPage;
