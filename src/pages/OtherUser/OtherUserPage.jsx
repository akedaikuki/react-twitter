import React, { useId, useState, useContext, useEffect } from "react";

import clsx from "clsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FollowClickContext } from "../../Context/FollowClickContext";
import {
  TurnbackIcon,
  MsgIcon,
  NotiIcon,
  NotiIconActive,
} from "../../assets/icons";
import { StyledTabbar } from "../../components/common/tab.styled";
import { PageStyle } from "../../components/common/page.styled";
import { StyledButton } from "../../components/common/button.styled";
import {
  UserPageConainer,
  UserInfoPicture,
  UserInfoText,
} from "../../components/common/page.styled";
import Popular from "../../components/Popular";
// import UserModal from "../components/profile/UserModal";
// import Tweetslist from "../../components/profile/Tweetslist";
import UserControl from "../../components/profile/UserControl";
// import users from "../../API/users";
import { ShowModalContext } from "../../Context/ShowModalContext";
import SideBarModal from "../../components/profile/SideBarModal";
import TweetReplyModal from "../../components/profile/TweetReplyModal";
import {
  deleteUserFollow,
  getAccountInfo,
  postUserFollow,
} from "../../API/usercopy";

function OtherUserPage({
  tweet,
  onAvatarClick,
  handleUserLikeList,
  text,
  activeTab,
  render,
  postList,
  replyList,
  userLikeList,
  onPostList,
  onUserLikeList,
  onAddHomeList,
  s,
}) {
  // { isFollowed }
  // const [usersInfo, setUsersInfo] = useState(users[0]);
  const [showNotice, setShowNotice] = useState(false);
  // const [userInfo, setUserInfo] = useState({});
  const [otherUser, setOtherUser] = useState({});
  // const [followState, setFollowState] = useState(false);
  const { setActiveTab } = useContext(FollowClickContext);
  const { showPostModal, toggleShowPostModal } = useContext(ShowModalContext);
  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  const navigate = useNavigate();

  // const useId = useParams();
  const otherId = localStorage.getItem("otherId");

  // render 用戶資料
  useEffect(() => {
    const getAccountInfoAsync = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const data = await getAccountInfo(userToken, otherId);

        setOtherUser(data);
        localStorage.setItem("tweetCount", data.tweetCount);
        localStorage.setItem("userName", data.name);

        // console.log(data);

        return data;
      } catch (error) {
        console.error(error);
      }
    };
    getAccountInfoAsync();
  }, [localStorage.getItem("otherId")]);
  //
  console.log(otherUser.isFollowed);
  // console.log(followState);
  // 切換小鈴鐺ICON
  function handleShowNotice() {
    setShowNotice(!showNotice);
  }
  const handleFollowClick = async () => {
    const userToken = localStorage.getItem("userToken");
    if (otherUser.isFollowed) {
      setOtherUser({
        ...otherUser,
        isFollowed: !otherUser.isFollowed,
      });
      // setFollowState();
      deleteUserFollowAsync(userToken, otherUser.id);
    } else {
      postUserFollowAsync(userToken, otherUser.id);
      setOtherUser({
        ...otherUser,
        isFollowed: !otherUser.isFollowed,
      });
      // setFollowState("true");
    }
  };

  const postUserFollowAsync = async (userToken, id) => {
    try {
      const data = await postUserFollow(userToken, id);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteUserFollowAsync = async (userToken, id) => {
    try {
      const data = await deleteUserFollow(userToken, id);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <UserPageConainer
        className="userPageConainer"
        // useId={otherUser.id}
        // active={editActive}
        // onClose={handleClose}
      >
        {/* <div className="step_back" /> */}

        <PageStyle className="userPageStyle">
          <header>
            <TurnbackIcon
              className="returnIcon"
              onClick={() => {
                navigate(-1);
              }}
            />
            <div className="header_info">
              <h5 className="username">{otherUser.name}</h5>
              <p className="tweet_amount"> {otherUser.tweetsTotal} 推文</p>
            </div>
          </header>

          <div className="userInfoContainer">
            <UserInfoPicture className="userInfoPicture">
              <div className="image_area">
                <img src={otherUser.cover} alt="cover" className="coverImg" />
                <img
                  src={otherUser.avatar}
                  alt="avatar"
                  className="avatarImg"
                />
              </div>

              {/* <div className="editInfo" >
                <UserModal />
              </div> */}
              <div
                className="btnBox"
                style={{
                  transform: "translate(430px, 570%)",
                  alignItems: "center",
                }}
              >
                <div className="msgIcon">
                  <MsgIcon />
                </div>
                {showNotice === true ? (
                  <div
                    className="notiIconActive"
                    style={{ position: "absolute", left: "40px" }}
                    onClick={handleShowNotice}
                  >
                    <NotiIconActive />
                  </div>
                ) : (
                  <div
                    className="notiIcon"
                    style={{ position: "absolute", left: "40px" }}
                    onClick={handleShowNotice}
                  >
                    <NotiIcon />
                  </div>
                )}
                <StyledButton
                  className={
                    "following_btn" +
                    clsx(" ", { active: otherUser.isFollowed })
                  }
                  // onClick={() => {}}
                  onClick={handleFollowClick}
                >
                  {otherUser.isFollowed ? "正在跟隨" : "跟隨"}
                </StyledButton>
                {/* <StyledButton className="follow_btn">跟隨</StyledButton> */}
              </div>
            </UserInfoPicture>
            <UserInfoText className="userInfoText">
              <h5 className="username">{otherUser.name}</h5>
              <div className="useraccount">@{otherUser.account}</div>
              <p className="intro">{otherUser.introduction}</p>
              <div className="followInfo">
                <Link
                  to="followings"
                  className="followingText"
                  onClick={() => {
                    setActiveTab("followings");
                  }}
                >
                  <span> {otherUser.followingCount} 個</span>
                  跟隨中
                </Link>
                <Link
                  to="followers"
                  className="followerText"
                  onClick={() => {
                    setActiveTab("followers");
                  }}
                >
                  <span> {otherUser.followerCount} 位</span>
                  跟隨者
                </Link>
              </div>
            </UserInfoText>
          </div>

          <StyledTabbar>
            <UserControl
              activeTab={activeTab}
              // render={render}
              postList={postList}
              replyList={replyList}
              userLikeList={userLikeList}
              onPostList={onPostList}
              onUserLikeList={onUserLikeList}
              onAvatarClick={onAvatarClick}
            />
            {/* <button className={"userTab"}>推文</button> */}
            {/* <button className={"userTab"}>回覆</button> */}
            {/* <button className={"userTab"}>喜歡的內容</button> */}
          </StyledTabbar>
          {/* <Tweetslist /> */}
        </PageStyle>
      </UserPageConainer>
      <Popular />
      {showPostModal && <SideBarModal onAddHomeList={onAddHomeList} />}
      {showReplyModal && (
        <TweetReplyModal
          tweet={tweet}
          onAvatarClick={onAvatarClick}
          text={text}
        />
      )}
    </>
  );
}

export default OtherUserPage;
