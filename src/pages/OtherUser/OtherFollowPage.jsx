import React, { useState, useContext } from "react";
import { TurnbackIcon } from "../../assets/icons";
import { StyledTabbar } from "../../components/common/tab.styled";
import {
  PageStyle,
  UserPageConainer,
} from "../../components/common/page.styled";
import Popular from "../../components/Popular";
import { useNavigate } from "react-router-dom";
import { FollowClickContext } from "../../Context/FollowClickContext";
import user1 from "../../API/user1";
import users from "../../API/users";
import clsx from "clsx";
import UserFollowCard from "../../components/Cards/UserFollowCard";
import {
  deleteUserFollow,
  getUserFollowers,
  getUserFollowing,
  postUserFollow,
} from "../../API/usercopy";

const FollowList = ({
  activeTab,
  onClick,
  followerData,
  followingData,
  onAvatarClick,
}) => {
  if (activeTab === "followers") {
    if (followerData.length === 0) {
      return null;
    } else {
      return followerData.map((item) => (
        <UserFollowCard
          key={item.UserId}
          item={item}
          activeTab={activeTab}
          onAvatarClick={(id) => onAvatarClick?.(id)}
          onClick={(id) => onClick?.(id)}
        />
      ));
    }
  } else if (activeTab === "followings") {
    if (followingData.length === 0 || !Array.isArray(followingData)) {
      return null;
    } else {
      return followingData.map((item) => (
        <UserFollowCard
          key={item.UserId}
          item={item}
          onClick={(id) => onClick?.(id)}
          activeTab={activeTab}
          onAvatarClick={(id) => onAvatarClick?.(id)}
        />
      ));
    }
  }
};

function OutuserFollowPage() {
  const { activeTab, setActiveTab } = useContext(FollowClickContext);
  const [userInfo, setUserInfo] = useState(user1);
  const [usersInfo, setUsersInfo] = useState(users);
  const navigate = useNavigate();
  return (
    <>
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
                navigate("/other/followers");
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
                navigate("/other/followings");
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
                    isFollowed={usersInfo.data.user[0].isFollowed}
                  />
                );
              }
              if (
                activeTab === "followings" &&
                usersInfo.data.user[0].isFollowed === 1
              ) {
                return (
                  <UserFollowCard
                    key={usersInfo.data.user[0].id}
                    userId={usersInfo.data.user[0].id}
                    avatar={usersInfo.data.user[0].avatar}
                    name={usersInfo.data.user[0].name}
                    introduction={usersInfo.data.user[0].introduction}
                    isFollowed={usersInfo.data.user[0].isFollowed}
                  />
                );
              }
            })}
          </div>
        </PageStyle>
      </UserPageConainer>
      <Popular />
    </>
  );
}

export default OutuserFollowPage;
