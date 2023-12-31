import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TurnbackIcon, LikedIcon, LikeIcon, ReplyIcon } from "../assets/icons";
import TweetReplyList from "../components/Cards/TweetReplyList";
import { PageStyle, UserPageConainer } from "../components/common/page.styled";
import Popular from "../components/Popular";
import { styled } from "styled-components";
// import user1 from "../API/user1";
// import users from "../API/users";
import createTime from "../utilities/creatTime";
import relativeTime from "../utilities/relativeTime";
import { ShowModalContext } from "../Context/ShowModalContext";
import TweetReplyModalForTweet from "../components/profile/TweetReplyModalForTweet";
import { getSingleTweetInfo } from "../API/usercopy";
import { userLikeTweet, userUnLikeTweet } from "../API/usercopy";
import { useUserPostModal } from "../Context/MainPageContext";
import {
  TweetIdContext,
  useReplyList,
} from "../components/contexts/DataContext";
import { Toast } from "../utilities/sweetalert";

const UsertweetContainer = styled.div`
  margin: 15px;

  .userInfo {
    display: flex;
  }
  .userAvatar {
    margin: 0;
  }
  .usertweetAccount {
    margin-left: 10px;
  }
  .tweetContent {
    width: 510px;
    margin: 10px 75px 15px 0;
    font-size: 21px;
    font-style: normal;
    font-weight: 500;
    line-height: 34px;
  }
  .username {
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
    margin-right: 8px;
    color: var(--main_text);
  }
  .useraccount {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: var(--account_text-in-main);
  }
  .createdTime {
    font-size: 14px;
    color: var(--account_text-in-pop);
  }
  .tweetline {
    background: #e6ecf0;
    height: 1px;
    margin: 15px 0;
  }
  .qtyBox {
    display: flex;
    width: 200px;
  }
  .replyQty,
  .likeQty {
    color: var(--account_text-in-pop);
    cursor: pointer;
  }
  .likeQty {
    margin-left: 20px;
  }
  .qtyBox span {
    font-size: 19px;
    font-weight: 700;
    line-height: normal;
    color: var(--main_text);
  }
  .iconBox {
    width: 110px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
`;
const ReplyIconStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--main_secondary);
  cursor: pointer;
  .reply {
    width: 1rem;
    height: 1rem;
  }
`;

const LikeIconStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--main_secondary);
  cursor: pointer;
  .like {
    width: 1rem;
    height: 1rem;
    fill: var(--main_white);

    stroke-width: 2px;
    &.active {
      fill: var(--main_error);
      stroke: var(--main_error);
    }
  }
`;

