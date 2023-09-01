import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FollowClickContext } from "../Context/FollowClickContext";
import { TurnbackIcon } from "../assets/icons";
import { StyledTabbar } from "../components/common/tab.styled";
import { StyledButton } from "../components/common/button.styled";
import {
  PageStyle,
  UserPageConainer,
  UserInfoPicture,
  UserInfoText,
} from "../components/common/page.styled";
import Popular from "../components/Popular";
// import UserModal from "../components/profile/UserModal";
// import TweetsCard from "../components/Cards/TweetsCard";
import UserControl from "../components/profile/UserControl";
import user1 from "../API/user1";
import UserModal from "../components/profile/UserModal";
import { ShowModalContext } from "../Context/ShowModalContext";
import SideBarModal from "../components/profile/SideBarModal";
import TweetReplyModal from "../components/profile/TweetReplyModal";
import { getAccountInfo, putPersonalInfo } from "../API/usercopy";
// import jwtDecode from "jwt-decode";
// import users from "../API/users";

function UserPage({
  activeTab,
  render,
  postList,
  replyList,
  userLikeList,
  onPostList,
  onUserLikeList,
  onAvatarClick,
}) {
  const [userInfo, setUserInfo] = useState({});
  // const [usersInfo, setUsersInfo] = useState(users);
  // const [editActive, setEditActive] = useState(false);
  const { setActiveTab } = useContext(FollowClickContext);
  const { showEditModal, toggleShowEditModal } = useContext(ShowModalContext);
  const { showPostModal, toggleShowPostModal } = useContext(ShowModalContext);
  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  const navigate = useNavigate();
  // console.log(users[0].username);

  useEffect(() => {
    const getAccountInfoAsync = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const id = localStorage.getItem("id");
        const data = await getAccountInfo(userToken, id);

        setUserInfo(data);

        localStorage.setItem("tweetCount", data.tweetCount);
        localStorage.setItem("userName", data.name);
      } catch (error) {
        console.error(error);
      }
    };
    getAccountInfoAsync();
  }, [navigate]);

  // console.log(userInfo);

  return (
    <>
      <UserPageConainer
        className="userPageConainer"
        // active={editActive}
        // onClose={handleClose}
      >
        <PageStyle>
          <header>
            <TurnbackIcon
              className="returnIcon"
              onClick={() => {
                navigate(-1);
              }}
            />
            <div className="header_info">
              <h5 className="username">{userInfo.name}</h5>
              <p className="tweet_amount">{userInfo.tweetCount} 推文</p>
            </div>
          </header>

          <div className="userInfoContainer">
            <UserInfoPicture className="userInfoPicture">
              <div className="image_area">
                <img src={userInfo.cover} alt="cover" className="coverImg" />
                <img src={userInfo.avatar} alt="avatar" className="avatarImg" />
              </div>

              <div
                className="editInfo"
                // active={editActive}
                // onClose={handleClose}
              >
                {/* {editActive ? <UserModal onClose={handleClose} /> : null} */}
              </div>

              <div className="btnBox" style={{ justifyContent: "flex-end" }}>
                <StyledButton
                  className="editBtn "
                  onClick={toggleShowEditModal}
                >
                  編輯個人資料
                </StyledButton>
              </div>
            </UserInfoPicture>
            <UserInfoText className="userInfoText">
              <h5 className="username">{userInfo.name}</h5>
              <div className="useraccount">@{userInfo.account}</div>
              <p className="intro">{userInfo.introduction}</p>
              <div className="followInfo">
                <Link
                  to={`/api/users/${userInfo.id}/followings`}
                  className="followingText"
                  onClick={() => {
                    setActiveTab("followings");
                    // navigate("followings");
                  }}
                >
                  <span>{userInfo.followingCount} 個</span>
                  跟隨中
                </Link>
                <Link
                  to={`/api/users/${userInfo.id}/followers`}
                  className="followerText"
                  onClick={() => {
                    setActiveTab("followers");
                    // navigate("followers");
                  }}
                >
                  <span> {userInfo.followerCount} 位</span>
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
      <Popular />

      {showEditModal && <UserModal />}
      {showPostModal && <SideBarModal />}
      {showReplyModal && <TweetReplyModal />}
    </>
  );
}

export default UserPage;
