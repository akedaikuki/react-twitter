import React, { useState } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { TurnbackIcon, MsgIcon, NotiIcon } from "../../assets/icons";
import { StyledTabbar } from "../../components/common/tab.styled";
import { PageStyle } from "../../components/common/page.styled";
import { StyledButton } from "../../components/common/button.styled";
import {
  UserPageConainer,
  UserInfoPicture,
  UserInfoText,
} from "../../components/common/page.styled";
// import UserModal from "../components/profile/UserModal";
// import Tweetslist from "../../components/profile/Tweetslist";
import UserControl from "../../components/profile/UserControl";
import users from "../../API/users";

function OtherUserPage() {
  const [usersInfo, setUsersInfo] = useState(users[3]);
  const [isFollowed, setIsFollowed] = useState(false);
  const navigate = useNavigate();

  return (
    <UserPageConainer className="userPageConainer">
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

            <div className="editInfo">{/* <UserModal /> */}</div>
            <div className="btnBox">
              <div className="msgIcon">
                <MsgIcon />
              </div>
              <div className="notiIcon">
                <NotiIcon />
              </div>

              <StyledButton
                className={"following_btn" + clsx(" ", { active: isFollowed })}
                onClick={() => {}}
              >
                {isFollowed ? "正在跟隨" : "跟隨"}
              </StyledButton>
              {/* <StyledButton className="follow_btn">跟隨</StyledButton> */}
            </div>
          </UserInfoPicture>
          <UserInfoText className="userInfoText">
            <h5 className="username">{usersInfo.data.user[0].name}</h5>
            <div className="useraccount">@{usersInfo.data.user[0].account}</div>
            <p className="intro">{usersInfo.data.user[0].introduction}</p>
            <div className="followInfo">
              <p className="followingText">
                <span> {usersInfo.data.followings[0].followingTotal} 個</span>
                跟隨中
              </p>
              <p className="followerText">
                <span> {usersInfo.data.followers[0].followerTotal} 位</span>
                跟隨者
              </p>
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
  );
}

export default OtherUserPage;
