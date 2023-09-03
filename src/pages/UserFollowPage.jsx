import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import Popular from "../components/Popular";
import { TurnbackIcon } from "../assets/icons";
import { StyledTabbar } from "../components/common/tab.styled";
import { PageStyle, UserPageConainer } from "../components/common/page.styled";
import UserFollowCard from "../components/Cards/UserFollowCard";
import user1 from "../API/user1";
import users from "../API/users";
import { FollowClickContext } from "../Context/FollowClickContext";
import {
  deleteUserFollow,
  getUserFollowers,
  getUserFollowing,
  postUserFollow,
} from "../API/usercopy";

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
          // key={item.UserId}
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
          // key={item.UserId}
          item={item}
          onClick={(id) => onClick?.(id)}
          activeTab={activeTab}
          onAvatarClick={(id) => onAvatarClick?.(id)}
        />
      ));
    }
  }
};

function UserFollowPage() {
  const [status, setStatus] = useState(0);
  const { activeTab, setActiveTab } = useContext(FollowClickContext);
  // const [userInfo, setUserInfo] = useState(user1);
  // const [usersInfo, setUsersInfo] = useState(users);
  const navigate = useNavigate();
  // const [followData, setFollowData] = useState([]);
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const tweetCount = localStorage.getItem("tweetCount");
  const userName = localStorage.getItem("userName");
  // const handleFollowerBtnClick = (id, isFollowed) => {
  //   setFollowers(
  //     followers.map((follower) => {
  //       if (follower.data.user[0].id === id) {
  //         return { ...follower, isFollowed: !isFollowed };
  //       } else {
  //         return follower;
  //       }
  //     })
  //   );
  // };

  // const handleFollowingBtnClick = (id) => {
  //   setFollowings(
  //     followings.filter((following) => following.data.user[0].id !== id)
  //   );
  // };

  // 更改 追蹤/取消追宗
  const changeUserFollowAsync = async (currentUser, id, userToken) => {
    try {
      if (currentUser.isFollowed) {
        await deleteUserFollow(userToken, id);
      } else if (!currentUser.isFollowed) {
        await postUserFollow(userToken, id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 點擊按鈕後觸發 追蹤/取消追蹤
  const handleClick = (id) => {
    const userToken = localStorage.getItem("userToken");
    if (activeTab === "followers") {
      setFollowerData(
        followerData.map((item) => {
          // console.log(followerData);
          if (item.followingId === id) {
            return {
              ...item,
              isFollowed: !item.isFollowed,
            };
          } else {
            return item;
          }
        })
      );
      const currentUser = followerData.find((item) => item.followingId === id);
      changeUserFollowAsync(currentUser, id, userToken);
    } else if (activeTab === "followings") {
      setFollowingData(
        followingData.map((item) => {
          if (item.followingId === id) {
            return {
              ...item,
              isFollowed: !item.isFollowed,
            };
          } else {
            return item;
          }
        })
      );
      const currentUser = followingData.find((item) => item.followingId === id);
      changeUserFollowAsync(currentUser, id, userToken);
    }
  };

  // 點擊頭像切換至 other
  const handleAvatarClick = (id) => {
    localStorage.setItem("otherId", id);
    navigate("/users");
  };

  // 摳 api 取得 following array
  const getUserFollowingAsync = async (userToken, renderId) => {
    const data = await getUserFollowing(userToken, renderId);
    if (data.message === "無追蹤其他使用者") {
      setFollowingData([]);
    } else {
      setFollowingData(data);
    }
  };

  // 摳 api 取得 follower array
  const getUserFollowersAsync = async (userToken, renderId) => {
    const data = await getUserFollowers(userToken, renderId);
    // console.log(data.renderId);
    if (data.message === "無跟隨者資料") {
      setFollowerData([]);
    } else {
      setFollowerData(data);
    }
  };

  // 渲染畫面
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    let renderId = "";
    const id = localStorage.getItem("id");
    const otherId = localStorage.getItem("otherId");
    if (id === otherId) {
      renderId = id;
    } else {
      renderId = otherId;
    }
    getUserFollowersAsync(userToken, renderId);
    getUserFollowingAsync(userToken, renderId);
  }, [activeTab]);

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
              <h5 className="username">{userName}</h5>
              <p className="tweet_amount">{tweetCount} 推文</p>
            </div>
          </header>

          <StyledTabbar>
            <button
              className={
                "userTab" + clsx(" ", { active: activeTab === "followers" })
              }
              onClick={() => {
                setActiveTab("followers");
                navigate("/users/followers");
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
                navigate("/users/followings");
              }}
            >
              正在追隨
            </button>
          </StyledTabbar>
          <div className="followList">
            <FollowList
              activeTab={activeTab}
              onClick={handleClick}
              followerData={followerData}
              followingData={followingData}
              onAvatarClick={handleAvatarClick}
            />
          </div>
        </PageStyle>
      </UserPageConainer>
      <Popular onAvatarClick={handleAvatarClick} />
    </>
  );
}

export default UserFollowPage;
