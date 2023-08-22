import React from "react";
import { TurnbackIcon } from "../../assets/icons";
import { StyledTabbar } from "../../components/common/tab.styled";
import UserFollowList from "../../components/profile/UserFollowList";
import {
  PageStyle,
  UserPageConainer,
} from "../../components/common/page.styled";

function OutuserFollowPage() {
  return (
    <UserPageConainer className="userFollowPageConainer">
      <PageStyle className="followPageStyle">
        <header>
          <TurnbackIcon className="returnIcon" />
          <div className="header_info">
            <h5 className="username">Mary Jane</h5>
            <p className="tweet_amount"> 1.4萬 推文</p>
          </div>
        </header>

        <StyledTabbar>
          <button className={"userTab"}>追隨者</button>
          <button className={"userTab"}>正在追隨</button>
        </StyledTabbar>
        <div className="followList">
          <UserFollowList />
        </div>
      </PageStyle>
    </UserPageConainer>
  );
}

export default OutuserFollowPage;