function TweetPage() {
  // const [userInfo, setUserInfo] = useState(user1);
  // const [usersInfo, setUsersInfo] = useState(users);

  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [showLike, setShowLike] = useState([]);
  const [countLike, setCountLike] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [tweetOwnerInfo, setTweetOwnerInfo] = useState([]);
  const { onLike, onUnLike, onUserReply } = useUserPostModal();
  // const { onTheTweetId } = useReplyList();
  const { onAddHomeList } = useUserPostModal();
  const { onTheTweetId } = TweetIdContext();
  const TweetId = localStorage.getItem("TweetId");

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const TweetId = localStorage.getItem("TweetId");
    const getDataAsync = async ({ userToken, TweetId }) => {
      try {
        const data = await getSingleTweetInfo({ userToken, TweetId });

        setTweetOwnerInfo(data);
        setShowLike(data.isLiked);
        setErrorMsg(data.likeCount);
        console.log(data.isLiked);
      } catch (error) {
        console.error(error);
      }
    };
    if (userToken) {
      getDataAsync({ userToken, TweetId });
    }
  }, [localStorage.getItem("replyListLength")]);

  // 取得 回覆列表
  const handlePostList = ({ TweetId, count }) => {
    setTweetOwnerInfo((pre) => {
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
  // console.log(tweetOwnerInfo);
  const handleLikeClick = async (type) => {
    const userToken = localStorage.getItem("userToken");
    const TweetId = localStorage.getItem("TweetId");
    try {
      if (type === "increment") {
        Toast.fire({
          title: "你已成功喜歡這則貼文",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          position: "top",
        });
        onLike(TweetId);
        await userLikeTweet({ userToken, TweetId });
        console.log(TweetId);
        setCountLike(countLike + 1);
        setTweetOwnerInfo((pre) => {
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
          timer: 1500,
          position: "top",
        });
        onUnLike(TweetId);
        await userUnLikeTweet({ userToken, TweetId });
        setCountLike(countLike - 1);
        setTweetOwnerInfo((pre) => {
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

  const handleAvatarClick = () => {
    const clickId = tweetOwnerInfo.tweetOwnerId;
    // console.log(clickId);
    const id = localStorage.getItem("id");
    if (Number(clickId) === Number(id)) {
      navigate("/users");
    } else {
      localStorage.setItem("clickId", clickId);
      navigate("/other");
    }
  };
  const handleChange = (e) => {
    setErrorMsg(null);
    setText(e.target.value);
    // onAddHomeList(text);
  };
  return (
    <>
      <UserPageConainer className="tweetPageConainer">
        <PageStyle className="TweetPageStyle">
          <header>
            <TurnbackIcon
              className="returnIcon"
              onClick={() => {
                navigate(-1);
              }}
            />
            <div className="header_info">
              <h4 className="tweet">推文</h4>
            </div>
          </header>

          <UsertweetContainer className="usertweetContainer">
            <div className="userInfo">
              <img
                src={tweetOwnerInfo.tweetOwnerAvatar}
                alt="userAvatar"
                className="userAvatar"
                onClick={handleAvatarClick}
              />
              <div className="usertweetAccount">
                <p className="username">{tweetOwnerInfo.tweetOwnerName}</p>
                <p className="useraccount">
                  @{tweetOwnerInfo.tweetOwnerAccount}
                </p>
              </div>
            </div>
            <p className="tweetContent">{tweetOwnerInfo.description}</p>
            <p className="createdTime">
              {createTime(tweetOwnerInfo.createdAt)}・
              {relativeTime(tweetOwnerInfo.createdAt)}
            </p>
            <div className="tweetline"></div>
            <div className="qtyBox">
              <p className="replyQty">
                <span> {tweetOwnerInfo.replyCount} </span> 回覆
              </p>
              <p className="likeQty">
                <span> {tweetOwnerInfo.likeCount} </span> 喜歡次數
              </p>
            </div>
            <div className="tweetline"></div>
            <div className="iconBox">
              <ReplyIconStyle>
                <ReplyIcon className="reply" onClick={toggleShowReplyModal} />
              </ReplyIconStyle>
              {showLike === true ? (
                <LikeIconStyle
                  style={{ marginLeft: "15px" }}
                  onClick={() => {
                    handleShowLike();
                    handleLikeClick("decrement");
                    onTheTweetId(TweetId);
                  }}
                >
                  <LikedIcon className="like active" />
                </LikeIconStyle>
              ) : (
                <LikeIconStyle
                  style={{ marginLeft: "15px" }}
                  onClick={() => {
                    handleShowLike();
                    handleLikeClick("increment");
                    onTheTweetId(TweetId);
                  }}
                >
                  <LikeIcon className="like" />
                </LikeIconStyle>
              )}
            </div>
          </UsertweetContainer>
          <TweetReplyList
            text={text}
            onAddHomeList={onAddHomeList}
            onAvatarClick={handleAvatarClick}
            onPostList={handlePostList}
            onUserReply={onUserReply}
          />
        </PageStyle>
      </UserPageConainer>
      <Popular onAvatarClick={handleAvatarClick} />
      {showReplyModal ? (
        <TweetReplyModalForTweet
          tweet={tweetOwnerInfo}
          onChange={handleChange}
          text={text}
          onUserReply={onUserReply}
          errorMsg={errorMsg}
        />
      ) : null}
    </>
  );
}

export default TweetPage;
