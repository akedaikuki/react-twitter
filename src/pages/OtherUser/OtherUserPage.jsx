import React, { useId, useState, useContext } from "react";

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
import users from "../../API/users";

function OtherUserPage() {
  // { isFollowed }
  const [usersInfo, setUsersInfo] = useState(users[0]);
  const [editActive, setEditActive] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [followState, setFollowState] = useState(
    usersInfo.data.user[0].isFollowed
  );
  const { setActiveTab } = useContext(FollowClickContext);
  const navigate = useNavigate();

  // const useId = useParams();

  // console.log(followState);
  // 切換小鈴鐺ICON
  function handleShowNotice() {
    setShowNotice(!showNotice);
  }

  // 切換follow狀態
  function handleFollow(e) {
    e.stopPropagation();
    e.preventDefault();
    if (followState === 0) {
      setFollowState(1);
      try {
      } catch (error) {
        console.error(error);
      }
    } else if (followState === 1) {
      setFollowState(0);
      try {
      } catch (error) {
        console.error(error);
      }
    }
  }

  // const handleOpen = () => {
  //   setEditActive(true);
  // };
  // const handleClose = () => {
  //   setEditActive(false);
  // };

  return (
    <>
      <UserPageConainer
        className="userPageConainer"
        useId={usersInfo.data.user[0].id}
        active={editActive}
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
              <h5 className="username">{usersInfo.data.user[0].name}</h5>
              <p className="tweet_amount">
                {" "}
                {usersInfo.data.Tweets[0].tweetsTotal} 推文
              </p>
            </div>
          </header>

          <div className="userInfoContainer">
            <UserInfoPicture className="userInfoPicture">
              <div className="image_area">
                <img
                  src={usersInfo.data.user[0].coverImage}
                  alt="cover"
                  className="coverImg"
                />
                <img
                  src={usersInfo.data.user[0].avatar}
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
                    "following_btn" + clsx(" ", { active: followState })
                  }
                  // onClick={() => {}}
                  onClick={handleFollow}
                >
                  {followState === 1 ? "正在跟隨" : "跟隨"}
                </StyledButton>
                {/* <StyledButton className="follow_btn">跟隨</StyledButton> */}
              </div>
            </UserInfoPicture>
            <UserInfoText className="userInfoText">
              <h5 className="username">{usersInfo.data.user[0].name}</h5>
              <div className="useraccount">
                @{usersInfo.data.user[0].account}
              </div>
              <p className="intro">{usersInfo.data.user[0].introduction}</p>
              <div className="followInfo">
                <Link
                  to="followings"
                  className="followingText"
                  onClick={() => {
                    setActiveTab("followings");
                  }}
                >
                  <span> {usersInfo.data.followings[0].followingTotal} 個</span>
                  跟隨中
                </Link>
                <Link
                  to="followers"
                  className="followerText"
                  onClick={() => {
                    setActiveTab("followers");
                  }}
                >
                  <span> {usersInfo.data.followers[0].followerTotal} 位</span>
                  跟隨者
                </Link>
              </div>
            </UserInfoText>
          </div>

          <StyledTabbar>
            <UserControl />
            {/* <button className={"userTab"}>推文</button> */}
            {/* <button className={"userTab"}>回覆</button> */}
            {/* <button className={"userTab"}>喜歡的內容</button> */}
          </StyledTabbar>
          {/* <Tweetslist /> */}
        </PageStyle>
      </UserPageConainer>
      <Popular />
    </>
  );
}

export default OtherUserPage;
