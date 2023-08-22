import React, { useState } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { TurnbackIcon } from "../assets/icons";
import { StyledTabbar } from "../components/common/tab.styled";
import { PageStyle, UserPageConainer } from "../components/common/page.styled";
import UserFollowCard from "../components/Cards/UserFollowCard";
import user1 from "../API/user1";
import users from "../API/users";

function UserFollowPage() {
  const [activeTab, setActiveTab] = useState("follower");
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
              {userInfo[0].data.Tweets[0].tweetsTotal} 推文
            </p>
          </div>
        </header>

        <StyledTabbar>
          <button
            className={
              "userTab" + clsx(" ", { active: activeTab === "follower" })
            }
            onClick={() => {
              if (activeTab !== "follower") {
              }
              setActiveTab("follower");
            }}
          >
            追隨者
          </button>
          <button
            className={
              "userTab" + clsx(" ", { active: activeTab === "following" })
            }
            onClick={() => {
              if (activeTab !== "following") {
              }
              setActiveTab("following");
            }}
          >
            正在追隨
          </button>
        </StyledTabbar>
        <div className="followList">
          {usersInfo.map((usersInfo) => {
            if (activeTab === "follower") {
              return (
                <UserFollowCard
                  key={usersInfo.data.user[0].id}
                  userId={usersInfo.data.user[0].id}
                  avatar={usersInfo.data.user[0].avatar}
                  name={usersInfo.data.user[0].name}
                  introduction={usersInfo.data.user[0].introduction}
                  // isFollowed={usersInfo.data.followers[0].isFollowed}
                />
              );
            }
            if (activeTab === "following") {
              return (
                <UserFollowCard
                  key={usersInfo.data.user[0].id}
                  userId={usersInfo.data.user[0].id}
                  avatar={usersInfo.data.user[0].avatar}
                  name={usersInfo.data.user[0].name}
                  introduction={usersInfo.data.user[0].introduction}
                  // isFollowed={usersInfo.data.followers[0].isFollowed}
                />
              );
            }
          })}
        </div>
      </PageStyle>
    </UserPageConainer>
  );
}

export default UserFollowPage;
