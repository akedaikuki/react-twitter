import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TurnbackIcon, LikedIcon, LikeIcon, ReplyIcon } from "../assets/icons";
import TweetReplyCard from "../components/Cards/TweetReplyCard";
import { PageStyle, UserPageConainer } from "../components/common/page.styled";
import Popular from "../components/Popular";
import { styled } from "styled-components";
import user1 from "../API/user1";
import users from "../API/users";
import createTime from "../utilities/creatTime";
import { ShowModalContext } from "../Context/ShowModalContext";
import TweetReplyModal from "../components/profile/TweetReplyModal";

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

function TweetPage() {
  const [userInfo, setUserInfo] = useState(user1);
  const [usersInfo, setUsersInfo] = useState(users);
  const { showReplyModal, toggleShowReplyModal } = useContext(ShowModalContext);
  const navigate = useNavigate();

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
                src={userInfo[0].data.user[0].avatar}
                alt="userAvatar"
                className="userAvatar"
              />
              <div className="usertweetAccount">
                <p className="username">{userInfo[0].data.user[0].name}</p>
                <p className="useraccount">
                  @{userInfo[0].data.user[0].account}
                </p>
              </div>
            </div>
            <p className="tweetContent">
              {userInfo[0].data.Tweets[0].description}
            </p>
            <p className="createdTime">上午 10:05・2020年6月10日</p>
            <div className="tweetline"></div>
            <div className="qtyBox">
              <p className="replyQty">
                <span> {userInfo[0].data.Tweets[0].tweetsTotal} </span> 回覆
              </p>
              <p className="likeQty">
                <span> {userInfo[0].data.likes[0].likesTotal} </span> 喜歡次數
              </p>
            </div>
            <div className="tweetline"></div>
            <div className="iconBox">
              <ReplyIcon className="reply" onClick={toggleShowReplyModal} />

              <LikedIcon />

              {/* <LikeIcon /> */}
            </div>
          </UsertweetContainer>

          {usersInfo.map((usersInfo) => (
            <TweetReplyCard
              key={usersInfo.data.user[0].id}
              account={usersInfo.data.user[0].account}
              name={usersInfo.data.user[0].name}
              avatar={usersInfo.data.user[0].avatar}
              tweets={usersInfo.data.Tweets[0].description}
              repliedTweets={usersInfo.data.repliedTweets[0].description}
              repliedTotal={usersInfo.data.repliedTweets[0].repliedTotal}
              likesTotal={usersInfo.data.likes[0].likesTotal}
              userId={usersInfo.data.user[0].id}
              createdAt={usersInfo.data.repliedTweets[0].createdAt}
              user1account={userInfo[0].data.user[0].account}
            />
          ))}
        </PageStyle>
      </UserPageConainer>
      <Popular />
      {showReplyModal && <TweetReplyModal />}
    </>
  );
}

export default TweetPage;
