import React, { useState, useMemo, useContext } from "react";
import styled from "styled-components";
import { CloseIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";
import user1 from "../../API/user1";
import { TweetCardContainer } from "../common/tweet.styled";
import users from "../../API/users";
import { Link } from "react-router-dom";

import relativeTime from "../../utilities/relativeTime";
import { ShowModalContext } from "../../Context/ShowModalContext";

const ModalContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(calc(-50% - 37px));
  margin: 0;
  width: 634px;
  height: 450px;
  opacity: initial;
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--main_white);
  z-index: 200;
  /* outline: 1px solid tomato; */
  .modalHeader {
    height: unset;
    padding: unset;
    .close {
      margin: 20px;
      cursor: pointer;
    }
  }

  .line {
    height: 1px;
    background-color: var(--border_gray);
  }
`;
const Tweettextbox = styled.div`
  display: flex;
  width: 100%;
  height: 136px;
  /* outline: 3px solid tomato; */

  textarea {
    width: 70%;
    resize: none;
    border: none;
    outline: 0;
    &[placeholder] {
      margin-top: 28px;
      margin-left: 8px;
      font-size: 18px;
      font-weight: 700;
      line-height: 15px;
      /* color: var(--textarea-placeholder); */
    }
    :focus {
      border: none;
    }
  }
  .panel {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 16px;
    right: 24px;
    .error_msg {
      margin-right: 20px;
      font-weight: 500;
      font-size: 15px;
      line-height: 15px;
      color: var(--main_error);
    }
    .tweet_post_btn {
      display: inline-flex;
      align-items: flex-start;
      color: var(--main_white);
      background-color: var(--main_orange);
      &[disabled] {
        opacity: 65%;
      }
    }
  }
`;
const StyledConnectLine = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;

  &:before {
    content: "";
    position: absolute;
    top: 58px;
    left: -34px;
    width: 2px;
    height: calc(100% - 31px);
    background-color: var(--reply-connect-line);
  }
`;

function TweetReplyModal() {
  const [userInfo, setUserInfo] = useState(user1);
  const [usersInfo, setUsersInfo] = useState(users);
  const [tweetText, setTweetText] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { toggleShowReplyModal } = useContext(ShowModalContext);
  // console.log(usersInfo[0].data.user[0].avatar);
  const handleChange = (e) => {
    setErrorMsg(null);
    setTweetText(e.target.value);
  };

  const handlePost = async () => {
    if (tweetText.length === 0) {
      return;
    }
    setTweetText("");
  };
  const isValid = useMemo(() => {
    if (!tweetText) {
      setErrorMsg("內容不可空白");
      return false;
    } else if (tweetText.length > 140) {
      return false;
    }

    return true;
  }, [tweetText]);

  return (
    <ModalContainer className="ModalContainer">
      <div className="modalHeader">
        <CloseIcon className="close" onClick={toggleShowReplyModal} />
        <div className="line"></div>
        <TweetCardContainer
          className="tweetCardContainer"
          style={{ outline: "0" }}
          id={usersInfo[0].data.user[0].id}
        >
          <div className="userAvatar">
            <img
              src={usersInfo[0].data.user[0].avatar}
              alt="other User's avatar"
              style={{ marginTop: "0" }}
            />
          </div>
          <StyledConnectLine />
          <div className="right">
            <div className="name_link">
              <span className="name">{usersInfo[0].data.user[0].name}</span>
              <span className="account">
                @{usersInfo[0].data.user[0].account}
              </span>

              <span className="time">
                ・{relativeTime(usersInfo[0].data.Tweets[0].createdAt)}
              </span>
            </div>
            <div className="tweetContent_link">
              <p className="tweetP">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ducimus ex illo cupiditate. Nostrum fuga quos tempora ipsum
                libero repellendus soluta?
              </p>
            </div>

            {/*  */}
            <p className="reply_to">
              回覆 <span>@{usersInfo[0].data.user[0].name}</span>
            </p>
          </div>
        </TweetCardContainer>
        <Tweettextbox className="Tweettextbox">
          <img src={userInfo[0].data.user[0].avatar} alt="user avatar" />

          <textarea
            className="tweettext"
            id="tweettext"
            rows="5"
            placeholder="推你的回覆"
            value={tweetText}
            onChange={handleChange}
          ></textarea>

          <div className="panel">
            <p className="error_msg">
              {tweetText.length > 140 ? "字數不可超過 140 字" : ""}
              {errorMsg !== null && errorMsg}
            </p>

            <StyledButton
              className="tweet_post_btn"
              onClick={handlePost}
              disabled={!isValid}
            >
              推文
            </StyledButton>
          </div>
        </Tweettextbox>
      </div>
    </ModalContainer>
  );
}

export default TweetReplyModal;
