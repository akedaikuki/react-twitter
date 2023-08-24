import React, { useState, useContext } from "react";
import { TurnbackIcon } from "../../assets/icons";
import { StyledTabbar } from "../../components/common/tab.styled";
// import UserFollowList from "../../components/profile/UserFollowList";
import {
  PageStyle,
  UserPageConainer,
} from "../../components/common/page.styled";
import { useNavigate } from "react-router-dom";
import { FollowClickContext } from "../../Context/FollowClickContext";
import user1 from "../../API/user1";
import users from "../../API/users";
import clsx from "clsx";
import UserFollowCard from "../../components/Cards/UserFollowCard";

function OutuserFollowPage() {
  const { activeTab, setActiveTab } = useContext(FollowClickContext);
  const [userInfo, setUserInfo] = useState(user1);
  const [usersInfo, setUsersInfo] = useState(users);
  const navigate = useNavigate();
  return (
    <UserPageConainer className="userFollowPageConainer">
      <PageStyle className="followPageStyle">
        <header>
          <TurnbackIcon
            className="returnIcon"
            onClick={() => {
              navigate(-1);
            }}
          />
          <div className="header_info">
            <h5 className="username">{userInfo[0].data.user[0].name}</h5>
            <p className="tweet_amount">
              {" "}
              {userInfo[0].data.Tweets[0].tweetsTotal} 推文
            </p>
          </div>
        </header>

        <StyledTabbar>
          <button
            className={
              "userTab" + clsx(" ", { active: activeTab === "followers" })
            }
            onClick={() => {
              setActiveTab("followers");
              navigate("/api/otherusers/:id/followers");
            }}
          >
            追隨者
          </button>
          <button
            className={
              "userTab" + clsx(" ", { active: activeTab === "followings" })
            }
            onClick={() => {
              setActiveTab("followings");
              navigate("/api/otherusers/:id/followings");
            }}
          >
            正在追隨
          </button>
        </StyledTabbar>
        <div className="followList">
          {usersInfo.map((usersInfo) => {
            if (activeTab === "followers") {
              return (
                <UserFollowCard
                  key={usersInfo.data.user[0].id}
                  userId={usersInfo.data.user[0].id}
                  avatar={usersInfo.data.user[0].avatar}
                  name={usersInfo.data.user[0].name}
                  introduction={usersInfo.data.user[0].introduction}
                  isFollowed={usersInfo.data.followers[0].isFollowed}
                />
              );
            }
            if (activeTab === "followings") {
              return (
                <UserFollowCard
                  key={usersInfo.data.user[0].id}
                  userId={usersInfo.data.user[0].id}
                  avatar={usersInfo.data.user[0].avatar}
                  name={usersInfo.data.user[0].name}
                  introduction={usersInfo.data.user[0].introduction}
                  isFollowed={usersInfo.data.followers[0].isFollowed}
                />
              );
            }
          })}
        </div>
      </PageStyle>
    </UserPageConainer>
  );
}

export default OutuserFollowPage;
