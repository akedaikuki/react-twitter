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
  getUserTweets,
  getUserReplyTweets,
  getUserLikeTweets,
  userLikeTweet,
  userUnLikeTweet,
} from "../../API/usercopy";
import { useUserPostModal } from "../../Context/MainPageContext";
import { Toast } from "../../utilities/sweetalert";

function OtherUserPage() {
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
  const [postList, setPostList] = useState([]);
  const [replyList, setReplyList] = useState([]);
  const [userLikeList, setUserLikeList] = useState([]);
  const { onAddHomeList } = useUserPostModal();
  const [showLike, setShowLike] = useState([]);
  const [countLike, setCountLike] = useState([]);
  // const useId = useParams();
  const otherId = localStorage.getItem("otherId");
  const { onLike, onUnLike, onUserReply } = useUserPostModal();

  // render 用戶資料
  useEffect(() => {
    const getAccountInfoAsync = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const data = await getAccountInfo(userToken, otherId);

        setOtherUser(data);
        console.log(otherId);
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
  // console.log(otherUser.isFollowed);
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
      console.log(otherUser.isFollowed);
      // setFollowState();
      deleteUserFollowAsync(userToken, otherUser.id);
    } else {
      postUserFollowAsync(userToken, otherUser.id);
      setOtherUser({
        ...otherUser,
        isFollowed: !otherUser.isFollowed,
      });
      // setFollowState("true");
      // console.log(otherUser);
    }
  };

  const postUserFollowAsync = async (userToken, id) => {
    try {
      const data = await postUserFollow(userToken, id);
      console.log(data);
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

  const handleAvatarClick = (clickId) => {
    const id = localStorage.getItem("id");
    // const otherId = localStorage.getItem("otherId");
    if (Number(clickId) === Number(id)) {
      navigate("/users");
    } else {
      localStorage.setItem("otherId", clickId);
      // localStorage.setItem("TweetId", TweetId);
      navigate("/other");
    }
  };
  useEffect(() => {
    const getUserDataAsync = async (userToken, id) => {
      try {
        const postListData = await getUserTweets(userToken, id);
        const replyListData = await getUserReplyTweets(userToken, id);
        const userLikeListData = await getUserLikeTweets(userToken, id);
        if (postListData.message === "無推文資料") {
          setPostList([]);
        } else {
          setPostList(postListData);
        }
        if (replyListData.message === "無回覆資料") {
          setReplyList([]);
        } else {
          setReplyList(replyListData);
        }
        if (userLikeListData.message === "無Like資料") {
          setUserLikeList([]);
        } else {
          setUserLikeList(userLikeListData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (localStorage.getItem("userToken")) {
      getUserDataAsync(localStorage.getItem("userToken"), otherId);
    }
    // else if () {
    //   getUserDataAsync(localStorage.getItem("userToken"), otherId);
    // }
  }, [navigate, localStorage.getItem("otherId")]);

  // 取得 回覆列表
  const handlePostList = ({ TweetId, count }) => {
    setPostList((pre) => {
      return pre.map((item) => {
        if (item.TweetId === TweetId) {
          return {
            ...item,
            isLiked: !item.isLiked,
            likeCount: item.likeCount + count,
          };
        } else {
          return item;
        }
      });
    });
  };
  // 取得 喜歡的內容列表
  const handleUserLikeList = ({ TweetId, count }) => {
    setUserLikeList((pre) => {
      return pre.map((item) => {
        if (item.TweetId === TweetId) {
          return {
            ...item,
            isLiked: !item.isLiked,
            likeCount: item.likeCount + count,
          };
        } else {
          return item;
        }
      });
    });
  };

  // console.log(userInfo);
  const handleLikeClick = async (type) => {
    const userToken = localStorage.getItem("userToken");
    const TweetId = localStorage.getItem("TweetId");
    try {
      if (type === "increment") {
        Toast.fire({
          title: "你已成功喜歡這則貼文",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          position: "top",
        });
        onLike(TweetId);
        await userLikeTweet({ userToken, TweetId });
        // console.log(TweetId);
        setCountLike(countLike + 1);
        setOtherUser((pre) => {
          return {
            ...pre,
            isLiked: true,
            likeCount: pre.likeCount + 1,
          };
        });
      } else if (type === "decrement") {
        Toast.fire({
          title: "你已成功移除喜歡",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
          position: "top",
        });
        onUnLike(TweetId);
        await userUnLikeTweet({ userToken, TweetId });
        setCountLike(countLike - 1);
        setOtherUser((pre) => {
          return {
            ...pre,
            isLiked: false,
            likeCount: pre.likeCount - 1,
          };
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 愛心狀態
  function handleShowLike() {
    if (showLike === true) {
      setShowLike(false);
      // console.log(showLike);
    } else if (showLike === false) {
      setShowLike(true);
      // console.log(showLike);
    }
  }

  function handleFollow() {
    if (otherUser.isFollowed === false) {
      Toast.fire({
        title: "成功追蹤使用者",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
      console.log(otherUser.isFollowed);
      try {
      } catch (error) {
        console.error(error);
      }
    } else if (otherUser.isFollowed === true) {
      Toast.fire({
        title: "成功取消追蹤此使用者",
        icon: "info",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });

      try {
      } catch (error) {
        console.error(error);
      }
    }
  }
  // console.log(otherUser);
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
                  onClick={() => {
                    handleFollow();
                    handleFollowClick();
                  }}
                  // onClick={handleFollowClick}
                >
                  {otherUser.isFollowed === true ? "正在跟隨" : "跟隨"}
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
              // render={render}
              postList={postList}
              replyList={replyList}
              userLikeList={userLikeList}
              onPostList={handlePostList}
              onUserLikeList={handleUserLikeList}
              onAvatarClick={handleAvatarClick}
              onClickShowLike={handleShowLike}
              onLikeClick={handleLikeClick}
            />
            {/* <button className={"userTab"}>推文</button> */}
            {/* <button className={"userTab"}>回覆</button> */}
            {/* <button className={"userTab"}>喜歡的內容</button> */}
          </StyledTabbar>
          {/* <Tweetslist /> */}
        </PageStyle>
      </UserPageConainer>
      <Popular
        onAvatarClick={handleAvatarClick}
        onFollowClick={handleFollowClick}
      />
      {showPostModal && <SideBarModal onAddHomeList={onAddHomeList} />}
      {/* {showReplyModal && (
        <TweetReplyModal
          tweet={tweet}
          onAvatarClick={handleAvatarClick}
          text={text}
        />
      )} */}
    </>
  );
}

export default OtherUserPage;
