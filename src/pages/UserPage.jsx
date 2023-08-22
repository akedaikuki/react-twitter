import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TurnbackIcon } from "../assets/icons";
import { StyledTabbar } from "../components/common/tab.styled";
import { StyledButton } from "../components/common/button.styled";
import {
  PageStyle,
  UserPageConainer,
  UserInfoPicture,
  UserInfoText,
} from "../components/common/page.styled";
// import UserModal from "../components/profile/UserModal";
// import TweetsCard from "../components/Cards/TweetsCard";
import UserControl from "../components/profile/UserControl";
import user1 from "../API/user1";
// import users from "../API/users";

function UserPage() {
  const [userInfo, setUserInfo] = useState(user1);
  // const [usersInfo, setUsersInfo] = useState(users);
  const navigate = useNavigate();
  // console.log(users[0].username);
  return (
    <UserPageConainer className="userPageConainer">
      <PageStyle>
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

        <div className="userInfoContainer">
          <UserInfoPicture className="userInfoPicture">
            <div className="image_area">
              <img
                src={userInfo[0].data.user[0].coverImage}
                alt="cover"
                className="coverImg"
              />
              <img
                src={userInfo[0].data.user[0].avatar}
                alt="avatar"
                className="avatarImg"
              />
            </div>

            <div className="editInfo">{/* <UserModal /> */}</div>
            <div className="btnBox">
              <StyledButton className="editBtn active">
                編輯個人資料
              </StyledButton>
            </div>
          </UserInfoPicture>
          <UserInfoText className="userInfoText">
            <h5 className="username">{userInfo[0].data.user[0].name}</h5>
            <div className="useraccount">
              @{userInfo[0].data.user[0].account}
            </div>
            <p className="intro">{userInfo[0].data.user[0].introduction}</p>
            <div className="followInfo">
              <p className="followingText">
                <span> {userInfo[0].data.followings[0].followingTotal} 個</span>
                跟隨中
              </p>
              <p className="followerText">
                <span> {userInfo[0].data.followers[0].followerTotal} 位</span>
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
        {/* {usersInfo.map((usersInfo) => ( */}

        {/* // <TweetsCard
          //   key={usersInfo.data.user[0].id}
          //   account={usersInfo.data.user[0].account}
          //   name={usersInfo.data.user[0].name}
          //   avatar={usersInfo.data.user[0].avatar}
          //   tweets={usersInfo.data.Tweets[0].description}
          //   repliedTotal={usersInfo.data.repliedTweets[0].repliedTotal}
          //   likesTotal={usersInfo.data.likes[0].likesTotal}
          //   userId={usersInfo.data.user[0].id}
          // /> */}

        {/* ))} */}
      </PageStyle>
    </UserPageConainer>
  );
}

export default UserPage;
